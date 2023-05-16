import './daily-data.scss'
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/phoneIcon.svg';

export default function DailyData (props) {
  let totalAmount = 10;
  let mailAmount = 7;
  let phoneAmount = 3;
  return (
    <div className='daily-data-container'>
      <div className='daily-total daily-data'>
        <p className='data-title'>TOTALT</p>
        <p className='amount'>{totalAmount} st</p>
        <p className='errands-text'>Ärenden idag</p> 
        <p className='data-comparison'>
          <span className='percentage'>ärenden från igår</span>
        </p>
      </div>
      <div className='phone-data daily-data'>
        <div className='data-pic'>
          <img src={PhoneIcon}></img>
        </div>
        <p className='amount'>{phoneAmount} st</p>
        <p className='errands-text'>Ärenden</p>
        <p className='data-comparison'> ärenden från igår</p>
      </div>
      <div className='mail-data daily-data'>
        <div className='data-pic'>
          <MailIcon />
        </div>
        <p className='amount'>{mailAmount} st</p>
        <p className='errands-text'>Ärenden</p>
        <p className='data-comparison'> ärenden från igår</p>
      </div>
    </div>
  )
}