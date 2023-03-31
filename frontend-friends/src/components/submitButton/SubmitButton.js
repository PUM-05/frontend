import './submitButton.scss'

export default function SubmitButton (props) {
  return (
    <button className='submit-button' type='submit' onClick={props.onClick}>
      {props.children}
    </button>
  )
}
