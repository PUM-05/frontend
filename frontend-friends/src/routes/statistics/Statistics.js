import PageWrapper from '../../components/pagewrapper/PageWrapper'
import BarChart from '../../components/barChart/barChart'
import { getData } from '../../utils/request'
import './Statistics.scss'
import { useEffect, useState } from 'react'
import IntervalDropdown from '../../components/intervalDropdown/intervalDropdown'
/**
 * Component for displaying the statistics page.
 * @returns Statistics component
 */
export default function Statistics () {
  const [numOfCalls, setNumOfCalls] = useState([])
  const [numOfMails, setNumOfMails] = useState([])

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
              //labels={setLabels(interval)}
              titletext='Antal ärenden'
              datasets={[
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
              ]}
              interval={interval}
            />
          </div>
          {/* Add other charts here */}
        </div>
      </PageWrapper>
    </>
  )
}
