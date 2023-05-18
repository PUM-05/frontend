import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import Toggle from '../../components/toggle/Toggle'
import CategoryButtonGroup from '../../components/categoryButtonGroup/CategoryButtonGroup'
import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './input.scss'
import React, { useState, useEffect, useRef } from 'react'
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

  const caseIdRef = useRef(null)
  const timeSpendRef = useRef(null)
  const addTimeRef = useRef(null)
  const notesRef = useRef(null)

  const [inputStart, setInputStart] = useState()

  async function submitData (e) {
    const inputTime = endInputTime()
    try {
      e.preventDefault()
      const data = {
        medium: comMode ? 'phone' : 'email',
        case_id: parseInt(caseId),
        category_id: caseCategory,
        customer_time: parseInt(timeSpend),
        additional_time: parseInt(afterWorkTime),
        notes: freeText,
        form_fill_time: inputTime
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

        caseIdRef.current.value = ''
        timeSpendRef.current.value = ''
        addTimeRef.current.value = ''
        notesRef.current.value = ''
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

  useEffect(() => {
    if (caseId || caseCategory || timeSpend || afterWorkTime || freeText) {
      startInputTime()
    }
  }, [caseId, caseCategory, timeSpend, afterWorkTime, freeText])

  function startInputTime () {
    console.log('start')
    if (!inputStart) {
      setInputStart(new Date())
      return
    }
    const delta = new Date() - inputStart

    if (delta > 1000 * 120) {
      setInputStart(new Date())
    }
  }

  function endInputTime () {
    const delta = new Date() - inputStart
    setInputStart(null)

    if (delta < 1000 * 120) {
      return delta
    }

    return null
  }

  return (
    <>
      <PageWrapper className='collapsed-sidebar'>
        <div className='contain-all'>
          <div className='header-container'>
            <h2>Kommunikationsmedie</h2>
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
                leftText='#'
                ref={caseIdRef}
              />
              <CategoryButtonGroup
                name='category'
                onChange={(data) => {
                  setCaseCategory(data.value)
                }}
                value={caseCategory}
                onSubToggle={startInputTime}
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
                  ref={timeSpendRef}
                />
                <TextField
                  type='number'
                  placeholder='Efterarbete'
                  onChange={(e) => {
                    setAfterWorkTime(e.target.value)
                  }}
                  value={afterWorkTime}
                  rightText='min'
                  ref={addTimeRef}
                />
              </div>
              <TextArea
                placeholder='Fritext..'
                id='freetext'
                onChange={(e) => {
                  setFreeText(e.target.value)
                }}
                value={freeText}
                ref={notesRef}
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
