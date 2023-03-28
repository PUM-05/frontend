import './textfield.scss'

export default function TextField(props) {
    const isRequired = props.isRequired || false
    if (isRequired) {
        return (
            <div className="text-field">
                <input type="text" id={props.id} name="mandatory-text-field" required onChange={props.onChange} />
                <label htmlFor={props.id}>{props.placeholder}</label>
            </div>
        )
    }
    return (
        <div className="text-field">
            <input type="text" id={props.id} name="text-field" onChange={props.onChange} />
            <label htmlFor={props.id}>{props.placeholder}</label>
        </div>
    )
}
