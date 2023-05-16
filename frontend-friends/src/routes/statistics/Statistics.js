import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './Statistics.scss'
import DayTotalCasesLine from '../../components/dayTotalCasesLine/DayTotalCasesLine'
import NumOfCasesWeekBar from '../../components/numOfCases/numOfCasesWeekBar'
import NumOfCasesHourBar from '../../components/numOfCases/numOfCasesHourBar'
/**
 * Component for displaying the statistics page.
 * @returns Statistics component
 */
export default function Statistics () {
  return (
    <>
      <PageWrapper className='Statistics'>
        <h1>Statistik</h1>
        <div className='chart-container'>
          <div className='barchart-container'>
            <NumOfCasesWeekBar />
          </div>
          <div className='barchart-container'>
            <DayTotalCasesLine />
          </div>
          <div className='barchart-container'>
            <NumOfCasesHourBar />
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
