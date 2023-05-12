import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import Toggle from '../../components/toggle/Toggle'
import CategoryButtonGroup from '../../components/categoryButtonGroup/CategoryButtonGroup'
import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './input.scss'
import React, { useState, useEffect } from 'react'
import { postData } from '../../utils/request'
import TextArea from '../../components/textArea/TextArea'
import SuccesSnackbar from '../../components/message/succesSnackbar'
import ErrorSnackbar from '../../components/message/errorSnackbar'

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
  const [showsuccesSnackbar, setsuccesShowSnackbar] = useState(false)
  const [showerrorSnackbar, seterrorShowSnackbar] = useState(false)
  const [isTimeSpendValid, setIsTimeSpendValid] = useState(false)
  const [isCategoryValid, setCategoryValid] = useState(false)

  async function submitData (e) {
    try {
      e.preventDefault()
      const data = {
        medium: comMode ? 'phone' : 'email',
        case_id: parseInt(caseId),
        category_id: caseCategory,
        customer_time: parseInt(timeSpend),
        additional_time: parseInt(afterWorkTime),
        notes: freeText
      }
      const command = await postData('/case', data)
      if (command.status === 201) {
        setsuccesShowSnackbar(true)
        seterrorShowSnackbar(false) //  hide error snackbar
        setCaseId('')
        setTimeSpend('')
        setAfterWorkTime('')
        setCaseCategory('')
        setFreeText('')
        setIsTimeSpendValid(false)
        setCategoryValid(false)
      } else {
        seterrorShowSnackbar(true)
        setsuccesShowSnackbar(false)
      }
    } catch (error) {
      seterrorShowSnackbar(true)
    }
  }
  async function submitCheck (e) {
    if (isTimeSpendValid && isCategoryValid) {
      try {
        await submitData(e)
        seterrorShowSnackbar(false)
      } catch (error) {
        seterrorShowSnackbar(true)
      }
    } else {
      seterrorShowSnackbar(true)
    }
  }

  useEffect(() => {
    if (timeSpend !== '') {
      setIsTimeSpendValid(true)
    } else {
      setIsTimeSpendValid(false)
    }
    if (caseCategory === '') {
      setCategoryValid(false)
    } else {
      setCategoryValid(true)
    }
  }, [timeSpend, caseCategory])

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
            <SubmitButton name='submit' onClick={submitCheck}>
              SKICKA
            </SubmitButton>
          </div>
          <SuccesSnackbar show={showsuccesSnackbar} onClose={() => setsuccesShowSnackbar(false)} />
          <ErrorSnackbar show={showerrorSnackbar} onClose={() => seterrorShowSnackbar(false)} />
        </div>
      </PageWrapper>
    </>
  )
}
