import './pagewrapper.scss'
import SideBar from '../sidebar/SideBar'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getLoggedIn } from '../../utils/request'

export default function PageWrapper (props) {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    async function checkLoggedInStatus() {
      const response = await getLoggedIn('/check');
      if (response === 204) {
        setPageContent(
          <div className={'page-container ' + (props.className || '')}>
            <SideBar />
            <div className='content-container'>{props.children}</div>
          </div>
        );
      } else {
        setPageContent(<Navigate replace to='/login' />);
      }
    }
    checkLoggedInStatus();
  }, []);

  return pageContent;
}
