import { useState } from "react";
import "./subcategoryButton.scss";

export default function CategoryButton (props){

    return (
        <div className="subcategory-button-wrapper">
            <input id={props.id} name={props.name} value={props.value} type="radio" className="red active" onClick={(clicked) => props.onClick?.(clicked)}/>
            <label for={props.id} name={props.name} value={props.value} className={`${props.color}`}>{props.children}</label>
        </div>
    )
}