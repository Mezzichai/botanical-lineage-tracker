import React, {  useRef, useState } from 'react'
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClone, faFlask, faMagicWandSparkles, faPencil, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
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
  isClone: boolean,
  isArtificialConditions: boolean,
  isDead: boolean,
  toggleIsDead: () => void
  toggleIsClone: () => void
  toggleIsArtificialConditions: () => void
}
const CatagorySpecificInfo:React.FC<Props> = ({name, isClone, isArtificialConditions, isDead, toggleIsArtificialConditions, toggleIsClone, toggleIsDead, images, setImages, group, setGroup, handleNameChange, isNameValid, catagory, species, handleGenerateIndividualName}) => {
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

  console.log(isDead)
  const extraInfoItems = 
    [
      {
        name: "cloneStatus",
        label: "this individual is a clone",
        state: isClone,
        activeColorStyles: InfoCardStyles.clonedIndividual,
        inactiveColorStyles: InfoCardStyles.notClonedIndividual,
        toggleChange: toggleIsClone,
        icon: faClone
      },
      {
        name: "artificialStatus",
        label: "this individual is in artificial conditions",
        state: isArtificialConditions,
        activeColorStyles: InfoCardStyles.artificialIndividual,
        inactiveColorStyles: InfoCardStyles.notArtificialIndividual,
        toggleChange: toggleIsArtificialConditions,
        icon: faFlask
      },
      {
        name: "deathStatus",
        label: "this individual is dead",
        state: isDead,
        activeColorStyles: InfoCardStyles.deadIndividual,
        inactiveColorStyles: InfoCardStyles.notDeadIndividual,
        toggleChange: toggleIsDead,
        icon: faSkullCrossbones
      }
    ];

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
              <button 
                aria-label={"edit-name"} 
                className={InfoCardStyles.editNameBtn} onClick={nameFocusState ? handlenameBlur : handlenameFocus}
              >
                <FontAwesomeIcon icon={nameFocusState ? faCheck : faPencil}/>
              </button>
            </div>

            {(catagory === "group") && (
              <h2>{species?.name}</h2>
            )}

            {(catagory === "individual") && (
              <>
                <SelectedGroup setGroup={setGroup} selectedGroup={group}/>
                <div className={InfoCardStyles.bottomRowInfoBox}>
                  {species?.name}
                  <div className={`row ${InfoCardStyles.extraInfoButtons}`}>
                    {extraInfoItems.map((item, index)=> (
                      <ButtonWithHoverLabel 
                        label={item.label}
                        positioningStyles={InfoCardStyles.editExtraInfoButton} 
                        labelHoveringPositionStyles={
                          index === 1 
                          ? InfoCardStyles.hoverEditButtonFirstFromRight
                          : index === 2 
                          ? InfoCardStyles.hoverEditButtonSecondFromRight 
                          : ""
                        }
                      >
                        <div className={`row ${InfoCardStyles.editExtraInfoButton}`}>
                          <div 
                            className={`${item.state ? item.activeColorStyles : item.inactiveColorStyles} small-circle-with-icon`}
                          >
                            <FontAwesomeIcon icon={item.icon} />
                          </div>
                          <input type={'checkbox'} checked={item.state} onChange={item.toggleChange}/>
                        </div>
                      </ButtonWithHoverLabel>
                    ))}
                  </div>
                </div>
              </>
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
                {group?.name && (
                  <span className={InfoCardStyles.group}>
                  (
                    <span>{group.name}</span>
                  )
                  </span>
                )}
                <div className={InfoCardStyles.bottomRowInfoBox}>
                  {species.name}
                  <div className={`row ${InfoCardStyles.extraInfoButtons}`}>
                    {extraInfoItems
                      .filter(item => item.state)
                      .map((item, index, array)=> (
                        <ButtonWithHoverLabel 
                          key={item.name}
                          label={item.label}
                          labelHoveringPositionStyles={
                            array.length <= 1 
                            ? InfoCardStyles.hoverButtonLabelLeft
                            : index === 1 || index === 2 
                            ? InfoCardStyles.hoverButtonFirstFromRight
                            : ""
                          }
                        >
                          <div 
                            className={`${item.activeColorStyles} small-circle-with-icon`}
                          >
                            <FontAwesomeIcon icon={item.icon} />
                          </div>
                        </ButtonWithHoverLabel>
                      ))
                    }
                  </div>
                </div>
                
               
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