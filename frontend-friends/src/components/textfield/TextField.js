import './textfield.scss'
import React, { useState } from 'react';

export default function TextField(props) {
    const [value, setValue] = useState("");

    function handleChange(e) {
        setValue(e.target.value);
    }
    const isRequired = props.isRequired || false
    if (isRequired) {
        return (
            <div className="text-field">
                <input type="text" id={props.id} name="mandatory-text-field" required onChange={props.onChange} />
                <label className={props.value && "filled"} htmlFor={props.id}>{props.placeholder}</label>
            </div>
        )
    }
    return (
        <div className="text-field">
            <input type="text" id={props.id} name="text-field" onChange={props.onChange} />
            <label className={props.value && "filled"} htmlFor={props.id}>{props.placeholder}</label>
        </div>
    )
}
