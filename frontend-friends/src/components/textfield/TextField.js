import './textfield.scss'

/**
 * Textfield is a component where the user can write input
 * @param {*} props contains what type of textfield it should be.
 *            For example, normal or password. It also contains a default text value
 * @returns a textfield component that the user can input data into.
 */
export default function TextField (props) {
  const isRequired = props.isRequired || false
  let inputType = props.type ?? 'text'

  /**
   * Checks if input is positiv integer, if not it prevents the input
   * @param {*} event Input event
   */

  if (props.type === 'number') {
    inputType = 'text'
  }
  function onChange (event) {
    if (props.type === 'number') {
      event.target.value = event.target.value.replace(/\D/g, '')
    }
    props.onChange(event)
  }

  return (
    <div className='text-field'>
      {props.leftText &&
        <span className='textfield-right-text'>{props.leftText ?? ''}</span>}
      <div className='textfield-input-container'>
        <input
          min='0' className={`${props.class ?? ''} ${props.rightText ? 'textfield-right-text-container' : ''}  ${props.leftText ? 'textfield-left-text-container' : ''}`} type={inputType} id={props.id} name={`${isRequired ? 'mandatory-text-field' : 'text-field'}`} required={isRequired} onInput={onChange} onChange={props.onChange} onKeyDown={props.onKeyDown} defaultValue={props.value} value={props.value}
        />
        <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
      </div>

      {props.rightText &&
        <span className='textfield-left-text'>{props.rightText ?? ''}</span>}
    </div>

  )
}
