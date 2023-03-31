import './textfield.scss'

export default function TextField (props) {
  const isRequired = props.isRequired || false
  
  // check for propsvalue
  if (props.value == undefined) {
    // send error message
    return (
      <div className='text-field'>
        Needs a prop value!
      </div>
    )
  }

  if (isRequired) {
    return (
      <div className='text-field'>
        <input type='text' id={props.id} name='mandatory-text-field' required onChange={props.onChange} />
        <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
      </div>
    )
  }
  return (
    <div className='text-field'>
      <input type='text' id={props.id} name='text-field' onChange={props.onChange} />
      <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
}
