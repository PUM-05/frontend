import './submitButton.scss'

/**
 * Displays a button that submits data
 * @param {*} props contains what will happen when the button is clicked
 * @returns a submitbutton component
 */
export default function SubmitButton (props) {
  return (
    <button className='submit-button' type='submit' onClick={props.onClick}>
      {props.children}
    </button>
  )
}
