import './text-area.scss'

/**
 * Textarea is a larger text field that fits more text
 * @param {*} props contains what should happen on change and the default text for the area
 * @returns a textarea component.
 */
export default function TextArea (props) {
  return (
    <div className='text-area'>
      <textarea id={props.id} name='text-area' onChange={props.onChange} defaultValue={props.value} />
      <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
}
