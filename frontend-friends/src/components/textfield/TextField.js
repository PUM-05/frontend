import "./textfield.scss"

export default function TextField(props) {
    const isRequired = props.isRequired || false;
    if (isRequired) {
        return (
            <div className="mandatory-text-field text-field">
                <input type="text" id="test" name="test" required/>
                <label for="test">{props.placeholder }</label>
                {/* <div className="placeholder">
                    {props.placeholder} <span>*</span>
                </div> */}
            </div>
        );
    }
    return (
        <div className="text-field" >
            <input type="text" placeholder={props.placeholder} />
        </div>
    );
}
