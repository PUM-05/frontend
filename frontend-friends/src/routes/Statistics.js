import PageWrapper from '../components/pagewrapper/PageWrapper'
import LineChart from '../components/lineChart/LineChart'
import { useEffect, useState } from 'react'
import { getData } from '../utils/request'

/**
 * Component for displaying the statistics page.
 * @returns Statistics component
 */
export default function Statistics () {
  const props = {}

  props.date = '2023-05-05'

  const date = props.date ? new Date(props.date) : new Date()
  const intervalLength = 30
  const currentTime = new Date()
  const startTime = (new Date(date.setHours(7, -intervalLength, 0, 0)))

  let endTime
  if ((new Date(props.date)).setHours(0, 0, 0, 0) < (new Date()).setHours(0, 0, 0, 0)) {
    endTime = (new Date((new Date(props.date)).setHours(18, 0, 0, 0)))
  } else {
    endTime = (new Date((new Date()).setHours(Math.min(currentTime.getHours(), 18), currentTime.getMinutes(), 0, 0)))
  }

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
    loadStats(startTime, endTime)
  }, [])

  return (
    <>
      <PageWrapper>
        <h1>Statistics</h1>
        <LineChart datasets={datasets} labels={labels} />
      </PageWrapper>
    </>
  )
}
