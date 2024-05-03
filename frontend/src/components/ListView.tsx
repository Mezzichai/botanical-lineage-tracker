import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CardStyles from '../styles/cardAndListStyles.module.css'
import ItemCard from './ItemCard'
import { toggleInfoCardOn } from '../features/InfoCard/InfoCardSlice'
import { useDispatch } from 'react-redux'
type Props = {
  catagory: "group" | "species" | "individual";
  handleItemClick: (id: string) => void;
}
const ListView:React.FC<Props> = ({catagory, handleItemClick, items}) => {
  const dispatch = useDispatch();
  const handleNewSpecies = () => {
    dispatch(toggleInfoCardOn({isInfoCardNewOrEditing: true, catagory}));
  };

  return (
    <div className={CardStyles.listContainer}>
      {items.map((item, index) => {
        <ItemCard  key={index + String(item.id)} handleClick={() => handleItemClick(item.id)} info={item} catagory={catagory}/>
      })}
      <div className={CardStyles.addItemContainer}>
        <button className={CardStyles.addBtn} onClick={handleNewSpecies}>
          <FontAwesomeIcon icon={faPlus} /> 
          Add {catagory}
        </button>
      </div>
    </div>
  )
}

export default ListView