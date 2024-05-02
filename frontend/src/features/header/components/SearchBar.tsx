import { useState, useRef,} from 'react'
import SearchBarStyles from '../styles/searchBarStyles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons'
import ButtonWithHoverLabel from '../../../components/ButtonWithHoverLabel'
import SearchFilters from './SearchFilters'
import { useParams } from '@tanstack/react-router'


const SearchBar = () => {
  const inputRef = useRef(null)
  const searchRef = useRef(null)
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState([]);
  const [filtersVisibility, setFilterVisibility] = useState<boolean>(false)
  const { speciesNameParam } = useParams({ strict: false})

  //  const handleConfirmSearch = () => {
  //   if (searchInput !== "") {
  //     const searchParams = new URLSearchParams({
  //       search: searchInput
  //     });
  //     setSearchInput('');
  //   } else {
  //     inputRef.current.focus()
  //   }
  //  }


   const toggleFilters = () => {
    setFilterVisibility(prevState => !prevState)
   }

  return (
  <div 
    className={`${SearchBarStyles.searchContainer}`} 
    ref={searchRef}>
    <div 
      className={`${SearchBarStyles.search}`}>
        <button className={SearchBarStyles.btn}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={SearchBarStyles.searchIcon} />
        </button>
      <input
        ref={inputRef}
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        type="text"
        className={SearchBarStyles.input}
        placeholder='search...'
      />
    
      

      {speciesNameParam && (
        <ButtonWithHoverLabel label="filters">
          <button 
            aria-label="filters" 
            className={SearchBarStyles.btn}
            onClick={toggleFilters}
          >
            <FontAwesomeIcon icon={faSliders}/>
          </button>
          {filters.length > 0
          && 
          <div className={SearchBarStyles.filterCount} onClick={toggleFilters}>
            {filters.length}
          </div>
          } 
        </ButtonWithHoverLabel>
      )}
      
      {filtersVisibility &&
      <SearchFilters/>}
      
      {/* {searchInput !== "" && isActive ? (
      <>
        {loading ? (
          <div className={SearchBarStyles.searchResults}>
            <div className={SearchBarStyles.searchGroup}>
                <div className={SearchBarStyles.searchTitle}>Loading results...</div>
            </div>
          </div>
          ) : error ? (
          <div className={SearchBarStyles.searchResults}>
            <div className={SearchBarStyles.searchGroup}>
                <div className={SearchBarStyles.searchTitle}>{error.message}</div>
            </div>
          </div>
        ) : typeof data === "string" ? (
        <div className={SearchBarStyles.searchResults}>
          <div className={SearchBarStyles.searchGroup}>
            <div className={SearchBarStyles.searchTitle}>No results</div>
          </div>
        </div>
        ) : (
    
        <div className={SearchBarStyles.searchResults}>
          {data?.users?.length  ? 
          <div className={SearchBarStyles.searchGroup}>
            <div className={SearchBarStyles.groupNameContainer}>
              <span className={SearchBarStyles.groupName}>Users</span>
            </div>
            {data.users.map((user) => (
              <Link
              key={user._id}
              className={SearchBarStyles.userLink}
              to={`/users/${user._id}`}
              >
                <div key={user._id} className={SearchBarStyles.searchItem}>
                  <div className={SearchBarStyles.searchImageContainer}>
                    <img className={SearchBarStyles.searchImage} src={user.profilePicture} alt="profile" />
                  </div>
                  <div className={SearchBarStyles.searchTitle}>{user.username}</div>
                </div>
              </Link>
            ))}
          </div>
          : null}

          {data?.posts?.length ? 
          <div className={SearchBarStyles.searchGroup}>
            <div className={SearchBarStyles.groupNameContainer}>
              <span className={SearchBarStyles.groupName}>Posts</span>
            </div>
            {data.posts.map((post) => (
              <Link
                key={post._id}
                className={SearchBarStyles.userLink}
                to={`/users/${post._id}`}
              >
                <div key={post._id} className={SearchBarStyles.searchItem}>
                <div className={SearchBarStyles.searchImageContainer}>
                    <img className={SearchBarStyles.searchImage} src={post.postThumbnail} alt="post"/>
                  </div>
                  <div className={SearchBarStyles.searchTitle}>{post.postTitle}</div>
                </div>
              </Link>
              ))}
          </div>
          : null}

          {data?.tags?.length ? 
          <div className={SearchBarStyles.searchGroup}>
            <div className={SearchBarStyles.groupNameContainer}>
              <span className={SearchBarStyles.groupName}>Topics</span>
            </div>
            {data.tags.map((tag) => (
              <Link
                key={tag._id}
                className={SearchBarStyles.userLink}
                to={`/topic/${tag.title}`}
              >
                <div key={tag._id} className={SearchBarStyles.searchItem}>
                <div className={SearchBarStyles.searchImageContainer}>
                    <img className={SearchBarStyles.searchImage} src={tag.picture} alt="tag"/>
                  </div>
                  <div className={SearchBarStyles.searchTitle}>{tag.title}</div>
                </div>
              </Link>
              ))}
          </div>
          : null} 
        </div>
        )}
      </>
     ) : null} */}
    </div>
  </div>
  )
}

export default SearchBar