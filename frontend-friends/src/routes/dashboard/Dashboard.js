import List from '../../components/list/List'
import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './dashboard.scss'

export default function Dashboard () {
  return (
    <>
      <PageWrapper className='dashboard'>
        <h1>Dashboard</h1>
        <div className='dashboard-content graph-container'>
          <div className='container-title'>
            <h2>Grafer</h2>
          </div>
          <div className='graphs-content'>
            <div>Graf 1</div><div>Graf 2</div>
            {/* TODO: Lägg till graferna här och ta bort Graf 1 och Graf 2 */}
          </div>
        </div>
        <div className='dashboard-content list-container'>
          <div className='container-title'>
            <h2>Senaste ärenden</h2>
          </div>
          <List />
        </div>
      </PageWrapper>
    </>
  )
}
