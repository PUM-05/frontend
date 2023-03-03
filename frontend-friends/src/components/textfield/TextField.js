import "./textfield.scss"
export default function TextField(props) {
    const isRequired = props.isRequired;
    if (isRequired) {
        return (
            <div className="input-text-field">
                <input type="text" required/>
                <div className="placeholder">
                    {props.placeholder} <span>*</span>
                </div>
            </div>
        );
    }
    return (
        <input type="text" placeholder={props.placeholder} className="text-field" />    
    );
}
