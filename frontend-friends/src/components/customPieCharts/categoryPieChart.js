import PieChart from '../piechart/Piechart'

import IntervalDropdown from '../intervalDropdown/intervalDropdown'
import { useEffect, useState } from 'react'
import { getData } from '../../utils/request'
/**
 * Group of pie charts for the dashboard page
 * @param {*} props
 * @returns Component containing two pie charts
 */
export default function PieChartGroup (props) {
  const [categoryData, setCategoryData] = useState([])
  const [categoryLabels, setCategoryLabels] = useState([])
  const [categoryColors, setCategoryColors] = useState([])
  const colors = ['#579CFB', '#20E2BA', '#FD5E80', '#F8D347', '#BC6C25', '#00C864', '#A259FF', '#9694FF']
  const [interval, setInterval] = useState(100)
  useEffect(() => {
    async function getPieData () {
      const today = new Date()
      let startYear = today.getFullYear()
      let startMonth = today.getMonth() + 1
      let startDay = today.getDate()
      const endYear = today.getFullYear()
      const endMonth = today.getMonth() + 1
      const endDay = today.getDate()
      let i = interval - 1
      while (i > 0) {
        if (startDay === 1) {
          if (startMonth === 1) {
            startYear -= 1
            startMonth = 12
          } else {
            startMonth -= 1
          }
          const newDate = new Date(startYear, startMonth, 0)
          startDay = newDate.getDate()
        } else {
          startDay -= 1
        }
        i -= 1
      }
      const categoryUrl =
                '/stats/category?start-time=' +
                (startYear +
                    '-' +
                    ('0' + startMonth).slice(-2) +
                    '-' +
                    ('0' + startDay).slice(-2)) +
                'T00:00:00&end-time=' +
                (endYear +
                    '-' +
                    ('0' + endMonth).slice(-2) +
                    '-' +
                    ('0' + endDay).slice(-2)) +
                'T23:59:59'

      const categoryPromise = (await getData(categoryUrl)).json()
      const categoryArray = await categoryPromise
      const categoryData = []
      const categoryLabels = []
      const categoryColors = []
      for (const element of categoryArray) {
        categoryColors.push(colors[element.category_id % colors.length])
        categoryData.push(element.count)
        categoryLabels.push(element.category_name)
      }
      setCategoryColors(categoryColors)
      setCategoryData(categoryData)
      setCategoryLabels(categoryLabels)
    }
    getPieData().catch(() => 'obligatory catch')
  }, [interval])
  const handleChange = (event) => {
    switch (event.target.value) {
      case '2Week':
        setInterval(14)
        break
      case '4Week':
        setInterval(28)
        break
      case 'year':
        setInterval(365)
        break
      case 'week':
        setInterval(7)
        break
      default:
        setInterval(1000)
        break
    }
  }
  return (
    <div>
      <IntervalDropdown onChange={handleChange} options={{ alltime: 'Totalt', week: '1 vecka', '2Week': '2 veckor', '4Week': '4 veckor', year: '1 år' }} />
      <PieChart
        labels={categoryLabels}
        titletext='Kategori'
        datasets={[
          {
            label: 'Antal Ärenden',
            data: categoryData,
            backgroundColor: categoryColors,
            borderColor: ['white'],
            borderWidth: 4
          }
        ]}
      />

    </div>
  )
}
