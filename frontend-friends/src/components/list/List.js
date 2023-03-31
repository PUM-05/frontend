import './list.scss'
import { useState } from 'react'
import Popup from '../popup/Popup'

export default function List (props) {
  const [cases] = useState(props.content)
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
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
              ÄRENDE
            </th>
            <th>
              TID
            </th>
          </tr>
        </thead>
        <tbody>
          {cases.map((currCase) =>
            <tr onClick={togglePopup} key={currCase.id}>
              <td>{currCase.caseNumber}</td>
              <td>{currCase.caseDescription}</td>
              <td>{currCase.caseTime}</td>
            </tr>
          )}

        </tbody>
      </table>

      {isOpen && <Popup handleClose={togglePopup} />}
    </>
  )
}
