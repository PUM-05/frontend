import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import Toggle from '../../components/toggle/Toggle'
import CategoryButtonGroup from '../../components/categoryButtonGroup/CategoryButtonGroup'
import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './input.scss'
import { useState } from 'react'
import { postData } from '../../utils/request'
import TextArea from '../../components/textArea/TextArea'

/**
 * Component displaying the case input page
 * @returns Input page component
 */
export default function Input () {
  const [comMode, setComMode] = useState(true)
  const [caseId, setCaseId] = useState('')
  const [timeSpend, setTimeSpend] = useState('')
  const [afterWorkTime, setAfterWorkTime] = useState('')
  const [caseCategory, setCaseCategory] = useState('')
  const [freeText, setFreeText] = useState('')

  /**
   * Send new case to server
   * @param {*} e Event calling the function
   */
  async function submitData (e) {
    e.preventDefault()
    const data = {
      medium: comMode ? 'phone' : 'email',
      case_id: parseInt(caseId),
      category_id: caseCategory,
      customer_time: parseInt(timeSpend),
      additional_time: parseInt(afterWorkTime),
      notes: freeText
    }
    await postData('/case', data)
  }

  return (
    <>
      <PageWrapper className='collapsed-sidebar'>
        <div className='contain-all'>
          <div className='header-container'>
            <h1>Kommunikationsmedie</h1>
          </div>

          <div className='form-container'>
            <form>
              <Toggle onChange={(val) => setComMode(val)} value={comMode} />
              <TextField
                type='number'
                placeholder='Ärendenr'
                isRequired={false}
                onChange={(e) => {
                  setCaseId(e.target.value)
                }}
                value={caseId}
              />
              <CategoryButtonGroup
                name='category'
                onChange={(data) => {
                  setCaseCategory(data.value)
                }}
                value={caseCategory}
              />
              <div className='text-field-container'>
                <TextField
                  type='number'
                  placeholder='Tidsåtgång'
                  isRequired
                  onChange={(e) => {
                    setTimeSpend(e.target.value)
                  }}
                  value={timeSpend}
                  rightText='min'
                />
                <TextField
                  type='number'
                  placeholder='Efterarbete'
                  onChange={(e) => {
                    setAfterWorkTime(e.target.value)
                  }}
                  value={afterWorkTime}
                  rightText='min'
                />
              </div>
              <TextArea
                placeholder='Fritext..'
                id='freetext'
                onChange={(e) => {
                  setFreeText(e.target.value)
                }}
                value={freeText}
              />
            </form>
            <SubmitButton name='submit' onClick={submitData}>
              SKICKA
            </SubmitButton>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
