import { Link } from 'react-router-dom'
import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import Toggle from '../../components/toggle/Toggle'
import CategoryButtonGroup from '../../components/categoryButtonGroup/CategoryButtonGroup'
import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './input.scss'
import { useState } from 'react'
import { postData } from '../../utils/request'

export default function Input () {
  const [comMode, setComMode] = useState(true)
  const [caseId, setCaseId] = useState('')
  const [timeSpend, setTimeSpend] = useState('')
  const [afterWorkTime, setAfterWorkTime] = useState('')
  const [caseCategory, setCaseCategory] = useState('')

  async function submitData (e) {
    e.preventDefault()
    const data = {
      medium: comMode ? 'phone' : 'email',
      category_id: caseCategory,
      customer_time: parseInt(timeSpend),
      additional_time: parseInt(afterWorkTime)
    }
    const res = await postData('/case', data)
  }

  return (
    <>
      <PageWrapper className='collapsed-sidebar'>
        <div className='contain-all'>
          <Link to='/dashboard'>Gå till överblickssida</Link>
          <div className='header-container'>
            <h1>Kommunikationsmedie</h1>
          </div>

          <div className='form-container'>
            <form>
              <Toggle onChange={(val) => setComMode(val)} value={comMode} />
              <TextField
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
                  placeholder='Tidsåtgång'
                  isRequired
                  onChange={(e) => {
                    setTimeSpend(e.target.value)
                  }}
                  value={timeSpend}
                />
                <TextField
                  placeholder='Efterarbete'
                  onChange={(e) => {
                    setAfterWorkTime(e.target.value)
                  }}
                  value={afterWorkTime}
                />
              </div>
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
