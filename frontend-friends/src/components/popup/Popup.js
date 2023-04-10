import './popup.scss'
import TextField from '../textfield/TextField'
import SubmitButton from '../submitButton/SubmitButton'
import CloseIcon from '../sidebar/icons/CloseIcon'
import TextArea from '../textArea/TextArea'
import { useState } from 'react'

export default function Popup (props) {
  const [newSpentTime, setNewSpentTime] = useState(props.data.spentTime)
  const [newAdditionalTime, setNewAdditionalTime] = useState(props.data.additionalTime)
  const [newNotes, setNewNotes] = useState(props.data.notes)

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
              value={props.data.id}
            />
            <div className='dual-textfield-labels'>
              <p>Tidsåtgång</p>
              <p>Efterarbete</p>
            </div>
            <div className='dual-textfield-container'>
              <TextField
                isRequired={false}
                value={props.data.customer_time}
                onChange={(e) => { setNewSpentTime(e.target.value) }}
              />
              <TextField
                isRequired={false}
                value={props.data.additional_time}
                onChange={(e) => { setNewAdditionalTime(e.target.value) }}
              />
            </div>
            <p>Fritext</p>
            <TextArea
              id='fritext'
              value={props.data.notes}
              onChange={(e) => { setNewNotes(e.target.value) }}
            />
          </div>
          <SubmitButton onClick={() => props.editCase(props.data.id, newSpentTime, newAdditionalTime, newNotes)}>SPARA</SubmitButton>
        </div>
      </div>
    </>
  )
}
