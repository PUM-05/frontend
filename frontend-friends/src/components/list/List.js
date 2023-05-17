import './list.scss'
import { useEffect, useState } from 'react'
import Popup from '../popup/Popup'
import { editData } from '../../utils/request'
import NotesIcon from '../../utils/icons/NotesIcon'

/**
 * Creates and displays the list component of cases
 * @param {*} props props.content - data to show,
 * props.loadCases - function to load all cases in the list,
 * props.hasPopup - bool to know if the list component should have a popup or not
 * @returns a list component containing the specified props.data
 */
export default function List (props) {
  const [isOpen, setIsOpen] = useState(false)
  const [caseIndex, setCaseIndex] = useState(0)
  const [navDir, setNavDir] = useState()

  /**
   * Toggles the popup for editing cases
   * @param {*} popupContent - data content (data of the case) of the popup
   */
  function togglePopup (popupContent, caseIndex) {
    setIsOpen(!isOpen)
    setCaseIndex(caseIndex)
  }

  /**
   * Sends a PATCH request with the new edited data, if response is ok - closes the popup and updates the case list
   * @param {*} caseId - ID of the current case
   * @param {*} caseSpentTime - Spent time of the current case
   * @param {*} caseAdditionalTime - Additional time spent of the current case
   * @param {*} caseNotes - notes of the current case
   */
  async function editCase (caseId, caseSpentTime, caseAdditionalTime, caseNotes, newCaseId) {
    const data = {
      case_id: parseInt(newCaseId),
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

  function switchCase (newIndex) {
    if (newIndex >= 0 && newIndex < props.content.length) {
      setCaseIndex(newIndex)
    } else {
      props.setPage(newIndex < 0 ? props.page - 1 : props.page + 1)
      setNavDir(newIndex < 0 ? '-' : '+')
    }
  }

  function parseDate (date) {
    const d = new Date(date)
    return d.toLocaleString()
  }

  function getCaseIndex (index) {
    return Math.min(Math.max(props.content.length - 1, 0), index)
  }

  useEffect(() => {
    if (navDir === '+') {
      setCaseIndex(0)
      setNavDir(undefined)
    } else if (navDir === '-') {
      setCaseIndex(props.content.length - 1)
      setNavDir(undefined)
    }
  }, [props.content])

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
            <th />
          </tr>
        </thead>
        <tbody>
          {props.content.map((currCase, index) =>
            <tr onClick={() => togglePopup(currCase, index)} key={currCase.id}>
              <td>#{currCase.case_id}</td>
              <td>{(currCase.category_name !== null ? currCase.category_name : 'Kategori saknas')}</td>
              <td>{currCase.customer_time} min</td>
              <td>{currCase.additional_time} min</td>
              <td><div>{parseDate(currCase.created_at)}</div></td>
              <td className='edit-field'>Redigera</td>
              <td className='notes-icon'>
                <div className='notes-icon-container'>
                  {/[a-z0-9$&+,:;=?@#|'<>.^*()%!-åäö]/i.test(currCase.notes) ? <NotesIcon /> : <></>}
                </div>
              </td>
            </tr>
          )}

        </tbody>
      </table>
      {isOpen && props.hasPopup && <Popup handleClose={togglePopup} data={props.content[getCaseIndex(caseIndex)]} editCase={editCase} key={props.content[getCaseIndex(caseIndex)].id} index={getCaseIndex(caseIndex)} switchCase={switchCase} disablePrev={props.page === 1 && getCaseIndex(caseIndex) === 0} disableNext={!props.hasMorePages && getCaseIndex(caseIndex) === props.content.length - 1} />}
    </>
  )
}
