import PieChart from '../piechart/Piechart'
import './piechartGroup.scss'
import { useEffect, useState } from 'react'
import { getData } from '../../utils/request'
/**
 * Group of pie charts for the dashboard page
 * @param {*} props
 * @returns Component containing two pie charts
 */
export default function PieChartGroup (props) {
  const [numOfCalls, setNumOfCalls] = useState([])
  const [numOfMails, setNumOfMails] = useState([])
  let interval = 14
  useEffect(() => {
    /**
     * Sends get requests that obtains the number of cases for a certain interval
     * @param {*} interval is an integer that represents what interval should be requested
     */
    async function getNumOfCasesWeek (interval) {
      let i = 0
      const urlArray = []
      const today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth() + 1
      let day = today.getDate()


      while (i < interval) {
        if (day === 0 || (day === 7 && interval === 4)) { // new month
          month = month - 1
          const newDate = new Date(year, month, 0)
          day = newDate.getDate()
        } else if (month === 1 && day <= 0) { // new year
          month = 12
          year = year - 1
          day = 31
        }
        if (interval === 7 || interval === 14) {
          urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T00:00:00&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T23:59:59'))
          day = day - 1
        } else if (interval === 4) {
          if (day - 7 <= 0) {
            const monthUpdated = month - 1
            const diff = Math.abs(day - 7)
            const newDate = new Date(year, month, 0)
            const dayUpdated = newDate.getDate() - diff
            urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (monthUpdated)).slice(-2) + '-' + ('0' + dayUpdated).slice(-2)) + 'T00:00:00&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T23:59:59'))
            day = dayUpdated
            month = monthUpdated
          } else {
            urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + (day - 7)).slice(-2)) + 'T00:00:00&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T23:59:59'))
          }
          day = day - 7
        } else {
          if (month <= 0) {
            year = year - 1
            month = 12
          }
          const lastDayOfMonth = new Date(today.getFullYear(), month, 0).getDate()
          urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-01T00:00:00&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + lastDayOfMonth) + 'T23:59:59')))
          month = month - 1
        }
        i = i + 1
      }

      const promises = urlArray.map(async url => (await getData(url)).json())
      const phoneArray = []
      const mailArray = []
      const array = await Promise.all(promises)
      for (i = 0; i < array.length; i++) {
        phoneArray.push(array[i].phone)
        mailArray.push(array[i].email)
      }
      setNumOfCalls(phoneArray.slice().reverse())
      setNumOfMails(mailArray.slice().reverse())
    }
    getNumOfCasesWeek(interval).catch(() => 'obligatory catch')
    window.alert(numOfCalls)
    window.alert(numOfMails)
    window.alert(interval)
  }, [interval])
  return (
    <div className='pie-chart-container'>
      <PieChart
        labels={['Telefon', 'Mail']}
        titletext='Medie (2v)'
        datasets={[
          {
            label: 'Antal användningar',
            data: [numOfCalls, numOfMails],
            backgroundColor: [
              'rgba(87, 156, 251, 0.5)',
              'rgba(32, 226, 186, 0.5)'
            ],
            borderColor: [
              'white'
            ],
            borderWidth: 4
          }
        ]}
      />
      <PieChart
        labels={['JUSTERA LÖN', 'JUSTERA FRÅNVARO', 'REGISTRERA NY PERSONAL', 'STÄMPELKLOCKA', 'ÄNDRA INSTÄLLNINGAR', 'KONTO', 'EXPORTERA DATA', 'ANNAT']}
        titletext='Kategori'
        datasets={[
          {
            label: '# of Votes',
            data: [22, 56, 10, 34, 5, 82, 6, 8],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'white'

            ],
            borderWidth: 4
          }
        ]}
      />
    </div>
  )
}
