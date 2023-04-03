import './popup.scss'
import TextField from '../textfield/TextField'
import SubmitButton from '../submitButton/SubmitButton'
import CloseIcon from '../sidebar/icons/CloseIcon'
import TextArea from '../textArea/TextArea'

export default function Popup (props) {
  console.log(props.data)
  return (
    <>
      <div className='popup-container'>
        <div className='popup-background' onClick={props.handleClose} />
        <div className='popup'>
          <h1>Redigera ärende</h1>
          <span onClick={props.handleClose}><CloseIcon /></span>
          <div className='text-fields-container'>
            <p>Ärendenr</p>
            <TextField
              isRequired={false}
              value={props.data.caseNumber}
            />
            <div className="dual-textfield-labels">
              <p>Tidsåtgång</p>
              <p>Efterarbete</p>
            </div>
            <div className='dual-textfield-container'>
              <TextField
                isRequired={false}
                value={props.data.spentTime}
              />
              <TextField
                isRequired={false}
                value={props.data.additionalTime}
              />
            </div>
            <p>Fritext</p>
            <TextArea id='fritext' />
          </div>
          <SubmitButton onClick={props.handleClose}>SPARA</SubmitButton>
        </div>
      </div>
    </>
  )
}
