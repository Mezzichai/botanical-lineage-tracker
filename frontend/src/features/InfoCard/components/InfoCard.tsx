import React, { useCallback, useEffect, useRef, useState } from 'react'
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import '../styles/quillStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck, faChevronLeft, faChevronRight, faGear, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons'
import ButtonWithHoverLabel from '../../../components/ButtonWithHoverLabel'
import Tab from '../../../components/Tab'
import TabStyles from '../../../styles/tabStyles.module.css'
import MiniLineageTree from './MiniLineageTree'
import SubstrateChart from './SubstrateChart'
import { useParams } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import {  selectCatagory,  selectId,  selectIsInfoCardOpen, selectIsInfoNewOrEditing, selectParents, toggleInfoCardEditModeOn, toggleInfoCardOff, toggleInfoCardOn } from '../InfoCardSlice'
import { useCreateSpeciesGroupMutation, useCreateSpeciesIndividualMutation, useCreateSpeciesMutation, useDeleteSpeciesGroupMutation, useDeleteSpeciesIndividualMutation, useDeleteSpeciesMutation, useEditSpeciesGroupMutation, useEditSpeciesIndividualMutation, useEditSpeciesMutation, useGetSpecficIndividualInfoQuery, useGetSpecificGroupInfoQuery, useGetSpecificSpeciesInfoQuery } from '../../../api/apiSlice'
import WaterChart from './WaterChart'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { DeltaStatic } from 'quill'
import dataURLtoFile from '../../../utils/dataURLtoFile'
import useIsValidInput from '../../../hooks/useIsValidInput'
import CatagorySpecificInfo from './CatagorySpecificInfo'
import { Group, LeanLineageNode, SubstrateEntry, WaterEntry } from '../../../types'



const InfoCard:React.FC = () => {
  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},],
      [{ 'align': [] }],
      ['link'],
    ]
  };
  
  const [createSpecies, {isLoading: isCreateSpeciesLoading}] = useCreateSpeciesMutation()
  const [createGroup,  {isLoading: isCreateGroupLoading}] = useCreateSpeciesGroupMutation()
  const [createIndividual,  {isLoading: isCreateIndividualLoading}] = useCreateSpeciesIndividualMutation()
  const [editSpecies,  {isLoading: isEditSpeciesLoading}] = useEditSpeciesMutation()
  const [editGroup,  {isLoading: isEditGroupLoading}] = useEditSpeciesGroupMutation()
  const [editIndividual,  {isLoading: isEditIndividualLoading}] = useEditSpeciesIndividualMutation()
  const [deleteSpecies] = useDeleteSpeciesMutation()
  const [deleteGroup] = useDeleteSpeciesGroupMutation()
  const [deleteIndividual] = useDeleteSpeciesIndividualMutation()

  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsInfoCardOpen)
  const isNewOrEditing = useSelector(selectIsInfoNewOrEditing)
  const catagory = useSelector(selectCatagory)
  const cardId = useSelector(selectId)
  const newNodeParents = useSelector(selectParents)

  const prevCardId = useRef<string | undefined>()
  const generatedIndividualNameRef = useRef<string>("")
 
  const { speciesId, groupId } = useParams({ strict: false})

  const {data: specificSpeciesInfo} = useGetSpecificSpeciesInfoQuery({speciesId: cardId}, {skip: !(Boolean(cardId) && catagory === "species" && isOpen)});
  const {data: specificGroupInfo} = useGetSpecificGroupInfoQuery({speciesId: speciesId, groupId: cardId || ""}, {skip: !(catagory === "group" && isOpen)});
  const {data: specificIndividualInfo} = useGetSpecficIndividualInfoQuery({speciesId: speciesId, groupId: groupId || "", individualId: cardId || ""}, {skip: !(catagory === "individual" && isOpen)});
  const [descriptionDelta, setDescriptionDelta] = useState<DeltaStatic | undefined>();
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [substrateValues, setSubstrateValues] = useState<SubstrateEntry[]>([{percent: 50, substrate: "pumice", color: "#1a3b52"}, {percent: 50, substrate: "soil", color: "#ab691e"}]);
  const [waterValues, setWaterValues] = useState<WaterEntry[]>([]);
  const [lightValues, setLightValues] = useState<SubstrateEntry[]>([]);
  const [isDead, setIsDead] = useState<boolean>(false);
  const [isClone, setIsClone] = useState<boolean>(false);
  const [isArtificialConditions, setIsArtificialConditions] = useState<boolean>(false);


  const [parents, setParents] = useState<{mother: LeanLineageNode, father: LeanLineageNode}>({mother: newNodeParents.mother, father: newNodeParents.father});
  const [group, setGroup] = useState<Group>({id: "", name: ""})
  const [images, setImages] = useState<string[]>([])
  const speciesInfo = useRef<{ name: string; id: string}>({name: "", id: ""})

  const [isNameValid, name, handleNameChange] = useIsValidInput(1, 50, "");
  const [activeTab, setActiveTab] = useState("Info")


  useEffect(() => {
    if (((specificSpeciesInfo || specificGroupInfo || specificIndividualInfo) && isOpen)) {
      const fetchedInfo = specificSpeciesInfo || specificGroupInfo || specificIndividualInfo;
      setDescriptionDelta(fetchedInfo.description_delta || "")
      setDescriptionHTML(fetchedInfo.description_html || "")
      setSubstrateValues(fetchedInfo.substrate_values || fetchedInfo.group_substrate_values || fetchedInfo.species_substrate_values)
      setWaterValues(fetchedInfo.water_values || fetchedInfo.group_water_values || fetchedInfo.species_water_values)
      setLightValues(fetchedInfo.light_values || fetchedInfo.group_light_values || fetchedInfo.species_light_values)
      setParents(prevParents => {
        return fetchedInfo?.parents
        ? {mother: fetchedInfo.parents.mother, father: fetchedInfo.parents.father} 
        : newNodeParents 
        ? newNodeParents 
        : prevParents
      })
      setGroup({name: fetchedInfo.group_name, id: fetchedInfo.group_id})
      setImages(fetchedInfo.images || [])
      setIsClone(fetchedInfo.is_clone)
      setIsArtificialConditions(fetchedInfo.is_artificial_conditions)
      setIsDead(Boolean(fetchedInfo.death_date))

      handleNameChange(fetchedInfo.name || fetchedInfo.generatedName || "")
      speciesInfo.current = {name: fetchedInfo?.species_name, id: fetchedInfo?.species_id}
      prevCardId.current = cardId
      generatedIndividualNameRef.current = fetchedInfo?.generatedName
    }
  }, [specificGroupInfo, specificIndividualInfo, specificSpeciesInfo, cardId, isOpen, newNodeParents])

  const isCreatingOrEditingLoading = useCallback(() => {
    if (isCreateSpeciesLoading 
     || isEditSpeciesLoading 
     || isCreateGroupLoading 
     || isEditGroupLoading 
     || isCreateIndividualLoading 
     || isEditIndividualLoading) {
      return true
    } else {
      return false
    }
  }, [isCreateGroupLoading, isEditGroupLoading, isCreateIndividualLoading, isEditIndividualLoading, isCreateSpeciesLoading, isEditSpeciesLoading])

  const handleChangeSubstrate = useCallback((substrate_values: SubstrateEntry[]) => {
    setSubstrateValues(substrate_values)
  }, [])

  const  handleChangeWater = useCallback((water_values: WaterEntry[]) => {
    setWaterValues(water_values)
  }, [])
  
  const handleChangeParents = useCallback((mother: LeanLineageNode, father: LeanLineageNode) => {
    setParents({mother, father})
  }, [])

  const handleGenerateIndividualName = useCallback(() => {
    handleNameChange(generatedIndividualNameRef.current)
  }, [handleNameChange])

  const handleTabClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    setActiveTab(e.currentTarget.id);
  }

  const handleToggleInfoCard = () => {
    if (isOpen) {
      dispatch(toggleInfoCardOff());
    } else {
      let catagory = ""
      if (groupId) {
        catagory = "group"
      } else {
        catagory = "species"
      }
      let id = ""
      if (groupId) {
        id = groupId
      } else {
        id = speciesId
      }
      dispatch(toggleInfoCardOn({catagory: catagory, itemId: id}))
    }
  }

  const handleConfirm = async () => {
    function filterSubstrates(substrates:SubstrateEntry[]) {
      return substrates.filter(value => value.percent > 0)
    }

    try {
      const descriptionString = JSON.stringify(descriptionDelta || {});
      const dataForm = new FormData();
      dataForm.set("name", name);
      dataForm.set("existing_images", JSON.stringify(images.filter(image => image.match(/https:\/\/.+?\.jpeg/))));
      images
        .filter(image => !image.match(/https:\/\/.+?\.jpeg/))
        .forEach((image, index) => {
          const file = dataURLtoFile(image, `image${index + 1}.jpeg`)
          dataForm.append(`images`, file);
        })
      dataForm.set("descriptionDelta", descriptionString);
      dataForm.set("descriptionHTML", descriptionHTML);
      dataForm.set("substrate_values", substrateValues?.length ? JSON.stringify(filterSubstrates(substrateValues)) : "");
      dataForm.set("light_values", lightValues?.length ? JSON.stringify(lightValues) : "");
      dataForm.set("water_values", waterValues?.length ? JSON.stringify(waterValues) : "");
      dataForm.set("parents", JSON.stringify(parents));
      dataForm.set("isClone", String(isClone));
      dataForm.set("isArtificialConditions", String(isArtificialConditions));
      dataForm.set("isDead", String(isDead));

      if (catagory === "individual") {
        if (!cardId) {
          await createIndividual({form: dataForm, params: {speciesId: speciesInfo.current.id, groupId: group.id}})
        } else {
          await editIndividual({form: dataForm, params: {speciesId: speciesInfo.current.id, individualId: cardId}})
        }
      } else if (catagory === "group") {
        if (!cardId) {
          await createGroup({form: dataForm, params: {speciesId: speciesInfo.current.id}})
        } else {
          await editGroup({form: dataForm, params: {speciesId: speciesInfo.current.id, groupId: group.id}})
        }
      } else if (!cardId) {
        await createSpecies({form: dataForm})
      } else {
        await editSpecies({form: dataForm, params: {speciesId: cardId}})
      }
      dispatch(toggleInfoCardOff())
    } catch (err) {
      console.log(err)
    }
  }

  const handleToggleEditView = () => {
    dispatch(toggleInfoCardEditModeOn())
  }

  const handleDisgard = async () => {
    dispatch(toggleInfoCardOff())
  }

  const handleDelete = async () => {
    if (catagory === "individual") {
      await deleteIndividual({speciesId: specificIndividualInfo.speciesId, individualId: cardId})
    } else if (catagory === "group") {
      await deleteGroup({speciesId: specificGroupInfo.speciesId, groupId: cardId})
    } else {
      await deleteSpecies({form: {speciesName: specificSpeciesInfo.name}, params: {speciesId: cardId}})
    }
    dispatch(toggleInfoCardOff())
  }

  const handleDescriptionChange = (content: React.SetStateAction<string>, _delta: DeltaStatic, _source: string, editor: ReactQuill.UnprivilegedEditor) => {
    setDescriptionDelta(editor.getContents())
    setDescriptionHTML(content)
  }

  const toggleIsArtificialConditions = () => {
    setIsArtificialConditions(prevState => !prevState)

  }

  const toggleIsClone = () => {
    setIsClone(prevState => !prevState)
  }

  const toggleIsDead = () => {
    setIsDead(prevState => !prevState)
  }
  
  let tabs = ["Info", "Substrate", "Water", "Relatives"]
  if (typeof Number(speciesId) !== "number") {
    tabs = ["Info", "Substrate", "Water"]
  }



  return (
    <div className={`${InfoCardStyles.cardContainer} ${isOpen ? InfoCardStyles.showNewCard : InfoCardStyles.hideCard}`}>
      {((!speciesId && isOpen) || speciesId) &&
        <ButtonWithHoverLabel label={isOpen ? "close" : "open"} positioningStyles={InfoCardStyles.toggleInfoCardPosition}>
          <button aria-label='toggle-info-card' className={InfoCardStyles.toggleInfoCard} onClick={handleToggleInfoCard} >
            <FontAwesomeIcon icon={isOpen ? faChevronRight : faChevronLeft}/>
          </button>
        </ButtonWithHoverLabel>
      }
      
      <div className={`${isOpen ? InfoCardStyles.visibleCard : InfoCardStyles.invisibleCard}`}>
        {isNewOrEditing ? (
          <>
            <div className={InfoCardStyles.confirmationButtons}>
              <button 
                aria-label='confirm-changes'
                id={InfoCardStyles.confirm} 
                onClick={handleConfirm} 
                disabled={!isNameValid || isCreatingOrEditingLoading()}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button 
                aria-label='disgard-changes'
                id={InfoCardStyles.disgard}
                onClick={handleDisgard}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
               <button 
                aria-label='delete-item'
                id={InfoCardStyles.delete}
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrash}/>
              </button>
            </div>
          </>
        ) : (
          <button aria-label="edit-item" className={InfoCardStyles.edit} onClick={handleToggleEditView}>
            <FontAwesomeIcon icon={faGear}/>
          </button>
        )}

        <CatagorySpecificInfo 
          handleGenerateIndividualName={handleGenerateIndividualName} 
          isClone={isClone}
          isArtificialConditions={isArtificialConditions}
          isDead={isDead}
          toggleIsArtificialConditions={toggleIsArtificialConditions}
          toggleIsClone={toggleIsClone}
          toggleIsDead={toggleIsDead}
          name={name} 
          images={images} 
          setImages={setImages} 
          group={group}
          setGroup={setGroup} 
          handleNameChange={handleNameChange} 
          isNameValid={isNameValid} 
          catagory={catagory} 
          species={speciesInfo.current}
        />
        <div className={TabStyles.tabContainer}>
          {tabs.map(tab => 
            <Tab handleTabClick={handleTabClick} tabName={tab} activeTab={activeTab} key={tab}/> 
            )
          }
        </div>
        {activeTab === "Info" &&
          <div className={InfoCardStyles.activeTabContents}>
            {isNewOrEditing ? (
              <ReactQuill
              onChange={(content, delta, source, editor)=>handleDescriptionChange(content, delta, source, editor)}
              placeholder="Start writing..."
              value={descriptionDelta}
              theme='bubble' 
              modules={modules} 
              className={`${InfoCardStyles.editorInput} ${'ql-container'}`}
              />
            ) : descriptionHTML !== undefined ? (
              <div className={`ql-editor`} dangerouslySetInnerHTML={{ __html: descriptionHTML}} />
            ) : (
              <div className={InfoCardStyles.aboutContainerEmpty}></div>
            )}
            
           
          </div>
        }
        {activeTab === "Substrate" &&
          <div className={InfoCardStyles.activeTabContents}>
            <SubstrateChart substrateValues={substrateValues} handleChangeSubstrate={handleChangeSubstrate} />
          </div>
        }
        {activeTab === "Water" &&
          <div className={InfoCardStyles.activeTabContents}>
            <WaterChart waterValues={waterValues} handleChangeWater={handleChangeWater}/>
          </div>
        }
        {activeTab === "Relatives" &&
          <div className={InfoCardStyles.activeTabContents}>
            <MiniLineageTree mother={parents?.mother} father={parents?.father} child={{name, image: images.length ? images[0] : "", id: ""}} handleChangeParents={handleChangeParents} />
          </div>
        }
      </div>
    </div>
  )
}

export default InfoCard