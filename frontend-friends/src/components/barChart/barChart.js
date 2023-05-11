import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { getData } from '../../utils/request'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

/**
 * Bar chart displaying the given data
 * @param {*} props are the properties it contains
 * @returns a bar chart component
 */
export default function BarChart (props) {
  const [numOfCalls, setNumOfCalls] = useState([])
  const [numOfMails, setNumOfMails] = useState([])
  const interval = props.interval
  const inputDate = props.date

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
        // Check if the month or year needs to be changed
        if (day === 0 || (day === 7 && interval === 4)) { // new month
          month = month - 1
          const newDate = new Date(year, month, 0)
          day = newDate.getDate()
        } else if (month === 1 && day <= 0) { // new year
          month = 12
          year = year - 1
          day = 31
        }
        if (interval === 7 || interval === 14) { // If interval is one week or two weeks, add one request for each day
          urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T00:00:00&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T23:59:59'))
          day = day - 1
        } else if (interval === 4) { // If interval is 4 weeks (one month), add one request for each week
          if (day - 7 <= 0) { // If the week spans multiple months
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
        } else { // else, the interval is one year, meaning add one request for each month
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
  }, [props.interval])

  useEffect(() => {
    async function getNumOfCasesHour () {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const day = today.getDate()
      const urlArray = []
      const interval = 11
      let inputDates = inputDate

      for (let i = 0; i < interval; i++) {
        if (inputDates === 'undef' || inputDates === undefined) {
          inputDates = (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + (day)).slice(-2))
        }
        const lastHour = 18
        urlArray.push(('/stats/medium?start-time=' + inputDates + 'T' + (('0' + ((lastHour - i) - 1)).slice(-2)) + ':00:00&end-time=' + inputDates + 'T' + (('0' + (lastHour - i - 1)).slice(-2)) + ':59:59'))
      }
      const promises = urlArray.map(async url => (await getData(url)).json())
      const phoneArray = []
      const mailArray = []
      const array = await Promise.all(promises)
      console.log(urlArray)
      for (let i = 0; i < array.length; i++) {
        phoneArray.push(array[i].phone)
        mailArray.push(array[i].email)
      }
      phoneArray.push(0)
      phoneArray.push(0)
      mailArray.push(0)
      mailArray.push(0)
      setNumOfCalls(phoneArray.slice().reverse())
      setNumOfMails(mailArray.slice().reverse())
    }
    if (interval === 11) {
      getNumOfCasesHour().catch(() => 'obligatory catch')
    }
  }, [props.date])

  /**
   * Retrieves the correct labels for the x-axis of the given interval
   * @param {*} interval is the interval that should be displayed in the chart
   * @returns an array of labels
   */
  function setLabels (interval) {
    const today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    let i = 0
    const labelArray = []
    const monthNames = ['', 'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']

    while (i < interval) {
      // Check for new month or new year
      if (day === 0) { // new month
        month = month - 1
        const newDate = new Date(year, month, 0)
        day = newDate.getDate()
      } else if (month === 1 && day <= 0) { // new year
        month = 12
        year = year - 1
        day = 31
      }

      // Check the interval. 7 or 14 means data from each day for 7 or 14 days
      if (interval === 7 || interval === 14) {
        labelArray.push((year + '-' + ('0' + (month)).slice(-2) + '-' + (('0' + day).slice(-2))))
        day = day - 1
      } else if (interval === 4) { // 4 means 4 weeks worth of data (roughly one month)
        if (day - 7 <= 0) {
          const monthUpdated = month - 1
          const diff = Math.abs(day - 7)
          const newDate = new Date(year, month, 0)
          const dayUpdated = newDate.getDate() - diff
          labelArray.push(((dayUpdated) + ' ' + monthNames[monthUpdated].slice(0, 3) + '-' + day + ' ' + monthNames[month].slice(0, 3)))
          day = dayUpdated
          month = monthUpdated
        } else {
          labelArray.push(((day - 7) + '-' + day + ' ' + monthNames[month].slice(0, 3)))
          day = day - 7
        }
      } else if (interval === 11) {
        const lastHour = 18
        labelArray.push((('0' + ((lastHour - i) - 1)).slice(-2) + ':00'))
      } else { // returns labels for 12 months, starting from the current month
        if (month <= 0) {
          year = year - 1
          month = 12
        }
        labelArray.push(monthNames[month].slice(0, 3))
        month = month - 1
      }
      i = i + 1
    }
    console.log(labelArray)
    return labelArray.slice().reverse()
  }

  const data = ({
    labels: setLabels(interval),
    datasets: [
      {
        label: 'Telefon',
        data: numOfCalls,
        backgroundColor: '#579CFB'
      },
      {
        label: 'Mail',
        data: numOfMails,
        backgroundColor: '#20E2BA'
      }
    ]
  })

  const options = ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        position: 'top',
        text: props.titletext,
        padding: {
          top: 10,
          bottom: 10
        },
        font: {
          size: 15,
          family: ['Montserrat', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
        }
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }
    }
  })

  return (
    <div className='bar-button-wrapper'>
      <Bar data={data} options={options} />
    </div>
  )
}
