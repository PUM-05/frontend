import './pagewrapper.scss'
import SideBar from '../sidebar/SideBar'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getLoggedIn } from '../../utils/request'

export default function PageWrapper (props) {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    async function checkLoggedInStatus () {
      const response = await getLoggedIn('/check')
      if (response === 204) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }
    checkLoggedInStatus()
  }, [])

  if (isLoggedIn === null) {
    return null
  } else if (isLoggedIn === false) {
    return <Navigate replace to='/login' />
  } else {
    return (
      <div className={'page-container ' + (props.className || '')}>
        <SideBar />
        <div className='content-container'>{props.children}</div>
      </div>
    )
  }
}
