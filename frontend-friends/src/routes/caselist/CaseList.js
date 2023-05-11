import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './CaseList.scss'
import List from '../../components/list/List'
import { getData } from '../../utils/request'
import { useEffect, useState } from 'react'
import SearchBar from '../../components/searchBar/searchBar'

/**
 * Page containing a list of all cases.
 * @returns CaseList page component
 */
export default function CaseList () {
  const [cases, setCases] = useState([])

  useEffect(() => {
    loadCases()
  }, [])

  /**
   * Fetching cases from the server to display in list
   */
  async function loadCases () {
    const request = await (getData('/case'))
    const data = await (request.json())
    setCases(data.cases)
  }

  return (
    <>
      <PageWrapper>
        <h1>Ärendelista</h1>
        <div className='list-container'>
          <div className='top-wrapper'>
            <div className='container-title'>
              <h1>Senaste ärenden</h1>
            </div>
            <div className='search-container'>
              <SearchBar placeholder='Sök på ärendenummer...'/>
            </div>
          </div>
          <List content={cases} loadCases={loadCases} hasPopup />
        </div>
      </PageWrapper>
    </>
  )
}
