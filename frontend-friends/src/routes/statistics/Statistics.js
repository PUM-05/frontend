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
  const today = new Date()
  const [numOfCalls, setNumOfCalls] = useState([])
  const [numOfMails, setNumOfMails] = useState([])

  const [interval, setInterval] = useState(7)
  const handleChange = (event) => {
    switch(event.target.value){
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
  };

  useEffect(() => {
    async function getNumOfCasesWeek (interval) {
      let i = 0
      let urlArray = []
      let year = today.getFullYear()
      let month = today.getMonth()+1
      let day = today.getDay()

      while(i < interval){
        if(day === 0 || (day === 7 && interval === 4)){ // new month
          month = month - 1
          let newDate = new Date(year, month, 0);
          day = newDate.getDate()
        } else if (month === 1 && day <= 0){ // new year
          month = 12
          year = year - 1
          day = 31
        }
        if (interval === 7 || interval === 14){
          urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ("0" + day).slice(-2)) + 'T00:00:00Z&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ("0" + day).slice(-2)) + 'T23:59:59Z'))
          day = day - 1
        } else if (interval === 4){
          urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ("0" + (day-7)).slice(-2)) + 'T00:00:00Z&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ("0" + day).slice(-2)) + 'T23:59:59Z'))
          day = day - 7
        }
        i = i + 1
      }
      /*
      if (interval === 7 || interval === 14){
        while(i < interval){
          if(day === 1){ // new month
            month = month - 1
            let newDate = new Date(year, month, 0);
            day = newDate.getDate()
          } else if (month === 1 && day <= 0){ // new year
            month = 12
            year = year - 1
            day = 31
          }
          day = day - 1
          urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ("0" + day).slice(-2)) + 'T00:00:00Z&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ("0" + day).slice(-2)) + 'T23:59:59Z'))
          i = i + 1
        }
      }else if (interval === 4){
        while(i < interval){
          if(day === 1){ // new month
            month = month - 1
            let newDate = new Date(year, month, 0);
            day = newDate.getDate()
          } else if (month === 1 && day <= 0){ // new year
            month = 12
            year = year - 1
            day = 31
          }
          urlArray.push(('/stats/medium?start-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ("0" + (today.getDate()-((i+1)*7))).slice(-2)) + 'T00:00:00Z&end-time=' + (year + '-' + ('0' + (month)).slice(-2) + '-' + ("0" + (today.getDate()-(i*7))).slice(-2)) + 'T23:59:59Z'))
          i = i + 1
        }
      }/*else{
        while(i < interval){
          let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
          urlArray.push(('/stats/medium?start-time=' + (year + '-' + month + '-' + ("0" + (today.getDate()-((i+1)*7))).slice(-2)) + 'T00:00:00Z&end-time=' + (year + '-' + month + '-' + ("0" + (today.getDate()-(i*7))).slice(-2)) + 'T23:59:59Z'))
        }
      }*/

      let promises = urlArray.map(async url => (await getData(url)).json())
      let phoneArray = []
      let mailArray = []
      let array = await Promise.all(promises)
      console.log(urlArray)
      for(i=0; i < array.length; i++){
        phoneArray.push(array[i].phone)
        mailArray.push(array[i].email)
      }
      setNumOfCalls(phoneArray.slice().reverse())
      setNumOfMails(mailArray.slice().reverse())
    }
    getNumOfCasesWeek(interval)
  }, [interval])

  function setLabels(interval){
    let year = today.getFullYear()
    let month = today.getMonth()+1
    let day = today.getDay()
    let i = 0
    let labelArray = []
    const monthNames = ['','January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];

    while(i < interval){
      if(day === 0 || (day === 7 && interval === 4)){ // new month
        month = month - 1
        let newDate = new Date(year, month, 0);
        day = newDate.getDate()
      } else if (month === 1 && day <= 0){ // new year
        month = 12
        year = year - 1
        day = 31
      }
      if(interval === 7 || interval === 14){  
        labelArray.push((year + '-' + month + '-' + (("0" + day).slice(-2))))
        day = day - 1
      }else if (interval === 4){
        if(day - 7 <= 0){
          let monthUpdated = month - 1
          let diff = Math.abs(day-7)
          let newDate = new Date(year, month, 0);
          let dayUpdated = newDate.getDate() - diff
          labelArray.push(((dayUpdated) + ' ' + monthNames[monthUpdated] +'-' + day + ' ' + monthNames[month].slice(0,3)))
          day = dayUpdated
          month = monthUpdated
        } else{
          labelArray.push(((day-7) + '-' + day + monthNames[month].slice(0,3)))
        }
        day = day - 7
      } 
      i = i + 1  
    }
    console.log(labelArray)
    return labelArray.slice().reverse()
  }


  return (
    <>
      <PageWrapper className='Statistics'>
        <h1>Statistics</h1>
        <div className='chart-container'>
          <div className='barchart-container'>
            <IntervalDropdown onChange={handleChange}/>
            <BarChart 
              labels={setLabels(interval)}
              titletext='Antal ärenden'
              datasets= {[
                {
                  label: 'Telefon',
                  data: numOfCalls,
                  backgroundColor: '#579CFB',
                },
                {
                  label: 'Mail',
                  data: numOfMails,
                  backgroundColor: '#20E2BA',
                }
              ]}
            />
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
