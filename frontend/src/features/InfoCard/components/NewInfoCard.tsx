import React, {  useRef, useState } from 'react'
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronLeft, faChevronRight,  faGear,  faMagicWandSparkles, faPencil } from '@fortawesome/free-solid-svg-icons'
import ButtonWithHoverLabel from '../../../components/ButtonWithHoverLabel'
import Tab from '../../../components/Tab'
import TabStyles from '../../../styles/tabStyles.module.css'
import MiniLineageTree from './MiniLineageTree'
import Substrate from './Substrate'
import DragAndDrop from './DragAndDrop'
import { LineageNode } from '../../lineage-tree/types'
import useClickOutside from '../../../hooks/useClickOutside'
import useAutoWidthInput from '../../../hooks/useAutoWidthInput'
import SelectedGroup from './SelectedGroup'
type Props = {
  isNewInfoCardOpen: boolean;
  toggleNewInfoCard: () => void;
  parentsOfNewChild?: {mother?: LineageNode, father?: LineageNode},
}


const NewInfoCard:React.FC<Props> = ({parentsOfNewChild={}, toggleNewInfoCard, isNewInfoCardOpen}) => {
  const [activeTab, setActiveTab] = useState("")
  const [images, setImages] = useState<string[]>([]);
  const [titleFocusState, setTitleFocus] = useState(false);



  const autoGenerateName = () => {
    return "ST112"
  }
  const [title, setTitle] = useState(autoGenerateName());

  const spanRef = useRef<HTMLSpanElement>(null);
  const titleWidth = useAutoWidthInput(spanRef, title)
  const inputRef = useRef<HTMLInputElement>(null);

  const clickOutsideInput = (e) => {
    setTitleFocus(false)
    if (title.length < 3) {
      setTitle(autoGenerateName())
    }
  }

  useClickOutside(inputRef, clickOutsideInput)




  const handleTabClick = (e: React.MouseEvent) => {
    setActiveTab(e.target.id);
  }

 

  const handleTitleFocus = () => {
    setTitleFocus(true)
  } 

  const handleTitleBlur = () => {
    setTitleFocus(false)
  } 


 


  

  const tabs = ["Info", "Substrate", "Water", "Relatives"]


//ADD DEFAULTS
  return (
    <div className={`${InfoCardStyles.cardContainer} ${isNewInfoCardOpen ? InfoCardStyles.showNewCard : InfoCardStyles.hideCard}`}>
      {isNewInfoCardOpen && 
      <ButtonWithHoverLabel label={isNewInfoCardOpen ? "close" : "open"} positioningStyles={InfoCardStyles.toggleInfoCardPosition}>
        <button className={InfoCardStyles.toggleInfoCard} onClick={toggleNewInfoCard}>
          <FontAwesomeIcon icon={isNewInfoCardOpen ? faChevronRight : faChevronLeft}/>
        </button>
      </ButtonWithHoverLabel>
      }

      <div className={`${isNewInfoCardOpen ? InfoCardStyles.visibleCard : InfoCardStyles.invisibleCard}`}>
        <div className={InfoCardStyles.imageContainer}>
          <DragAndDrop images={images} setImages={setImages}/>
        </div>
        <div className={InfoCardStyles.info}>
          <div className={InfoCardStyles.nameContainer} ref={inputRef}>
            <span className={"hide"} ref={spanRef}>{title}</span>
            <input 
              aria-label={`title-input`}
              style={{width: titleWidth}}
              value={title} 
              onClick={handleTitleFocus}
              className={`${InfoCardStyles.label} ${titleFocusState ? InfoCardStyles.input : null}`} 
              onChange={e=> setTitle(e.target.value)}
            />
            <button className={InfoCardStyles.editNameBtn} onClick={titleFocusState ? handleTitleBlur : handleTitleFocus}>
              <FontAwesomeIcon icon={titleFocusState ? faCheck : faPencil}/>
            </button>
            {!titleFocusState && (
              <ButtonWithHoverLabel label='Generate Name'>
                <button className={InfoCardStyles.generateNameBtn} onClick={() => setTitle(autoGenerateName())}>
                  <FontAwesomeIcon icon={faMagicWandSparkles}/>
                </button>
              </ButtonWithHoverLabel>
            )}
        
          </div>
          <h3>Sceletium Tortuosum</h3>
            <SelectedGroup selectedGroup={"Hexangonal fruit variety"}/>

        </div>
        <div className={TabStyles.tabContainer}>
          {tabs.map(tab => 
            <Tab handleTabClick={handleTabClick} tabName={tab} activeTab={activeTab}/> 
            )
          }
        </div>
        {activeTab === "Info" &&
          <div className={InfoCardStyles.activeTabContents}>
            
          </div>
        }
        {activeTab === "Substrate" &&
          <div className={InfoCardStyles.activeTabContents}>
            <Substrate />
          </div>
        }
        {activeTab === "Water" &&
          <div className={InfoCardStyles.activeTabContents}>
          </div>
        }
        {activeTab === "Relatives" &&
          <div className={InfoCardStyles.activeTabContents}>
            <MiniLineageTree mother={parentsOfNewChild?.mother} father={parentsOfNewChild?.father} child={{image: images[0], title: "dwwdw"}} />
          </div>
        }
      </div>
    </div>
  )
}

export default NewInfoCard