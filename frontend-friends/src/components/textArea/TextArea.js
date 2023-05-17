import React from 'react'
import './text-area.scss'

/**
 * Textarea is a larger text field that fits more text
 * @param {*} props contains what should happen on change and the default text for the area
 * @returns a textarea component.
 */
const TextArea = React.forwardRef((props, ref) => {
  return (
    <div className='text-area'>
      <textarea ref={ref} id={props.id} name='text-area' onChange={props.onChange} defaultValue={props.value} />
      <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
})

export default TextArea
