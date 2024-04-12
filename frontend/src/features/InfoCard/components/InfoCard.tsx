import React, { useState } from 'react'
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import image from '../../../assets/3564.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ButtonWithHoverLabel from '../../../components/ButtonWithHoverLabel'
import Tab from '../../../components/Tab'
import TabStyles from '../../../styles/tabStyles.module.css'
import { getNewId } from '../../../utils/keyGen'
import image3 from '../../../assets/3564.jpg'
import LineageTree from '../../lineage-tree/components/LineageTree'

type Props = {
  displayInfoCard: (cardId: string) => void;
  isInfoCardOpen: boolean;
  cardId: string;
  toggleInfoCard: () => void;
  handleSearch: (e: React.KeyboardEvent) => void;
}


const root = [
  {
    title: "child 2",
    image: image3,
    _id: getNewId(),
    father: {
      title: "child 2",
      image: image3,
      _id: getNewId(),
      children: [
        
      ]
    },
    children: [
      {
        title: "child 2",
        image: image3,
        _id: getNewId(),
        father: {
          title: "child 2",
          image: image3,
          _id: getNewId(),
          children: [
            
          ]
        },
        children: [
          
        ]
      }
    ]
  }
]

const InfoCard:React.FC<Props> = ({displayInfoCard, isInfoCardOpen, cardId, toggleInfoCard, handleSearch}) => {
  const [activeTab, setActiveTab] = useState("")

  const handleTabClick = (e: React.MouseEvent) => {
    setActiveTab(e.target.id);
  }

  const changeInfoCard = () => {

  }

  const tabs = ["Info", "Substrate", "Water", "Relatives"]



  return (
    <div className={`${InfoCardStyles.cardContainer} ${isInfoCardOpen ? InfoCardStyles.showCard : InfoCardStyles.hideCard}`}>
      <ButtonWithHoverLabel label={isInfoCardOpen ? "close" : "open"} positioningStyles={InfoCardStyles.toggleInfoCardPosition}>
        <button className={InfoCardStyles.toggleInfoCard} onClick={toggleInfoCard}>
          <FontAwesomeIcon icon={isInfoCardOpen ? faChevronRight : faChevronLeft}/>
        </button>
      </ButtonWithHoverLabel>

      <div className={`${isInfoCardOpen ? InfoCardStyles.visibleCard : InfoCardStyles.invisibleCard}`}>
        <img src={image} className={InfoCardStyles.image}/>
        <div className={InfoCardStyles.info}>
          <h2>ST109</h2>
          <h3>Sceletium Tortuosum</h3>
          <span className={InfoCardStyles.group}>
            (
              <span>Hexangonal fruit variety</span>
            )
          </span>
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
            
          </div>
        }
        {activeTab === "Water" &&
          <div className={InfoCardStyles.activeTabContents}>
            
          </div>
        }
        {activeTab === "Relatives" &&
          <div className={InfoCardStyles.activeTabContents}>
            <LineageTree displayInfoCard={changeInfoCard} root={root}/>
          </div>
        }
      </div>
    </div>
  )
}

export default InfoCard