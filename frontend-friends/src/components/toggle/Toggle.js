import ReactSwitch from 'react-switch'
import { useState, useEffect } from 'react'
import './Toggle.scss'
import PhoneIcon from '../../utils/icons/PhoneIcon'
import MailIcon from '../../utils/icons/MailIcon'
/* global localStorage */

/**
 * Component displaying a toggle to switch between e-mail and phone.
 * @param {*} props
 * @returns Toggle component
 */
export default function Toggle (props) {
  const [checked, setChecked] = useState(props.value)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('checked')) === false) {
      setChecked(false)
      props.onChange(false)
    } else {
      setChecked(true)
      props.onChange(true)
    }
  }, [])

  /**
 * Updates value of toggle.
 * @param {*} val New value
 */
  const handleChange = (val) => {
    setChecked(val)
    localStorage.setItem('checked', JSON.stringify(val))
    props.onChange(val)
  }
  return (
    <ReactSwitch
      checked={checked}
      onChange={handleChange}
      handleDiameter={27}
      className='toggle'
      onColor='#579CFB' // #F0F1F2
      offColor='#20E2BA' // #F0F1F2
      onHandleColor='#FFFFFF'
      offHandleColor='#FFFFFF'
      checkedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingRight: 2
          }}
        >
          <PhoneIcon />
        </div>
      }
      uncheckedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingRight: 0
          }}
        >
          <MailIcon />
        </div>
      }
      width={70}
      height={35}
    />
  )
}
