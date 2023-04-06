import './pagewrapper.scss';
import SideBar from '../sidebar/SideBar';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getLoggedIn } from '../../utils/request'

export default function PageWrapper (props) {
  let response = false;
  useEffect(()=>{
    async function fetchData(){
      const loggedIn = await getLoggedIn('/check');
      if (loggedIn.status === 204) {
        return true;
      }else{
        return false;
      }
    }
    response = fetchData();
  }, [])
  //response = true;
  if (!response){
    return <Navigate replace to="/login" />;
  } else{
    return (
      <div className={'page-container ' + (props.className || '')}>
        <SideBar />
        <div className='content-container'>{props.children}</div>
      </div>
    )
  }
}
