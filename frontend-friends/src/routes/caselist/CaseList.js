import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './CaseList.scss'
import List from '../../components/list/List'

export default function CaseList () {
  return (
    <>
      <PageWrapper>
        <h1>Ärendelista</h1>
        <div className='list-container'>
          <div className='container-title'>
            <h1>Senaste ärenden</h1>
          </div>
          <List />
        </div>
      </PageWrapper>
    </>
  )
}
