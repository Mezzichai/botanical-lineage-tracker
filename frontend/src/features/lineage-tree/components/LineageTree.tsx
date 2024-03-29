import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageGeneration from './LineageGeneration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMagnifyingGlass, faSliders} from '@fortawesome/free-solid-svg-icons'
import image1 from '../../../assets/13947.jpg'
import image2 from '../../../assets/3267562ab45a1bf8b94660e0cbf2d9d7--cannabis.jpg'
import image3 from '../../../assets/R.jpg'
import image6 from '../../../assets/hearthstone_collective_kanna_sceletium_tortuosum_info_page_wild_kanna_growing_in_the_karoo_south_africa_680x.jpg'
import { getNewId } from '../keyGen'
const root = [
  {
  title: "parent",
  images: image1,
  _id: getNewId(),

  // description: "ddw",
  // sunExposure: 12,
  // isClone: false,
  // supplementationLog: [],
  // substrate: [60, 40, 0],
  // substrateNotes: "xyz",
  children: [
    {
      title: "child 2",
      image: image3,
      _id: getNewId(),
      father: {
        title: "child 2",
        image: image1,
        _id: getNewId(),
        children: [
          
        ]
      },
      children: [

      ]
    },  {
      title: "child 2",
      image: image3,
      _id: getNewId(),
      father: {
        title: "child 2",
        image: image1,
        _id: getNewId(),
        children: [
          
        ]
      },
      children: [

      ]
    },  {
      title: "child 2",
      image: image3,
      _id: getNewId(),
      father: {
        title: "child 2",
        image: image1,
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
            image: image1,
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
                image: image1,
                _id: getNewId(),
                children: [
                  
                ]
              },
              children: [
        
              ]
            },  {
              title: "child 2",
              image: image3,
              _id: getNewId(),
              father: {
                title: "child 2",
                image: image1,
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
                    image: image1,
                    _id: getNewId(),
                    children: [
                      
                    ]
                  },
                  children: [
            
                  ]
                },  {
                  title: "child 2",
                  image: image3,
                  _id: getNewId(),
                  father: {
                    title: "child 2",
                    image: image1,
                    _id: getNewId(),
                    children: [
                      
                    ]
                  },
                  children: [
            
                  ]
                },  {
                  title: "child 2",
                  image: image3,
                  _id: getNewId(),
                  father: {
                    title: "child 2",
                    image: image1,
                    _id: getNewId(),
                    children: [
                      
                    ]
                  },
                  children: [
            
                  ]
                },
              ]
            },
          ]
        }, 

         {
          title: "child 2",
          image: image3,
          _id: getNewId(),
          father: {
            title: "child 2",
            image: image1,
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
                image: image1,
                _id: getNewId(),
                children: [
                  
                ]
              },
              children: [
        
              ]
            },  {
              title: "child 2",
              image: image3,
              _id: getNewId(),
              father: {
                title: "child 2",
                image: image1,
                _id: getNewId(),
                children: [
                  
                ]
              },
              children: [
        
              ]
            },  {
              title: "child 2",
              image: image3,
              _id: getNewId(),
              father: {
                title: "child 2",
                image: image1,
                _id: getNewId(),
                children: [
                  
                ]
              },
              children: [
        
              ]
            },
          ]
        },
      ]
    },
  ]
  }  
]

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
      <LineageGeneration children={root}/>
    </div>
    </>
  )
}

export default LineageTree