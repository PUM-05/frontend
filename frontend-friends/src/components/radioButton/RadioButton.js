import './radio-button.scss'
import PhoneIcon from '../../utils/icons/PhoneIcon'
import MailIcon from '../../utils/icons/MailIcon'

export default function RadioButton (props) {
  if (props.medium === 'phone') {
    return (
      <label className='radio-button phone-button' htmlFor='phone'>
        <input
          className='radio-button-input phone-button-input'
          type='radio'
          name={props.name}
          value={props.medium}
          id='phone'
          checked={props.checked}
          onChange={props.onChange}
        />
        <span>
          <PhoneIcon />
        </span>
        Telefon
      </label>
    )
  } else if (props.medium === 'email') {
    return (
      <label className='radio-button email-button' htmlFor='email'>
        <input
          className='radio-button-input email-button-input'
          type='radio'
          name={props.name}
          value={props.medium}
          id='email'
          checked={props.checked}
          onChange={props.onChange}
        />
        <span>
          <MailIcon />
        </span>
        Mail
      </label>
    )
  } else {
    return (
      <></>
    )
  }
}
