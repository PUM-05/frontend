import { useState } from "react"

export default function RadioButton (props) {


    if (props.medium === 'phone') {
        return (
            <label class='phone-button'>
                <input type='radio' name={props.name} value={props.medium} checked={props.checked} onChange={props.onChange}/>
                Telefon
            </label>
        )
    }
    else if (props.medium === 'email') {
        return (
            <label class='email-button'>
                <input type='radio' name={props.name} value={props.medium} checked={props.checked} onChange={props.onChange} />
                Mail
            </label>
        )
    }
    else {
        return (
            <></>
        )
    }
}