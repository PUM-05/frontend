import SearchIcon from '../../utils/icons/SearchIcon'
import './searchBar.scss'

/**
 * Textfield is a component where the user can write input
 * @param {*} props contains what type of textfield it should be.
 *            For example, normal or password. It also contains a default text value
 * @returns a textfield component that the user can input data into.
 */
export default function SearchBar (props) {

  return (
    <div className='text-field'>
      <div className='textfield-input-container'>
        <input
            className='search' onChange={props.onChange}
        />
        <label className={props.value && 'filled'} htmlFor={props.id}><div className='placeholder-content'><SearchIcon className='search-icon'/>{props.placeholder}</div></label>
      </div>
    </div>

  )
}
