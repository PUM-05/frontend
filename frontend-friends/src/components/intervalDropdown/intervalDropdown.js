import { useState } from 'react'
import './intervalDropdown.scss'

/**
 * Component displaying a toggle to switch between e-mail and phone.
 * @param {*} props
 * @returns Toggle component
 */
export default function IntervalDropdown (props) {

    return(
        <div className='dropdown-container'>
            <select className='time-select' onChange={props.onChange} value={props.value}>
                <option value="week">1 vecka</option>
                <option value="2Week">2 veckor</option>
                <option value="4Week">4 veckor</option>
                <option value="year">1 år</option>
          </select>
        </div>
    )
}