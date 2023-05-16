import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './Statistics.scss'
import DayTotalCasesLine from '../../components/dayTotalCasesLine/DayTotalCasesLine'
import NumOfCasesWeekBar from '../../components/customBarCharts/numOfCasesWeekBar'
import NumOfCasesHourBar from '../../components/customBarCharts/numOfCasesHourBar'
import TimePerCategory from '../../components/customBarCharts/timePerCategoryBar'
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
          <div className='barchart-container'>
            <TimePerCategory />
          </div>
        </div>
      </PageWrapper>
    </>
  )
}