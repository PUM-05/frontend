import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './CaseList.scss'
import List from '../../components/list/List'
import { getData } from '../../utils/request'
import { useEffect, useState } from 'react'
import SearchBar from '../../components/searchBar/searchBar'
import Arrow from '../../utils/icons/Arrow'

/**
 * Page containing a list of all cases.
 * @returns CaseList page component
 */
export default function CaseList () {
  const [cases, setCases] = useState([])
  const [searchString, setSearchString] = useState('')
  const [finalValue, setFinalValue] = useState('')
  const [page, setPage] = useState(1)

  const [hasMorePages, setHasMorePages] = useState(false)

  const casesPerPage = 10

  useEffect(() => {
    getSearchedCases().catch(() => 'Could not retrieve cases')
  }, [finalValue, page])

  /**
  * Waiting for enter to be pressed, if clicked, then submitdata
  * @param {*} e is the event from the button
  */
  async function handleKeyPress (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setFinalValue(searchString)
    }
  }

  async function getSearchedCases () {
    let query = `?per-page=${casesPerPage}&page=${page}`
    if (finalValue !== '') {
      query += ('&case-id=' + finalValue)
    }
    const request = await (getData(('/case' + query)))
    const data = await (request.json())
    setHasMorePages(data.has_more)
    setCases(data.cases)
  }

  return (
    <>
      <PageWrapper className='case-list-page'>
        <h1>Ärendelista</h1>
        <div className='list-container'>
          <div className='top-wrapper'>
            <div className='container-title'>
              <h1>Senaste ärenden</h1>
            </div>
            <div className='search-container'>
              <SearchBar
                placeholder='Sök på ärendenummer...'
                onChange={(e) => { setSearchString(e.target.value) }}
                onKeyDown={(e) => { handleKeyPress(e).catch(() => 'Could not retrieve cases') }}
                value={searchString}
              />
            </div>
          </div>
          <List content={cases} loadCases={getSearchedCases} hasPopup page={page} setPage={setPage} hasMorePages={hasMorePages} />

        </div>

        <div className='pagination-wrapper'>
          <div className='pagination-switch-buttons'>
            <button className={`left ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page - 1)}><Arrow /></button>
            <button className={`right ${hasMorePages ? '' : 'disabled'}`} onClick={() => setPage(page + 1)}><Arrow /></button>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
