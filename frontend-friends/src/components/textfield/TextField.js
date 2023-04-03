import './textfield.scss'

export default function TextField (props) {
  const isRequired = props.isRequired || false

  let inputType = 'text'
  if (props.type != null) {
    inputType = props.type
  }

  if (isRequired) {
    return (
      <div className='text-field'>
        <input type={inputType} id={props.id} name='mandatory-text-field' required onChange={props.onChange} onKeyDown={props.onKeyDown} defaultValue={props.value}/>
        <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
      </div>
    )
  }
  return (
    <div className='text-field'>
      <input type={inputType} id={props.id} name='text-field' onChange={props.onChange} onKeyDown={props.onKeyDown} defaultValue={props.value}/>
      <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
}
