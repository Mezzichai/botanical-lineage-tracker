import placeholder from '../assets/placeholder.jpeg'
import CardStyles from '../styles/cardAndListStyles.module.css'
import { ReactNode } from '@tanstack/react-router'
type Props = {
  image?: string,
  name?: string,
  id?: string,
  handleClick?: (id: string) => void;
  sizeStyles: string;
  hovered?: boolean;
  handleHover?: (id?:string) => void;
  handleUnHover?: () => void;
  imageDimensions: {width: number, height?: number};
  children: ReactNode,
  styles?: string
}
const ItemCard: React.FC<Props> = ({image, id, handleClick = ()=>{}, sizeStyles, styles, imageDimensions, handleHover = ()=>{}, handleUnHover = ()=>{}, children}) => {

  return (
    <div 
      aria-label={`item-${id}`}
      className={`${CardStyles.cardContent} ${sizeStyles} ${styles}`}
      onClick={()=> handleClick(id || "")}
      onMouseEnter={() => handleHover(id)} 
      onMouseLeave={handleUnHover} 
    >
      <img 
        srcSet={`${image ? `${image}?w=${imageDimensions.width}&h=${imageDimensions.height || "auto"}&fit=crop&auto=format&dpr=2` : placeholder}`}
        src={image || placeholder}
      />
      {children}
    </div>
  )
}

export default ItemCard
