import { getData } from '../../utils/request'
import { useState, useEffect } from 'react'
import IntervalDropdown from '../intervalDropdown/intervalDropdown'
import BubbleChart from '../bubbleChart/bubbleChart'

export default function TimePerCategory () {
  const [categories, setCategories] = useState([])
  const [interval, setInterval] = useState(100)
  const [caseAverageTime, setCaseAverageTime] = useState([])
  const [numOfCases, setNumOfCases] = useState([])
  const [categoryIDArray, setCategoryIDArray] = useState([])
  const [xMax, setXMax] = useState(0)
  const [xLabels, setXLabels] = useState([])

  const colors = ['#579CFB', '#20E2BA', '#FD5E80', '#F8D347', '#BC6C25', '#00C864', '#A259FF', '#9694FF']

  const [datasets, setDatasets] = useState([])

  async function getCategories () {
    const response = await getData('/case/categories')
    const rawData = await response.json()
    const categoryArray = []

    for (const category of rawData) {
      categoryArray.push(category.name)
    }
    setCategories(categoryArray)
  }

  async function getTime () {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    let response = ''

    if (interval === 100) {
      response = await getData('/stats/category?start-time=0001-01-01T00:00:00%2B00:00&end-time=9999-12-31T23:59:59%2B00:00')
    } else if (interval === 7 || interval === 14) {
      let monthUpdated = month
      let dayUpdated = day - interval
      if (day - interval <= 0) { // If the week spans multiple months
        monthUpdated = month - 1
        const diff = Math.abs(day - interval)
        const newDate = new Date(year, monthUpdated, 0)
        dayUpdated = newDate.getDate() - diff
      }
      response = await getData(('/stats/category?start-time=' + (year + '-' + ('0' + (monthUpdated)).slice(-2) + '-' + ('0' + dayUpdated).slice(-2)) + 'T00:00:00&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T23:59:59'))
    } else if (interval === 4) {
      let dayUpdated = day
      if (month - 1 === 2 && day >= 29) {
        dayUpdated = 28
      }
      response = await getData(('/stats/category?start-time=' + (year + '-' + ('0' + (month - 1)).slice(-2) + '-' + dayUpdated) + 'T00:00:00&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T23:59:59'))
    } else {
      response = await getData(('/stats/category?start-time=' + ((year - 1) + '-' + ('0' + (month - 1)).slice(-2) + '-' + day) + 'T00:00:00&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ('0' + day).slice(-2)) + 'T23:59:59'))
    }
    const rawData = await response.json()
    const tempArray = []
    const tempIDArray = []
    const tempNumArray = []
    let maxCount = 0
    for (const data of rawData) {
      if(data.count > maxCount){
        maxCount = data.count
      }
      setXMax(maxCount)

      tempIDArray.push(data.category_id)
      const count = data.count
      const totalTime = (data.customer_time + data.additional_time)
      let averageTime = Math.round(totalTime / count)
      if (count === 0) {
        averageTime = 0
      }
      tempArray.push(averageTime)
      tempNumArray.push(count)
    }
    setCategoryIDArray(tempIDArray)
    setCaseAverageTime(tempArray)
    setNumOfCases(tempNumArray)
  }

  function createDatasets () {
    const tempColorArray = []
    for (const id of categoryIDArray) {
      tempColorArray.push(colors[id % colors.length])
    }

    const dataArray = []
    for (let i = 0; i < caseAverageTime.length; i++) {
      dataArray.push(
        {
          type:'bubble',
          label: categories[i],
          data: [{
            x:(numOfCases[i]),
            y:(caseAverageTime[i]),
            r:(Math.round((numOfCases[i]+caseAverageTime[i])/2.5))
          }],
          backgroundColor: tempColorArray[i],
        }
      )
    }
    setDatasets(dataArray)
  }
  useEffect(() => {
    getCategories()
      .then(() => getTime())
      .catch(console.error)
  }, [interval])

  useEffect(() => {
    if (caseAverageTime.length > 0 && categoryIDArray.length > 0) {
      createDatasets()

      const tempLabels = []
      for (let i = 0; i <= xMax; i++) {
        tempLabels.push(i)
      }
      setXLabels(tempLabels)
    }
  }, [caseAverageTime, categoryIDArray, xMax])

  const handleChange = (event) => {
    switch (event.target.value) {
      case '2Week':
        setInterval(14)
        break
      case '4Week':
        setInterval(4)
        break
      case 'year':
        setInterval(1)
        break
      case 'week':
        setInterval(7)
        break
      default:
        setInterval(100)
        break
    }
  }

  return (
    <div>
      <IntervalDropdown onChange={handleChange} options={{ alltime: 'Totalt', week: '1 vecka', '2Week': '2 veckor', '4Week': '4 veckor', year: '1 år' }} />
      <BubbleChart
        titletext='Antal ärenden och genomsnittlig tid per kategori'
        datasets={datasets}
        labels={xLabels}
      />
    </div>
  )
}
