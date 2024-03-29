import BarChart from '../barChart/barChart'
import Datepicker from '../datepicker/Datepicker'
import { useState, useEffect } from 'react'
import { getData } from '../../utils/request'

/**
 * This function creates a kind of barchart that displays the number of cases created for each hour of the day
 * @returns a barchart
 */
export default function NumOfCasesHourBar () {
  const [numOfCalls, setNumOfCalls] = useState([])
  const [numOfMails, setNumOfMails] = useState([])
  const today = new Date()
  const [inputDate, setInputDate] = useState((today.getFullYear() + '-' + (('0' + (today.getMonth() + 1))).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2)))

  /**
   * Sends 12 get requests. One for each hour of the day. Then sorts the data based on medium.
   */
  async function getNumOfCasesHour () {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const urlArray = []
    const interval = 12
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

    for (const data of array) {
      phoneArray.push(data.phone)
      mailArray.push(data.email)
    }
    phoneArray.push(0)
    mailArray.push(0)
    setNumOfCalls(phoneArray.slice().reverse())
    setNumOfMails(mailArray.slice().reverse())
  }

  useEffect(() => {
    getNumOfCasesHour().catch(() => 'obligatory catch')
  }, [inputDate])

  /**
   * Gets the labels for the x-axis
   * @returns a list of labels (strings)
   */
  function setLabels () {
    const interval = 11
    let i = 0
    const labelArray = []

    while (i < interval) {
      const lastHour = 18
      labelArray.push((('0' + ((lastHour - i) - 1)).slice(-2) + ':00'))
      i = i + 1
    }
    return labelArray.slice().reverse()
  }

  const datasets = ([
    {
      label: 'Telefon',
      data: (numOfCalls),
      backgroundColor: '#579CFB'
    },
    {
      label: 'Mail',
      data: (numOfMails),
      backgroundColor: '#20E2BA'
    }
  ]
  )

  return (
    <div>
      <Datepicker onChange={(e) => setInputDate(e.target.value)} />
      <BarChart
        titletext='Antal nya ärenden varje timme  '
        datasets={datasets}
        labels={setLabels()}
      />
    </div>
  )
}
