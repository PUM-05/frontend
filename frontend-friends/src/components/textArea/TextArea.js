import './text-area.scss'

export default function TextArea (props) {
  return (
    <div className='text-area'>
      <textarea id={props.id} name='text-area' onChange={props.onChange} defaultValue={props.value} />
      <label className={props.value && 'filled'} htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
}
