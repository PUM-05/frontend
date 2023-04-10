import './subcategoryButton.scss'

export default function CategoryButton (props) {
  function handleChange (e) {
    props.onClick?.({ title: props.children, value: props.value, parentTitle: props.parentTitle })
  }
  return (
    <div className='subcategory-button-wrapper' style={props.style}>
      <input id={props.id} name={props.name} value={props.value} type='radio' className='red active' onChange={handleChange} checked={props.checked} />
      <label htmlFor={props.id} name={props.name} value={props.value} className={`${props.color ?? 'darkblue'}`}>
        {props.children}
      </label>
    </div>
  )
}
