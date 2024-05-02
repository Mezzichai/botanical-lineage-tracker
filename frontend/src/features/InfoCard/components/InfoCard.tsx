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
import {  selectCatagory,  selectId,  selectIsInfoCardOpen, selectIsInfoNewOrEditing, toggleInfoCardEditModeOn, toggleInfoCardOff, toggleInfoCardOn } from '../InfoCardSlice'
import { useCreateSpeciesGroupMutation, useCreateSpeciesIndividualMutation, useCreateSpeciesMutation, useDeleteSpeciesGroupMutation, useDeleteSpeciesIndividualMutation, useDeleteSpeciesMutation, useEditSpeciesGroupMutation, useEditSpeciesIndividualMutation, useEditSpeciesMutation, useGetSpecficIndividualInfoQuery, useGetSpecificGroupInfoQuery, useGetSpecificSpeciesInfoQuery } from '../../../api/apiSlice'
import WaterChart from './WaterChart'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { DeltaStatic } from 'quill'
import dataURLtoFile from '../../../utils/dataURLtoFile'
import useIsValidInput from '../../../hooks/useIsValidInput'
import CatagorySpecificInfo from './CatagorySpecificInfo'
import { Group, Parent, SubstrateEntry, WaterEntry } from '../../../types'



//cannot use keys to reset this component, too many possible collisions
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
  const prevCardId = useRef<string>("")
  const autoGenerateName = () => {
    return "ST112"
  }

  const {data: specificSpeciesInfo} = useGetSpecificSpeciesInfoQuery({speciesId: cardId}, {skip: !(Boolean(cardId) && catagory === "species")});
  const {data: specificGroupInfo} = useGetSpecificGroupInfoQuery({groupId: cardId}, {skip: !(Boolean(cardId) && catagory === "group")});
  const {data: specificIndividualInfo} = useGetSpecficIndividualInfoQuery({individualId: cardId}, {skip: !(Boolean(cardId) && catagory === "individual")});
  
  
  const [descriptionDelta, setDescriptionDelta] = useState<DeltaStatic | undefined>();
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [substrateValues, setSubstrateValues] = useState<SubstrateEntry[]>([]);
  const [waterPoints, setWaterPoints] = useState<WaterEntry[]>([]);
  const [parents, setParents] = useState<{mother: Parent, father: Parent}>();
  const [group, setGroup] = useState<Group>({id: "", name: ""})
  const [images, setImages] = useState<string[]>([])
  const speciesInfo = useRef<{ name: string; id: string}>({name: "", id: ""})
  const initialName = ((catagory === "individual") && !cardId) ? autoGenerateName() : "";
  const [isNameValid, name, handleNameChange] = useIsValidInput(1, 50, initialName);
  const [activeTab, setActiveTab] = useState("Info")
  const { speciesNameParam, groupNameParam } = useParams({ strict: false})

  useEffect(() => {
    if ((specificSpeciesInfo || specificGroupInfo || specificIndividualInfo) && prevCardId.current !== cardId) {
      const fetchedInfo = specificSpeciesInfo || specificGroupInfo || specificIndividualInfo;
      setDescriptionDelta(fetchedInfo?.description_delta ? JSON.parse(fetchedInfo?.description_delta) : "")
      setDescriptionHTML(fetchedInfo.description_html)
      setSubstrateValues(fetchedInfo.substrate_values)
      setWaterPoints(fetchedInfo.water_points)
      setParents({mother: fetchedInfo.mother, father: fetchedInfo.father})
      setGroup({name: fetchedInfo.groupName, id: fetchedInfo.groupId})
      setImages(fetchedInfo.images)
      handleNameChange(fetchedInfo.name || "")
      speciesInfo.current = {name: fetchedInfo?.speciesName, id: fetchedInfo?.speciesId}
      prevCardId.current = cardId
    }
  }, [specificGroupInfo, specificIndividualInfo, specificSpeciesInfo, handleNameChange, cardId])

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

  const handleChangeSubstrate = useCallback(() => {

  }, [])

  const  handleChangeWater = useCallback(() => {

  }, [])
  
  const handleChangeParents  = useCallback(() => {

  }, [])

  const handleTabClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    setActiveTab(e.currentTarget.id);
  }

  const handleToggleInfoCard = () => {
    if (isOpen) {
      dispatch(toggleInfoCardOff())
    } else {
      let catagory = ""
      if (groupNameParam) {
        catagory = "group"
      } else {
        catagory = "species"
      }
      dispatch(toggleInfoCardOn({infoCardCatagory: catagory}))
    }
  } 

  const handleConfirm = async () => {
    try {
      const descriptionString = JSON.stringify(descriptionDelta);
      const dataForm = new FormData();
      dataForm.set("name", name);
      dataForm.set("existing_images", JSON.stringify(images.filter(image => image.match(/https:\/\/.+?\.jpeg/))));
      images
        .filter(image => !image.match(/https:\/\/.+?\.jpeg/))
        .forEach((image, index) => {
          const file = dataURLtoFile(image, `image${index + 1}.jpeg`)
          dataForm.append(`images`, file);
        })

      dataForm.set("descriptionDelta", JSON.stringify(descriptionString));
      dataForm.set("descriptionHTML", descriptionHTML);
      dataForm.set("substrate_values", substrateValues?.length ? JSON.stringify(substrateValues) : "");
      dataForm.set("water_schedule", waterPoints?.length ? JSON.stringify(waterPoints) : "");
      dataForm.set("parents", JSON.stringify(parents));
      dataForm.set("groupId", group.id);

      if (catagory === "individual") {
        if (!cardId) {
          await createIndividual({form: dataForm, params: {speciesId: speciesInfo.current.id}})
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
  
  let tabs = ["Info", "Substrate", "Water", "Relatives"]
  if (!speciesNameParam) {
    tabs = ["Info", "Substrate", "Water"]
  }

  return (
    <div className={`${InfoCardStyles.cardContainer} ${isOpen ? InfoCardStyles.showNewCard : InfoCardStyles.hideCard}`}>
      {((!speciesNameParam && isOpen) || speciesNameParam) &&
        <ButtonWithHoverLabel label={isOpen ? "close" : "open"} positioningStyles={InfoCardStyles.toggleInfoCardPosition}>
          <button className={InfoCardStyles.toggleInfoCard} onClick={handleToggleInfoCard} >
            <FontAwesomeIcon icon={isOpen ? faChevronRight : faChevronLeft}/>
          </button>
        </ButtonWithHoverLabel>
      }
      
      <div className={`${isOpen ? InfoCardStyles.visibleCard : InfoCardStyles.invisibleCard}`}>
        {isNewOrEditing ? (
          <>
            <div className={InfoCardStyles.confirmationButtons}>
              <button 
                id={InfoCardStyles.confirm} 
                onClick={handleConfirm} 
                disabled={!isNameValid || isCreatingOrEditingLoading()}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button id={InfoCardStyles.disgard}
                onClick={handleDisgard}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              {cardId &&
               <button id={InfoCardStyles.delete}
                onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash}/>
              </button>}
            </div>
          </>
        ) : (
          <button className={InfoCardStyles.edit}>
            <FontAwesomeIcon icon={faGear} onClick={handleToggleEditView}/>
          </button>
        )}

        <CatagorySpecificInfo name={name} images={images} setImages={setImages} group={group} setGroup={setGroup} handleNameChange={handleNameChange} isNameValid={isNameValid} catagory={catagory} species={speciesInfo.current}/>
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
            <WaterChart waterPoints={waterPoints} handleChangeWater={handleChangeWater}/>
          </div>
        }
        {activeTab === "Relatives" &&
          <div className={InfoCardStyles.activeTabContents}>
            <MiniLineageTree mother={parents?.mother} father={parents?.father} child={{name, image: images[0]}} handleChangeParents={handleChangeParents} />
          </div>
        }
      </div>
    </div>
  )
}

export default InfoCard