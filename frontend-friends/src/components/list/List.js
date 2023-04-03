import './list.scss'
import { useState } from 'react'
import Popup from '../popup/Popup'

export default function List (props) {
  const [cases] = useState(props.content)
  const [isOpen, setIsOpen] = useState(false)
  const [popupData, setPopupData] = useState({})

  function togglePopup(popupContent) {
    setIsOpen(!isOpen)
    setPopupData(popupContent)
  }

  return (
    <>
      <table>
        <thead>
          <tr className='list-header'>
            <th>
              ÄRENDENUMMER
            </th>
            <th>
              ÄRENDEKATEGORI
            </th>
            <th>
              SKAPAT
            </th>
            <th>
              TIDSÅTGÅNG
            </th>
          </tr>
        </thead>
        <tbody>
          {cases.map((currCase) =>
            <tr onClick={(e) => {togglePopup(currCase)}} key={currCase.id}>
              <td>{currCase.caseNumber}</td>
              <td>{currCase.caseCategory}</td>
              <td>{currCase.caseTime}</td>
              <td>{currCase.spentTime}</td>
            </tr>
          )}

        </tbody>
      </table>
      {isOpen && <Popup handleClose={togglePopup} data={popupData}/>}
    </>
  )
}
