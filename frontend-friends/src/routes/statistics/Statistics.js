import PageWrapper from '../../components/pagewrapper/PageWrapper'
import BarChart from '../../components/barChart/barChart'
import './Statistics.scss'
import { useState } from 'react'
import IntervalDropdown from '../../components/intervalDropdown/intervalDropdown'
import DayTotalCasesLine from '../../components/dayTotalCasesLine/DayTotalCasesLine'
import Datepicker from '../../components/datepicker/Datepicker'
/**
 * Component for displaying the statistics page.
 * @returns Statistics component
 */
export default function Statistics () {
  const today = new Date()
  const [interval, setInterval] = useState(7)
  const [inputDate, setInputDate] = useState((today.getFullYear() + '-' + (('0' + (today.getMonth() + 1))).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2)))
  // let inputDate = (today.getFullYear() + '-' + ('0' + (today.getMonth() +1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2))
  // const [inputDate, setInputDate] = useState('undef')

  const handleChange = (event) => {
    switch (event.target.value) {
      case '2Week':
        setInterval(14)
        break
      case '4Week':
        setInterval(4)
        break
      case 'year':
        setInterval(12)
        break
      default:
        setInterval(7)
        break
    }
  }
  /*
  const getDate = (e) => {
    inputDate = e
    return
  }
  */

  return (
    <>
      <PageWrapper className='Statistics'>
        <h1>Statistik</h1>
        <div className='chart-container'>
          <div className='barchart-container'>
            <IntervalDropdown onChange={handleChange} />
            <BarChart
              titletext='Antal ärenden'
              interval={interval}
            />
          </div>
          <div className='barchart-container'>
            <DayTotalCasesLine />
          </div>
          <div className='barchart-container'>
            <Datepicker onChange={(e) => setInputDate(e.target.value)} />
            <BarChart
              titletext='Antal ärenden per timme'
              interval={11}
              date={inputDate}
            />
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
