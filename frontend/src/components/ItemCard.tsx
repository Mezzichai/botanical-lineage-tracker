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
<<<<<<< HEAD
  handleHover?: (id:string) => void;
=======
  handleHover?: (id?:string) => void;
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
  handleUnHover?: () => void;
  imageDimensions: {width: number, height?: number};
  children: ReactNode,
  styles?: string
}
const ItemCard: React.FC<Props> = ({image, id, handleClick = ()=>{}, sizeStyles, styles, imageDimensions, handleHover = ()=>{}, handleUnHover = ()=>{}, children}) => {
<<<<<<< HEAD
=======

>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
  return (
    <div 
      aria-label={`item-${id}`}
      className={`${CardStyles.cardContent} ${sizeStyles} ${styles}`}
      onClick={()=> handleClick(id || "")}
<<<<<<< HEAD
      onMouseEnter={() => handleHover(id as string)} 
=======
      onMouseEnter={() => handleHover(id)} 
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
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
