import LineChart from '../lineChart/LineChart'
import { useEffect, useState } from 'react'
import { getData } from '../../utils/request'
import Datepicker from '../datepicker/Datepicker'

/**
 * Component for displaying line diagram of total cases during a day
 * @returns Line diagram component
 */
export default function DayTotalCasesLine () {
  const intervalLength = 30

  const [inputDate, setInputDate] = useState('')
  const [datasets, setDatasets] = useState([])
  const [labels, setLabels] = useState([])

  async function loadStats (startTime, endTime) {
    const minutesDelta = (endTime - startTime) / 60 / 1000
    const intervals = Math.floor((minutesDelta + intervalLength) / intervalLength)
    const delta = intervalLength * 60

    const response = await getData(`/stats/periods?start-time=${startTime.toISOString().slice(0, -1)}&delta=${delta}&intervals=${intervals}`)
    const rawData = await response.json()

    const newLabels = []
    const data = []
    let caseTotal = 0

    for (const stat of rawData) {
      caseTotal += stat.count
      data.push(caseTotal)
      const timestamp = new Date(stat.end + '+00:00')
      newLabels.push(`${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}`)
    }

    setLabels(newLabels)
    setDatasets([{
      label: 'Totalt antal ärenden',
      data,
      borderWidth: 3,
      cubicInterpolationMode: 'monotone'
    }])
  }
  useEffect(() => {
    const date = inputDate ? new Date(inputDate) : new Date()

    const currentTime = new Date()
    const startTime = (new Date(date.setHours(7, -intervalLength, 0, 0)))

    let endTime
    if ((new Date(inputDate)).setHours(0, 0, 0, 0) < (new Date()).setHours(0, 0, 0, 0)) {
      endTime = (new Date((new Date(inputDate)).setHours(18, 0, 0, 0)))
    } else {
      endTime = (new Date((new Date()).setHours(Math.min(currentTime.getHours(), 18), currentTime.getMinutes(), 0, 0)))
    }

    loadStats(startTime, endTime).catch(console.error())
  }, [inputDate])

  return (
    <div>
      <Datepicker onChange={(e) => setInputDate(e.target.value)} />
      <LineChart datasets={datasets} labels={labels} />
    </div>
  )
}
