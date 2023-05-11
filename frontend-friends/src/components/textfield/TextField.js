import './textfield.scss'

/**
 * Textfield is a component where the user can write input
 * @param {*} props contains what type of textfield it should be.
 *            For example, normal or password. It also contains a default text value
 * @returns a textfield component that the user can input data into.
 */
export default function TextField (props) {
  const isRequired = props.isRequired || false

  let inputType = 'text'
  if (props.type != null) {
    inputType = props.type
  }

  if (isRequired) {
    return (
      <div className='text-field'>
        <input className={props.class} type={inputType} id={props.id} name='mandatory-text-field' required onChange={props.onChange} onKeyDown={props.onKeyDown} defaultValue={props.value} value={props.value}/>
        <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
      </div>
    )
  }
  return (
    <div className='text-field'>
      <input className={props.class} type={inputType} id={props.id} name='text-field' onChange={props.onChange} onKeyDown={props.onKeyDown} defaultValue={props.value} value={props.value} />
      <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
}
