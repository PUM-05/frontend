import { useState } from "react";
import "./button.scss";

export default function CategoryButton (props){

    const [clicked, setClicked] = useState(false);

    return (
        <div className="category-button-wrapper">
            <input id={props.id} name={props.name} type="radio" value={props.value} className="red active" onClick={(clicked) => props.onClick?.(clicked)}/>
            <label for={props.id} name={props.name} className={`${props.color}`}>{props.children}</label>
        </div>
    )
}