import { useState } from 'react'
import SubcategoryButton from '../subcategoryButton/SubcategoryButton'
import './button.scss'

export default function CategoryButton(props) {
    const [showSubcategories, setShowSubcategories] = useState(false)
    const [buttonTitle, setButtonTitle] = useState(props.children)

    function onClick(e, currentValue) {
        setShowSubcategories(!showSubcategories)
        if (!props.subcategories && !isChecked(currentValue)) {
            props.onChange({ title: props.children, value: props.value })
        }
    }

    function handleSubcategoryClick(data) {
        props.onChange(data)
        setButtonTitle(data.parentTitle)
    }

    function isChecked(currentValue) {
        if (props.value == currentValue) {
            return true
        }

        let value = false
        if (props.subcategories) {
            for (const category of props.subcategories) {
                if (category.value == currentValue) {
                    value = true
                }
            }
        }

        if (!value) {
            if (buttonTitle != props.children) {
                setButtonTitle(props.children)
            }
        }
        return value
    }

    return (
        <>
            <div className="category-button-wrapper">
                <input
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    type="radio"
                    className="red active"
                    checked={isChecked(props.currentValue)}
                    onClick={onClick}
                />
                <label for={props.id} name={props.name} value={props.value} className={`${props.color ?? 'darkblue'}`}>
                    {buttonTitle}
                </label>
            </div>

            {props.subcategories && showSubcategories && (
                <div className="subcategory-popup-1">
                    {props.subcategories.map((category) => (
                        <SubcategoryButton
                            id={'button-' + category.value}
                            parentTitle={category.parentTitle}
                            value={category.value}
                            name={'sub-' + props.name}
                            color={category.color}
                            onClick={handleSubcategoryClick}
                            checked={props.currentValue === category.value}
                        >
                            {category.title}
                        </SubcategoryButton>
                    ))}
                </div>
            )}
        </>
    )
}
