import React from "react";
import LineageTreeStyles from '../styles/LineageTreeStyle.module.css'
import placeholder from '../../../assets/placeholder.jpeg'

type Props = {
  image?: string;
  id: string;
  displayInfoCard: (id: string) => void;
  isParentBeingHovered?: boolean;
  handleHover?: (_id:string) => void;
  handleUnHover?: () => void;
  
}



const TreeNode: React.FC<Props> = ({id, image, displayInfoCard, isParentBeingHovered, handleHover=() => {}, handleUnHover, children}) => {
  return (
    <div
      onClick={displayInfoCard ? () => displayInfoCard(id) : () => {}}
      onMouseEnter={() => handleHover(id)} 
      onMouseLeave={handleUnHover} 
      className={
        `${LineageTreeStyles.nodeContent} 
        ${isParentBeingHovered ? LineageTreeStyles.parentFocused : ""}`
      }
    >
      <>
        <img 
          srcSet={`${image ? `${image}?w=176&fit=crop&auto=format&dpr=3` : placeholder}`}
          src={image} className={LineageTreeStyles.nodeImage}
        />        
        {children}
      </>
    </div>
  )
}

export default TreeNode

