import './categoryButtonGroup.scss'
import CategoryButton from '../categoryButton/CategoryButton'
import { Fragment, useEffect, useState } from 'react'
import { getData } from '../../utils/request'

export default function CategoryButtonGroup (props) {
  const [showSubid, setShowSubid] = useState()
  const [buttonData, setButtonData] = useState([])

  async function loadCategories(){
    let request = await getData('/case/categories');
    let data = await request.json();
    setButtonData(data)
  }
  useEffect(() => {
    loadCategories()
  }, []);

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
