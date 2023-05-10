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
  const [interval, setInterval] = useState(7)
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
      case 'day':

      default:
        setInterval(7)
        break
    }
  }
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
            <Datepicker />
            <BarChart
              titletext='Antal ärenden per timme' 
              interval={11}  
            />
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
