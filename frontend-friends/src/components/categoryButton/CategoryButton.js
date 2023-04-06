import { useState } from 'react'
import SubcategoryButton from '../subcategoryButton/SubcategoryButton'
import './button.scss'
import { getCategoryColor } from '../../utils/colors'

export default function CategoryButton (props) {
  const [buttonTitle, setButtonTitle] = useState(props.children)

  function onClick (e, currentValue) {
    if (props.showSub) {
      props.setShowSub(null)
    } else {
      props.setShowSub(props.value)
    }

    if (props.subcategories.length === 0 && !isChecked(currentValue)) {
      props.onChange({ name: props.children, value: props.value })
    }
  }
  function handleSubcategoryClick (data) {
    console.log(data)
    props.onChange(data)
    
    setButtonTitle(data.parentTitle)
  }

  function isChecked (currentValue) {
    if (props.value === currentValue) {
      return true
    }

    let value = false
    if (props.subcategories) {
      for (const category of props.subcategories) {
        if (category.id === currentValue) {
          value = true
        }
      }
    }

    if (!value) {
      if (buttonTitle !== props.children) {
        setButtonTitle(props.children)
      }
    }
    return value
  }

  return (
    <>
      <div className='category-button-wrapper'>
        <input
          id={props.id}
          name={props.name}
          value={props.value}
          type='radio'
          className='red active'
          checked={isChecked(props.currentValue)}
          onClick={onClick}
        />
        <label for={props.id} name={props.name} value={props.value} className={`${getCategoryColor(props.value)}`}>
          {buttonTitle}
        </label>
      </div>

      {props.subcategories.length !== 0 && props.showSub && (
        <div className='subcategory-popup' style={{ gridRowStart: Math.ceil(props.index / 4) + 1 }}>
          {props.subcategories.map((category, i) => (
            <SubcategoryButton
              id={'button-' + category.id}
              parentTitle={props.children + " " + category.name}
              value={category.id}
              name={'sub-' + props.name}
              color={getCategoryColor(props.value)}
              onClick={handleSubcategoryClick}
              checked={props.currentValue === category.id}
              key={category.id}
            >
              {category.name}
            </SubcategoryButton>
          ))}
        </div>
      )}
    </>
  )
}
