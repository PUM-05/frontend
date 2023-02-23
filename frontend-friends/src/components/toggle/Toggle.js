import ReactSwitch from "react-switch";
import { useState} from "react";
import "./Toggle.scss"
import PhoneIcon from "../sidebar/icons/PhoneIcon";
import MailIcon from "../sidebar/icons/MailIcon";

export default function Toggle() {
    const [checked, setChecked] =  useState(true);

    const handleChange = val => {
        setChecked(val)
    }
    return(
        <ReactSwitch 
            checked = {checked}
            onChange = {handleChange}
            className = "toggle"
            onColor="#FFFFFF" //#F0F1F2
            offColor="#FFFFFF" //#F0F1F2
            onHandleColor="#579CFB"
            offHandleColor="#579CFB"
            checkedHandleIcon={<MailIcon/>}
            uncheckedHandleIcon={<PhoneIcon/>}
            uncheckedIcon={false}
            checkedIcon={false}
        />        
    );
}