import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageNode from './LineageNode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMagnifyingGlass, faSliders} from '@fortawesome/free-solid-svg-icons'
import image1 from '../../../assets/13947.jpg'
import image2 from '../../../assets/3267562ab45a1bf8b94660e0cbf2d9d7--cannabis.jpg'
import image3 from '../../../assets/R.jpg'
import image4 from '../../../assets/3564.jpg'
import image5 from '../../../assets/Sceletium_tortuosum_01102003_Afrique_du_sud_2-by-H-Brisse-upload-by-Abalg-640x423.jpg'
import image6 from '../../../assets/hearthstone_collective_kanna_sceletium_tortuosum_info_page_wild_kanna_growing_in_the_karoo_south_africa_680x.jpg'

const root = [{
  title: "parent",
  images: [image1, image2, image3],
  description: "ddw",
  sunExposure: 12,
  isClone: false,
  supplementationLog: [],
  substrate: [60, 40, 0],
  substrateNotes: "xyz",
  children: [
    {
      title: "child 1",
      image: image2,
      children: [
        {
          title: "grand child 1",
          image: image6,
          children: [
       
          ]
        },
        
      ]
    },
    {
      title: "child 2",
      image: image3,
      children: [
 
      ]
    },
    {
      title: "child 3",
      image: image4,
      children: [
   
      ]
    },
    {
      title: "child 4",
      image: image5,
      children: [
   
      ]
    }
  ]
}]

const LineageTree = () => {
  return (
    <>
    <div className={LineageTreeStyles.treeInfo}>
      <div className={LineageTreeStyles.treeName}>
        <FontAwesomeIcon icon={faChevronLeft}/>
        Sceletium Tortuosum
      </div>
      <div className={LineageTreeStyles.filters}>
        <div className={LineageTreeStyles.search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            placeholder='Search Lineage...'
          />
        </div>
        <button className={LineageTreeStyles.filterButton}>
          <FontAwesomeIcon icon={faSliders}/>
          Filters
        </button>
      </div>
    </div>
    <div className={LineageTreeStyles.treeContainer}>
      <LineageNode children={root}/>
    </div>
    </>
  )
}

export default LineageTree