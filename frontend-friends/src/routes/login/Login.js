import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import './Login.scss'
import Logo from '../../components/sidebar/logo/Logo'
import { useState, useEffect } from 'react'
import { postData, getLoggedIn } from '../../utils/request'

import { Navigate } from 'react-router'

/**
 *
 * @returns content for login
 */
export default function Input () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [checkLoggedIn, setCheckLoggedIn] = useState(false)

  useEffect(() => {
    /**
     * Checks if the user is logged in and sets the variable isLoggedIn based on
     * the response of the GET request.
     */
    async function checkLoggedInStatus () {
      const response = await getLoggedIn('/check')
      if (response === 204) {
        setCheckLoggedIn(true)
      } else {
        setCheckLoggedIn(false)
      }
    }
    checkLoggedInStatus()
  }, [])

  /**
   * Waiting for enter to be pressed, if clicked, then submitdata
   * @param {*} e is the event from the button
   */
  async function handleKeyPress (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitData()
    }
  };

  /**
   * SubmitData uploads. Depending on request.status sets admin and logged in to true or false
   * @param {*} e is the event. e reacts on change.
   */
  async function submitData (e) {
    const data = {
      username,
      password
    }
    const request = await postData('/login', data)
    if (request.status === 403) {
      setIsAdmin(true)
      setIsLoggedIn(true)
    } else if (request.status === 204) {
      setIsLoggedIn(true)
      window.location.replace(window.location.origin)
    } else if (request.status === 401) {
      setIsLoggedIn(false)
    }
  }
  if (!checkLoggedIn) {
    if (isAdmin) {
      return (
        <>
          <div className='contain-all'>
            <div className='default-logo'>
              <Logo className='login-logo' />
            </div>
            <div className='login-form-container'>
              <form>
                <TextField
                  placeholder='Användarnamn'
                  isRequired
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    handleKeyPress(e)
                  }}
                  value={username}
                />
                <TextField
                  placeholder='Lösenord'
                  isRequired
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    handleKeyPress(e)
                  }}
                  value={password}
                  type='password'
                />
                {isLoggedIn ? '' : <p className='error-msg'>Felaktigt användarnamn eller lösenord</p>}
              </form>
              <SubmitButton name='submit' onClick={submitData}>
                LOGGA IN
              </SubmitButton>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='contain-all'>
            <div className='default-logo'>
              <Logo className='login-logo' />
            </div>
            <div className='login-form-container'>
              <form>
                <TextField
                  placeholder='Användarnamn'
                  isRequired
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    handleKeyPress(e)
                  }}
                  value={username}
                />
                {isLoggedIn ? '' : <p className='error-msg'>Felaktigt användarnamn</p>}
              </form>
              <SubmitButton name='submit' onClick={submitData}>LOGGA IN</SubmitButton>
            </div>
          </div>
        </>
      )
    }
  } else {
    return <Navigate replace to='/' />
  }
}
