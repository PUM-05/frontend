import './pagewrapper.scss'
import SideBar from '../sidebar/SideBar'

export default function PageWrapper (props) {
  return (
    <div className={'page-container ' + (props.className || '')}>
      <SideBar />
      <div className='content-container'>{props.children}</div>
    </div>
  )
}
