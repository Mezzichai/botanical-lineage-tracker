import React, {  useRef, useState } from 'react'
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMagicWandSparkles, faPencil } from '@fortawesome/free-solid-svg-icons'
import DragAndDrop from './DragAndDrop'
import useClickOutside from '../../../hooks/useClickOutside'
import { selectIsInfoNewOrEditing } from '../InfoCardSlice'
import { useSelector } from 'react-redux'
import ButtonWithHoverLabel from '../../../components/ButtonWithHoverLabel'
import SelectedGroup from './SelectedGroup'
import placeholder from '../../../assets/placeholder.jpeg'
import { Group } from '../../../types'
import InfoBox from '../../../components/InfoBox'


type Props = {
  name: string,
  handleNameChange: (value: string) => void
  isNameValid: boolean
  catagory: "group" | "species" | "individual"
  images: string[]
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group>>
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  species?: {name: string, id: string}
  handleGenerateIndividualName: () => void
}
const CatagorySpecificInfo:React.FC<Props> = ({name, images, setImages, group, setGroup, handleNameChange, isNameValid, catagory, species, handleGenerateIndividualName}) => {
  const [nameFocusState, setnameFocus] = useState(false);
  const isNewOrEditing = useSelector(selectIsInfoNewOrEditing)
  const inputRef = useRef<HTMLInputElement>(null);

  const clickOutsideInput = () => {
    setnameFocus(false)
    if (name.length < 0) {
      handleNameChange("")
    }
  }

  const nameRef = useRef<HTMLInputElement | null>(null);
  
  useClickOutside(inputRef, clickOutsideInput)


  const handlenameFocus = () => {
    setnameFocus(true)
    if (nameRef?.current) {
      nameRef.current.focus()
    }
  } 

  const handlenameBlur = () => {
    setnameFocus(false)
    if (nameRef?.current) {
      nameRef.current.blur()
    }
  } 


  return (
    <>
      {isNewOrEditing ? (
        <>
          <div className={InfoCardStyles.imageContainer}>
            <DragAndDrop images={images} setImages={setImages}/>
          </div>
          <div className={InfoCardStyles.info}>
            <div className={InfoCardStyles.nameContainer} ref={inputRef}>
              <label className={InfoCardStyles.nameInputLabel} htmlFor="name">
                {catagory === "group" && "Group Name:"}
                {catagory === "species" && "Species Name:"}
                {catagory === "individual" && "Individual Name:"}
              </label>
              <input 
                id="name"
                ref={nameRef}
                type='text'
                aria-label={`name-input`}
                value={name} 
                onClick={handlenameFocus}
                className={`${InfoCardStyles.label} ${InfoCardStyles.input}`} 
                onChange={e=> handleNameChange(e.target.value)}
              />
              {(!isNameValid && document.activeElement === nameRef.current) &&
                <InfoBox message='label title must be 1-50 characters' styles={InfoCardStyles.instructions} />
              }
              {catagory === "individual" && (
                <ButtonWithHoverLabel label='Generate Name'>
                  <button className={InfoCardStyles.generateNameBtn} onClick={handleGenerateIndividualName}>
                    <FontAwesomeIcon icon={faMagicWandSparkles}/>
                  </button>
                </ButtonWithHoverLabel>
              )}
              <button aria-label={"edit-name"} className={InfoCardStyles.editNameBtn} onClick={nameFocusState ? handlenameBlur : handlenameFocus}>
                <FontAwesomeIcon icon={nameFocusState ? faCheck : faPencil}/>
              </button>
            </div>
            {catagory === "individual" && (
              <SelectedGroup setGroup={setGroup} selectedGroup={group}/>
            )} 
            {(catagory === "individual" || catagory === "group") && (
              <h2>{species?.name}</h2>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={InfoCardStyles.imageContainer}>
            <img 
              srcSet={`${images?.length ? `${images[0]}?w=400&h=265&fit=crop&auto=format&dpr=3` : placeholder}`}
              src={images[0] || placeholder}
              style={{ width: '400px', height: 'auto' }}
            />
          </div>
          <div className={InfoCardStyles.info}>
            {catagory === "individual" && species?.name ? (
              <>
                <h2>{name}</h2>
                <h3>{species.name}</h3>
                {group?.name && (
                  <span className={InfoCardStyles.group}>
                  (
                    <span>{group.name}</span>
                  )
                  </span>
                )}
               
              </>
            ) : catagory === "group" && species?.name ? (
              <>
                <h2>{group.name}</h2>
                <h3>{species.name}</h3>
              </>
            ) : (
              <>
                <h3>{name}</h3>
              </>
            )}
          </div>
        </>
      )}
    </>

  )
}

export default CatagorySpecificInfo