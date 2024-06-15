import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CardStyles from '../styles/cardAndListStyles.module.css'
import { toggleInfoCardOn } from '../features/InfoCard/InfoCardSlice'
import { useDispatch } from 'react-redux'
import { ReactNode } from 'react'
type Props = {
  catagory: "group" | "species" | "individual";
  children: ReactNode;
  styles: string
  sizeStyles: string
}
const ListView:React.FC<Props> = ({catagory, children, styles, sizeStyles}) => {
  const dispatch = useDispatch();
  const handleNewItem = () => {
    dispatch(toggleInfoCardOn({isInfoCardNewOrEditing: true, catagory}));
  };

  
  return (
    <div className={`${CardStyles.listContainer}`} id={styles}>
      {children}
      <div className={`${CardStyles.addItemContainer} ${sizeStyles}`}>
        <button aria-label={"add-new-item"} className={CardStyles.addBtn} onClick={handleNewItem}>
          <FontAwesomeIcon icon={faPlus} /> 
          Add {catagory}
        </button>
      </div>
    </div>
  )
}

export default ListView