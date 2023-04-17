import './categoryButtonGroup.scss'
import CategoryButton from '../categoryButton/CategoryButton'
import { Fragment, useState } from 'react'

/**
 * Creates and displays a group of categories
 * @param {*} props 
 * @returns Component of category buttons
 */
export default function CategoryButtonGroup (props) {
  const [showSubValue, setShowSubValue] = useState()
  const buttonData = [
    {
      title: 'Justera Lön',
      value: 1,
      color: 'category-blue'
    },
    {
      title: 'Registrera frånvaro',
      value: 2,
      color: 'category-cyan'
    },
    {
      title: 'Registrera ny personal',
      value: 3,
      color: 'category-red'
    },
    {
      title: 'Stämpelklocka',
      value: 4,
      color: 'category-yellow',
      subcategories: [
        { title: 'Problem', parentTitle: 'Problem med stämpelklocka', value: 5 },
        { title: 'Installation', parentTitle: 'Installation av stämpelklocka', value: 6 },
        { title: 'Synkronisering', parentTitle: 'Synkronisering av stämpelklocka', value: 7 }
      ]
    },
    {
      title: 'Ändra inställningar',
      value: 8,
      color: 'category-brown'
    },
    {
      title: 'Exportera data',
      value: 9,
      color: 'category-green'
    },
    {
      title: 'Konto',
      value: 10,
      color: 'category-purple',
      subcategories: [
        { title: 'Skapa nytt konto', parentTitle: 'Skapa nytt konto', value: 11 },
        { title: 'Ta bort konto', parentTitle: 'Ta bort konto', value: 12 }
      ]
    },
    {
      title: 'Annat',
      value: 13,
      color: 'category-violet'
    }
  ]

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
            id={'button-' + item.value}
            name={props.name}
            color={item.color}
            onChange={onChange}
            setShowSub={setShowSubValue}
            showSub={showSubValue === item.value}
            subcategories={item.subcategories}
            value={item.value}
            currentValue={props.value}
            key={item.value}
            index={i}
          >
            {item.title}
          </CategoryButton>
        </Fragment>
      ))}
    </div>
  )
}
