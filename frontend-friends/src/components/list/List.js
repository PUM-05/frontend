import './list.scss'
import data from './dummy-data.json'
import { useState } from 'react'

export default function List () {
  const [cases] = useState(data)

  return (
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
          <tr key={currCase.id}>
            <td>{currCase.caseNumber}</td>
            <td>{currCase.caseDescription}</td>
            <td>{currCase.caseTime}</td>
          </tr>
        )}

      </tbody>
    </table>
  )
}
