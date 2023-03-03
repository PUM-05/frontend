import { useState } from "react";
import "./button.scss";

export default function CategoryButton (props){

    return (
        <div className="category-button-wrapper">
            <input id={props.id} name={props.name} value={props.value} type="radio" className="red active" onClick={(clicked) => props.onClick?.(clicked)}/>
            <label for={props.id} name={props.name} value={props.value} className={`${props.color}`}>{props.children}</label>
        </div>
    )
} 