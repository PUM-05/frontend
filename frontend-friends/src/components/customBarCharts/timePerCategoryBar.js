import { getData } from '../../utils/request'
import { useState, useEffect } from 'react'
import IntervalDropdown from '../intervalDropdown/intervalDropdown'
import BarChart from '../barChart/barChart'

export default function TimePerCategory () {
  const [categories, setCategories] = useState([])
  const [interval, setInterval] = useState(100)
  const [responseArray, setResponseArray] = useState([])

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

    for (const data of rawData) {
      const count = data.count
      const totalTime = (data.customer_time + data.additional_time)
      let averageTime = Math.round(totalTime / count)
      if (count === 0) {
        averageTime = 0
      }
      tempArray.push(averageTime)
    }
    setResponseArray(tempArray)
  }

  useEffect(() => {
    getCategories().catch(console.error)
    getTime().catch(console.error)
  }, [interval])

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

  const datasets = ([
    {
      label: 'Ärendehanteringstid',
      data: responseArray,
      backgroundColor: '#579CFB'
    }
  ]
  )

  return (
    <div>
      <IntervalDropdown onChange={handleChange} options={{ alltime: 'All tid', week: '1 vecka', '2Week': '2 veckor', '4Week': '4 veckor', year: '1 år' }} />
      <BarChart
        titletext='Genomsnittlig tid per kategori [min]'
        datasets={datasets}
        labels={categories}
      />
    </div>
  )
}
