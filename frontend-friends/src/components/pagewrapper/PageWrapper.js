import './pagewrapper.scss';
import SideBar from '../sidebar/SideBar';
import { useEffect , useState} from 'react';
import { Navigate } from 'react-router-dom';

export default function PageWrapper (props) {
  const [authenticated, setauthenticated] = useState(null);
  const loggedIn = null;// = *check if token exists*
  const temp = true;
  if (loggedIn) {
    setauthenticated(loggedIn);
  }
  if (!authenticated && !temp){
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
