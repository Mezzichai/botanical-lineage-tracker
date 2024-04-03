import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import LineageGeneration from './LineageGeneration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMagnifyingGlass, faSliders} from '@fortawesome/free-solid-svg-icons'
import image1 from '../../../assets/13947.jpg'
import image3 from '../../../assets/R.jpg'
import { getNewId } from '../keyGen'
import { useCallback, useState } from 'react'
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
            children: [
              
            ]
          },
          children: [
           
        
            
          ]
        },
      ]
    },
 
    
  ]
  }  
]
const LineageTree = () => {

  const [ulWidths, setUlWidths] = useState<number[]>([])

  const handleChangeWidths = useCallback((width: number, depth?: number) => {
    console.log(width, depth)

    if (!depth) {
      setUlWidths(prevUlWidths => { 
        console.log(prevUlWidths)
        return [width, ...prevUlWidths]
      });
      return 
    }
    
    if (width <= 0) {
      setUlWidths(prevUlWidths => prevUlWidths.slice(0, depth+1))
    }

    setUlWidths(prevulWidths => {
      let widthsToBeUpdated = prevulWidths.slice(0, depth+1)
      const preservedWidths = prevulWidths.slice(depth+1)
      widthsToBeUpdated = widthsToBeUpdated.map((prevWidth) => {
        if (prevWidth < width) {
          return width
        }
        return prevWidth
      })
      return widthsToBeUpdated.concat(preservedWidths)
    })
  }, [])

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
      <LineageGeneration children={root} ulWidths={ulWidths} handleChangeWidths={handleChangeWidths} depth={0}/>
    </div>
    </>
  )
}

export default LineageTree