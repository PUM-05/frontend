import { useEffect, useState } from 'react'
import { getData } from '../../utils/request'
import './daily-data.scss'
import MailIcon from './icons/mailIcon.svg'
import PhoneIcon from './icons/phoneIcon.svg'

export default function DailyData (props) {
  const [totalCases, setTotalCases] = useState({})
  const [emailCases, setEmailCases] = useState({})
  const [phoneCases, setPhoneCases] = useState({})


  /**
   * Sends get requests that obtains the number of cases for a certain interval
   * @param {*} interval is an integer that represents what interval should be requested
   */

  useEffect(() => {
    async function getNumOfCasesDays () {
      const date = new Date()
      const yesterdayStart = new Date(date.getTime() - 24 * 60 * 60 * 1000)
      const todayStart = new Date(yesterdayStart.getTime() + 24 * 60 * 60 * 1000)
      const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000)

      const yesterday = await (await getData(`/stats/medium?start-time=${getISO(yesterdayStart)}&end-time=${getISO(todayStart)}`)).json()
      const today = await (await getData(`/stats/medium?start-time=${getISO(todayStart)}&end-time=${getISO(todayEnd)}`)).json()

      setTotalCases({ total: today.email + today.phone, increase: (today.email + today.phone - (yesterday.email + yesterday.phone)) / (yesterday.email + yesterday.phone), totalYesterday: (yesterday.email + yesterday.phone) })
      setEmailCases({ total: today.email, increase: (today.email - yesterday.email) / (yesterday.email), totalYesterday: yesterday.email})
      setPhoneCases({ total: today.phone, increase: (today.phone - yesterday.phone) / (yesterday.phone), totalYesterday: yesterday.phone})
    }

    function getISO (date) {
      return `${String(date.getFullYear()).padStart(4, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T00:00:00`
    }

    getNumOfCasesDays().catch(console.error)
  }, [])

  return (
    <div className='daily-data-container'>
      <div className='daily-total daily-data'>
        <p className='amount'>{totalCases.total ?? ''} st</p>
        <p className='errands-text'>Ärenden idag</p>
        <p className='data-comparison'>
          <span className='percentage'>{totalCases.totalYesterday === 0 ? "Inga" : totalCases.increase * 100 + '% '} ärenden från igår</span>
        </p>
        <p className='data-title'>TOTALT</p>
      </div>
      <div className='phone-data daily-data'>
        <p className='amount'>{phoneCases.total ?? ''} st</p>
        <p className='errands-text'>Ärenden</p>
        <p className='data-comparison'>{phoneCases.totalYesterday === 0 ? "Inga" : phoneCases.increase * 100 + '% '} ärenden från igår</p>
        <div className='data-pic'>
          <img src={PhoneIcon} />
        </div>
      </div>
      <div className='mail-data daily-data'>
        <p className='amount'>{emailCases.total ?? ''} st</p>
        <p className='errands-text'>Ärenden</p>
        <p className='data-comparison'>{emailCases.totalYesterday === 0 ? "Inga" : totalCases.increase * 100 + '% '} ärenden från igår</p>
        <div className='data-pic'>
          <img src={MailIcon} />
        </div>
      </div>
    </div>
  )
}
