import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import './Login.scss'
import Logo from '../../components/sidebar/logo/Logo'
import { useState } from 'react'
import { postData } from '../../utils/request'

export default function Input () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  async function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      submitData()
    }
  };

  async function submitData (e) {
    const data = {
      username,
      password
    }
    const request = await postData('/login', data)
    if (request.status === 403) {
      setIsAdmin(true)
    } else if (request.status === 204) {
      window.location.replace('http://localhost:' + window.location.port)
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
                type="password"
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
                onKeyDown={(e) => {
                  handleKeyPress(e)
                }}
                value={username}
              />
            </form>
            <SubmitButton name='submit' onClick={submitData}>LOGGA IN</SubmitButton>
          </div>
        </div>
      </>
    )
  }
}
