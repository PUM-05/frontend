import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './CaseList.scss'
import List from '../../components/list/List'
import { getData } from '../../utils/request'
import { useEffect, useState } from 'react'

export default function CaseList () {
  const [cases, setCases] = useState([])

  useEffect(() => {
    loadCases()
  }, [])

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
          <div class='container-title'>
            <h1>Senaste ärenden</h1>
          </div>
          <List content={cases} loadCases={loadCases}/>
        </div>
      </PageWrapper>
    </>
  )
}
