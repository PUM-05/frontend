import './popup.scss'
import TextField from '../textfield/TextField'
import SubmitButton from '../submitButton/SubmitButton'
import CloseIcon from '../sidebar/icons/CloseIcon'
import TextArea from '../textArea/TextArea'
import { useState } from 'react'
import Arrow from '../sidebar/icons/Arrow'

/**
 * Creates and displays a propup for editing a case
 * @param {*} props Data to pupup {data: {id, spent_time, additional_time, notes}}
 * @returns Popup component
 */
export default function Popup (props) {
  const [newSpentTime, setNewSpentTime] = useState(props.data.customer_time)
  const [newAdditionalTime, setNewAdditionalTime] = useState(props.data.additional_time)
  const [newNotes, setNewNotes] = useState(props.data.notes)
  const [newCaseId, setNewCaseId] = useState(props.data.case_id)

  return (
    <>
      <div className='popup-container'>
        <div className='popup-background' onClick={props.handleClose} />
        <div className='popup'>
          <h1>Redigera ärende</h1>
          <span className='close-icon' onClick={props.handleClose}><CloseIcon /></span>
          <div className='text-fields-container'>
            <p>Ärendenr</p>
            <TextField
              type='number'
              isRequired={false}
              value={props.data.case_id}
              onChange={(e) => { setNewCaseId(e.target.value) }}
              leftText='#'
            />
            <div className='dual-textfield-labels'>
              <p>Tidsåtgång</p>
              <p>Efterarbete</p>
            </div>
            <div className='dual-textfield-container'>
              <TextField
                type='number'
                class='minutes-text-field'
                isRequired={false}
                value={props.data.customer_time}
                onChange={(e) => { setNewSpentTime(e.target.value) }}
                rightText='min'
              />
              <TextField
                type='number'
                class='minutes-text-field'
                isRequired={false}
                value={props.data.additional_time}
                onChange={(e) => { setNewAdditionalTime(e.target.value) }}
                rightText='min'
              />
            </div>
            <p>Fritext</p>
            <TextArea
              id='fritext'
              value={props.data.notes}
              onChange={(e) => { setNewNotes(e.target.value) }}
            />
          </div>
          <SubmitButton className='submit-button' onClick={() => props.editCase(props.data.id, newSpentTime, newAdditionalTime, newNotes, newCaseId)}>SPARA</SubmitButton>
          <div className='switch-buttons'>
            <button className={`left ${props.index <= 0 ? 'disabled' : ''}`} onClick={() => props.switchCase(props.index - 1)}><Arrow /></button>
            <button className={`right ${props.index >= props.maxIndex ? 'disabled' : ''}`} onClick={() => props.switchCase(props.index + 1)}><Arrow /></button>
          </div>
        </div>
      </div>
    </>
  )
}
