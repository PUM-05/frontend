import './list.scss'
import { useState } from 'react'
import Popup from '../popup/Popup'
import { editData } from '../../utils/request'

export default function List (props) {
  const [isOpen, setIsOpen] = useState(false)
  const [popupData, setPopupData] = useState({})

  function togglePopup (popupContent) {
    setIsOpen(!isOpen)
    setPopupData(popupContent)
  }

  async function editCase (caseId, caseSpentTime, caseAdditionalTime, caseNotes) {
    const data = {
      customer_time: parseInt(caseSpentTime),
      additional_time: parseInt(caseAdditionalTime),
      notes: caseNotes
    }
    const response = await editData('/case/' + String(caseId), data)

    if (response.status === 204) {
      props.loadCases()
      setIsOpen(!isOpen)
    }
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
              KATEGORI
            </th>
            <th>
              TIDSÅTGÅNG
            </th>
            <th>
              EFTERARBETE
            </th>
            <th>
              SKAPAT
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.content.map((currCase) =>
            <tr onClick={() => togglePopup(currCase)} key={currCase.id}>
              <td>{currCase.id}</td>
              <td>{currCase.category_id}</td>
              <td>{currCase.customer_time} min</td>
              <td>{currCase.additional_time} min</td>
              <td>{currCase.created_at}</td>
              <td className='edit-field'>Redigera</td>
            </tr>
          )}

        </tbody>
      </table>
      {isOpen && props.hasPopup && <Popup handleClose={togglePopup} data={popupData} editCase={editCase} />}
    </>
  )
}
