import { Link, useLocation } from 'react-router-dom'
import './sidebar.scss'
import DashboardIcon from './icons/DashboardIcon'
import StatisticsIcon from './icons/StatisticsIcon'
import ListIcon from './icons/ListIcon'
import Logo from './logo/Logo'
import SmallLogo from './logo/SmallLogo'
import InputIcon from './icons/InputIcon'
import SubmitButton from '../submitButton/SubmitButton'
import { Navigate } from 'react-router-dom'
import { getLoggedIn } from '../../utils/request'

export default function SideBar () {
  const location = useLocation()
  const path = location.pathname

  /**
   * Sends a GET request to the server to sign out the user.
   * Then redirects the user to the login page
   */
  async function logOutUser(){
    const request = await getLoggedIn('/logout')
    if (request === 204) {
      window.location.replace('http://localhost:' + window.location.port)
    }
  }

  return (
    <div className='sidebar-container'>
      <div className='logo-wrapper'>
        <div className='default-logo'>
          <Logo />
        </div>
        <div className='small-logo'>
          <SmallLogo />
        </div>
      </div>

      <ul>
        <li className='input-link'>
          <Link to='/' className={`navigation-link ${path === '/' ? 'active' : ''}`}>
            <InputIcon />
            <span className='nav-text'>Inmatning</span>
          </Link>
        </li>
        <li>
          <Link to='/dashboard' className={`navigation-link ${path === '/dashboard' ? 'active' : ''}`}>
            <DashboardIcon />
            <span className='nav-text'>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to='/statistik' className={`navigation-link ${path === '/statistik' ? 'active' : ''}`}>
            <StatisticsIcon />
            <span className='nav-text'>Statistik</span>
          </Link>
        </li>
        <li>
          <Link to='/lista' className={`navigation-link ${path === '/lista' ? 'active' : ''}`}>
            <ListIcon />
            <span className='nav-text'>Ärendelista</span>
          </Link>
        </li>
      </ul>
      <SubmitButton name="submit" className="logout" onClick={logOutUser}>Logga ut</SubmitButton>
    </div>
  )
}
