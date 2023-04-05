import { useState } from 'react'
import SubcategoryButton from '../subcategoryButton/SubcategoryButton'
import './button.scss'
import CheckIcon from '../sidebar/icons/CheckIcon'

export default function CategoryButton (props) {
  const [buttonTitle, setButtonTitle] = useState(props.children)

  function onClick (e, currentValue) {
    if (props.showSub) {
      props.setShowSub(null)
    } else {
      props.setShowSub(props.value)
    }

    if (!props.subcategories && !isChecked(currentValue)) {
      props.onChange({ title: props.children, value: props.value })
    }
  }

  function handleSubcategoryClick (data) {
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
        if (category.value === currentValue) {
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
        <label for={props.id} name={props.name} value={props.value} className={`${props.color ?? 'darkblue'}`}>
          <span>{buttonTitle}</span>
          <CheckIcon className='check-icon'></CheckIcon>
        </label>
      </div>

      {props.subcategories && props.showSub && (
        <div className='subcategory-popup' style={{ gridRowStart: Math.ceil(props.index / 4) + 1 }}>
          {props.subcategories.map((category, i) => (
            <SubcategoryButton
              id={'button-' + category.value}
              parentTitle={category.parentTitle}
              value={category.value}
              name={'sub-' + props.name}
              color={category.color}
              onClick={handleSubcategoryClick}
              checked={props.currentValue === category.value}
              key={category.value}
            >
              {category.title}
            </SubcategoryButton>
          ))}
        </div>
      )}
    </>
  )
}
