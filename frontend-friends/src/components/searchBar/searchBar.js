import SearchIcon from '../../utils/icons/SearchIcon'
import './searchBar.scss'

/**
 * Searchbar is a component where the user can type in a string and search for it
 * @param {*} props contains the value, onChange and onKeyDown (for example)
 * @returns a searchbar component that the user can input data into.
 */
export default function SearchBar (props) {
  return (
    <div className='text-field'>
      <div className='textfield-input-container'>
        <input
          className='search' onChange={props.onChange} onKeyDown={props.onKeyDown}
        />
        <label className={props.value && 'filled'} style={{ display: props.value ? 'none' : '' }} htmlFor={props.id}><div className='placeholder-content'><SearchIcon className='search-icon' />{props.placeholder}</div></label>
      </div>
    </div>

  )
}
