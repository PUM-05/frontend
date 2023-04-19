import './subcategoryButton.scss'

/**
 * Creates a subcategorybutton component to be displayed on the input page
 * @param {*} props should contain style and the text for each button
 * @returns a subcategory button component
 */
export default function CategoryButton (props) {
  /**
   * Handles onclick on the button
   * @param {*} e is the onclick event
   */
  function handleChange (e) {
    props.onClick?.({ title: props.children, value: props.value, parentTitle: props.parentTitle })
  }
  return (
    <div className='subcategory-button-wrapper' style={props.style}>
      <input id={props.id} name={props.name} value={props.value} type='radio' className='red active' onClick={handleChange} checked={props.checked} />
      <label for={props.id} name={props.name} value={props.value} className={`${props.color ?? 'category-blue'}`}>
        {props.children}
      </label>
    </div>
  )
}
