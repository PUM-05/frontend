import './list.scss'
import { useState } from 'react'
import Popup from '../popup/Popup'
import { postData } from '../../utils/request'

export default function List (props) {
  const [isOpen, setIsOpen] = useState(false)
  const [popupData, setPopupData] = useState({})

  function togglePopup(popupContent) {
    setIsOpen(!isOpen)
    setPopupData(popupContent)
  }

  async function editCase(case_id, case_spent_time, case_additional_time, case_notes) {
    const data = {
      customer_time: parseInt(case_spent_time),
      additional_time: parseInt(case_additional_time),
      notes: case_notes
    }
    const response = await postData('/case/'+String(case_id), data)

    console.log(response)

    if (response.status === 204) {
      console.log("IM HERE")
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
              ÄRENDEKATEGORI
            </th>
            <th>
              SKAPAT
            </th>
            <th>
              TIDSÅTGÅNG
            </th>
            <th>

            </th>
          </tr>
        </thead>
        <tbody>
          {props.content.map((currCase) =>
            <tr onClick={() => togglePopup(currCase)} key={currCase.id}>
              <td>{currCase.id}</td>
              <td>{currCase.category_id}</td>
              <td>{currCase.customer_time}</td>
              <td>{currCase.additional_time}</td>
              <td className="edit-field">Redigera</td>
            </tr>
          )}

          </tbody>
      </table>
      {isOpen && <Popup handleClose={togglePopup} data={popupData} editCase={editCase}/>}
    </>
  )
}
