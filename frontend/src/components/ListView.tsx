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

}
const ListView:React.FC<Props> = ({catagory, children, styles}) => {
  const dispatch = useDispatch();
  const handleNewItem = () => {
    dispatch(toggleInfoCardOn({isInfoCardNewOrEditing: true, catagory}));
  };

  
  return (
    <div className={`${CardStyles.listContainer}`} id={styles}>
      {children}
      <div className={CardStyles.addItemContainer}>
        <button className={CardStyles.addBtn} onClick={handleNewItem}>
          <FontAwesomeIcon icon={faPlus} /> 
          Add {catagory}
        </button>
      </div>
    </div>
  )
}

export default ListView