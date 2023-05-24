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
  const [mediumData, setMediumData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [categoryLabels, setCategoryLabels] = useState([])
  const [categoryColors, setCategoryColors] = useState([])
  const colors = ['#579CFB', '#20E2BA', '#FD5E80', '#F8D347', '#BC6C25', '#00C864', '#A259FF', '#9694FF']
  useEffect(() => {
    async function getPieData () {
      const today = new Date()
      let startYear = today.getFullYear()
      let startMonth = today.getMonth() + 1
      let startDay = today.getDate()
      const endYear = today.getFullYear()
      const endMonth = today.getMonth() + 1
      const endDay = today.getDate()
      if (endDay < 14) {
        if (endMonth === 1) {
          startYear -= 1
          startMonth = 12
        } else {
          startMonth -= 1
        }
        const newDate = new Date(startYear, startMonth, 0)
        startDay = newDate.getDate()
        startDay = startDay - 13 + endDay
      } else {
        startDay -= 13
      }
      const mediumUrl =
        '/stats/medium?start-time=' +
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

      const mediumPromise = (await getData(mediumUrl)).json()
      const mediumArray = await mediumPromise
      setMediumData([mediumArray.phone, mediumArray.email])

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
  }, [])
  return (
    <div className='pie-chart-container'>
      <PieChart
        labels={['Telefon', 'Mail']}
        titletext='Medie'
        datasets={[
          {
            label: 'Antal Ärenden',
            data: mediumData,
            backgroundColor: [
              '#579CFB',
              '#20E2BA'
            ],
            borderColor: ['white'],
            borderWidth: 4
          }
        ]}
      />
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
