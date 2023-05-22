import './categoryButtonGroup.scss'
import CategoryButton from '../categoryButton/CategoryButton'
import { Fragment, useEffect, useState } from 'react'
import { getData } from '../../utils/request'

/**
 * Creates and displays a group of categories
 * @param {*} props
 * @returns Component of category buttons
 */
export default function CategoryButtonGroup (props) {
  const [showSubid, setShowSubid] = useState()
  const [buttonData, setButtonData] = useState([])

  /**
   * Gets categories from server
   */
  async function loadCategories () {
    const request = await getData('/case/categories')
    const data = await request.json()
    setButtonData(data)
  }

  useEffect(() => {
    async function fetchData () {
      await loadCategories()
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (showSubid) {
      props.onSubToggle()
    }
  }, [showSubid])

  /**
   * Handles change
   * @param {*} data is the data from the event
   */
  function onChange (data) {
    props.onChange(data)
  }

  return (
    <div className='button-group-wrapper'>
      {buttonData.map((item, i) => (
        <Fragment key={i}>
          <CategoryButton
            id={'button-' + item.id}
            name={props.name}
            onChange={onChange}
            setShowSub={setShowSubid}
            showSub={showSubid === item.id}
            subcategories={item.subcategories}
            value={item.id}
            currentValue={props.value}
            key={item.id}
            index={i}
          >
            {item.name}
          </CategoryButton>
        </Fragment>
      ))}
    </div>
  )
}
