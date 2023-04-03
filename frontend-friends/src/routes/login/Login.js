import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import './Login.scss'
import Logo from '../../components/sidebar/logo/Logo'
import { useState } from 'react'
import { postData } from '../../utils/request'


export default function Input () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function submitData (e) {
    e.preventDefault()
    const data = {
      username: username
    }
    await postData('/login', data)
  }
  const code=200
  if (code==200){
    return(
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
            <SubmitButton name='submit'>LOGGA IN</SubmitButton>
          </div>
        </div>
      </>
    )
  }
  else {
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
            <SubmitButton name='submit'>LOGGA IN</SubmitButton>
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
