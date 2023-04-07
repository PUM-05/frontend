import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import './Login.scss'
import Logo from '../../components/sidebar/logo/Logo'
import { useState } from 'react'
import { postData } from '../../utils/request'
import { Link, useLocation } from 'react-router-dom'

export default function Input () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()
  const path = location.pathname

  async function submitData (e) {
    e.preventDefault()
    const data = {
      username,
      password
    }
    const request = await postData('/login', data)
    console.log(request.status)

    if (request.status === 403) {
      setIsAdmin(true)
    }
    else if (request.status === 204){
      window.location.replace('http://localhost:' + window.location.port);
    }
  }

  if (isAdmin) {
    return (
      <>
        <div className='contain-all'>
          <div class='default-logo'>
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
                value={username}
              />
              <TextField
                placeholder='Lösenord'
                isRequired
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                value={password}
              />
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
          <div class='default-logo'>
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
                value={username}
              />
            </form>
            <SubmitButton name='submit' onClick={submitData}>LOGGA IN</SubmitButton>
            {
                  // TODO: Om användare är admin, skickas till
                  // ny sida, där man kan skriva in lösenord, när man har klickat på login-knapp?
                  // Eller ska det finnas ett password-field direkt? Förvirrande för "vanliga" användare?
              }
          </div>
        </div>
      </>
    )
  }
}
