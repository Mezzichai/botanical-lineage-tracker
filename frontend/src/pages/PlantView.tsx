import { useCallback, useState } from 'react'
import LineageTree from '../features/lineage-tree/components/LineageTree'
import GridView from '../features/grid-view/components/GridView'
import InfoCard from '../features/InfoCard/components/InfoCard'
import SearchBar from '../components/SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faTree } from '@fortawesome/free-solid-svg-icons'
import plantViewStyles from '../styles/plantViewStyles.module.css'
import image1 from '../assets/13947.jpg'
import image3 from '../assets/R.jpg'
import { getNewId } from '../utils/keyGen'

const root = [
  {
  title: "parent",
  image: image1,
  _id: getNewId(),
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
          title: "child 3",
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
            }, {
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
                    
                  ]
                },
              ]
            }, {
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
                    
                  ]
                }, {
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
                },        {
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
                        }, {
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
                        }, {
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
                            }, {
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
                                }, {
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
                                }, {
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
                                }, {
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
                                        }, {
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
                            },
                          ]
                        },
                      ]
                    },
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
            }, {
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
                },
              ]
            }, {
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
                }, {
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
    },
    {
      title: "child 3",
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
          title: "child 3",
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
        },   {
          title: "child 3",
          image: image3,
          _id: getNewId(),
          father: {
            title: "child 2",
            image: image1,
            _id: getNewId(),
            children: []
          },
          children: []
        },
      ]
    },
  ]
  }  
]

// function initializeWidthTree(root) {
//   function applyWidths(nodes) {
//     for (let i = 0; i < nodes.length; i++) {
//       if (nodes[i].children.length && nodes.length <= 2) {
//         applyWidths(nodes[i].children)
//         const childWidthSum = nodes[i].children.reduce((acc, child) => acc += child.width, 0)
//         nodes[i].width = childWidthSum || 176 + 395;
//       } else if (nodes.length > 2) {
//         nodes[0].width = 133 + (nodes.length * 44)
//       }
//     }
//     return [...nodes]
//   }
//   return applyWidths(root)
// }
// const treeWithWidths = initializeWidthTree(root);



const PlantView = () => {
  const [view, setView] = useState<"tree" | "grid">("tree")
  const [isInfoCardOpen, setIsInfoCardOpen] = useState<boolean>(false)
  const [cardId, setInfoCardId]= useState<string>("")
  // const [tree, setTree] = useState<LineageNode[]>(treeWithWidths)

  const displayInfoCard = useCallback((cardId: string) => {
    setIsInfoCardOpen(true)
    setInfoCardId(cardId)
  }, [])

  const toggleInfoCard = () => {
    setIsInfoCardOpen(prevState => !prevState)
  }

  const handleSearch = () => {

  }

  const handleChangeView = (view: "grid" | "tree") => {
    setView(view)
  }

  return (
    <>
      <div className={plantViewStyles.viewInfo}>
        <div className={plantViewStyles.viewHeader}>
          <div className={plantViewStyles.plantName}>
            <FontAwesomeIcon icon={faChevronLeft}/>
            Sceletium Tortuosum
          </div>
          <SearchBar />
        </div> 

        <div className={plantViewStyles.viewSettings}>
          <button 
            className={`${plantViewStyles.viewOption} ${view === "tree" ? plantViewStyles.viewOptionSelected : ""}`} 
            id={plantViewStyles.treeButton}
            onClick={() => handleChangeView('tree')}
          >
            <FontAwesomeIcon icon={faTree}/> 
              Tree
          </button>
          <button 
            className={`${plantViewStyles.viewOption} ${view === "grid" ? plantViewStyles.viewOptionSelected : ""}`} 
            id={plantViewStyles.gridButton}
            onClick={() => handleChangeView('grid')}
          > 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={plantViewStyles.directSvg}>
              <path style={{ lineHeight: 'normal', textIndent: 0, textAlign: 'start', textDecorationLine: 'none', textDecorationStyle: 'solid', textDecorationColor: '#000', textTransform: 'none', blockProgression: 'tb', isolation: 'auto', mixBlendMode: 'normal' }} d="M 2.5 1 C 1.6774686 1 1 1.6774686 1 2.5 L 1 5 L 1 6 L 1 9 L 1 10 L 1 12.5 C 1 13.322531 1.6774686 14 2.5 14 L 12.5 14 C 13.322531 14 14 13.322531 14 12.5 L 14 6 L 14 5 L 14 2.5 C 14 1.6774686 13.322531 1 12.5 1 L 2.5 1 z M 2.5 2 L 5 2 L 5 5 L 2 5 L 2 2.5 C 2 2.2185314 2.2185314 2 2.5 2 z M 6 2 L 9 2 L 9 5 L 6 5 L 6 2 z M 10 2 L 12.5 2 C 12.781469 2 13 2.2185314 13 2.5 L 13 5 L 10 5 L 10 2 z M 2 6 L 5 6 L 5 9 L 2 9 L 2 6 z M 6 6 L 9 6 L 9 9 L 6 9 L 6 6 z M 10 6 L 13 6 L 13 9 L 10 9 L 10 6 z M 2 10 L 5 10 L 5 13 L 2.5 13 C 2.2185314 13 2 12.781469 2 12.5 L 2 10 z M 6 10 L 9 10 L 9 13 L 6 13 L 6 10 z M 10 10 L 13 10 L 13 12.5 C 13 12.781469 12.781469 13 12.5 13 L 10 13 L 10 10 z" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"/>
            </svg> Grid
          </button>
        </div>
      </div>

      <InfoCard handleSearch={handleSearch} displayInfoCard={displayInfoCard} isInfoCardOpen={isInfoCardOpen} toggleInfoCard={toggleInfoCard} cardId={cardId}/>
      
      {view === "tree" 
      ? <LineageTree displayInfoCard={displayInfoCard} root={root}/>
      : <GridView/>
      }
    </>
  )
}

export default PlantView