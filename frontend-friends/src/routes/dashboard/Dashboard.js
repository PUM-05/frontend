import List from '../../components/list/List'
import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './dashboard.scss'
import { getData } from '../../utils/request'
import { useEffect, useState } from 'react'
import PieChartGroup from '../../components/piechartGroup/PiechartGroup'

/**
 *
 * @returns usestate, allows you to add state to a functional component.
 */
export default function Dashboard () {
  const [cases, setCases] = useState([])

  useEffect(() => {
    loadCases().catch((e) => console.error(e))
  }, [])

  /**
   * Sends a request that fetches all cases from the database
   */
  async function loadCases () {
    const request = await (getData('/case?page=1&per-page=5'))
    const data = await (request.json())
    setCases(data.cases)
  }

  return (
    <>
      <PageWrapper className='dashboard'>
        <h1>Dashboard</h1>
        <div className='dashboard-content graph-container'>
          <div className='graphs-content'>
            <PieChartGroup />
          </div>
        </div>
        <div className='dashboard-content list-container'>
          <div className='container-title'>
            <h2>Senaste ärenden</h2>
          </div>
          <List content={cases} loadCases={loadCases} hasPopup={false} />
        </div>
      </PageWrapper>
    </>
  )
}
