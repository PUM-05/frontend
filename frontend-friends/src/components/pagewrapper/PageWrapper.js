import './pagewrapper.scss'
import SideBar from '../sidebar/SideBar'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getLoggedIn } from '../../utils/request'

/**
 * "
 * @param {*} props 
 * @returns what should be displayed on the page. Either the login page or the "correct" page
 */
export default function PageWrapper (props) {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    /**
     * Checks if the user is logged in and sets the variable isLoggedIn based on 
     * the response of the GET request.
     */
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

  if (isLoggedIn === false) {
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
