import './datepicker.scss'

/**
 * Component for displaying a datepicker.
 * @returns Datepicker component
 */
export default function Datepicker (props) {
  return (
    <input type='date' className='datepicker' onChange={props.onChange} value={props.value} />
  )
}
