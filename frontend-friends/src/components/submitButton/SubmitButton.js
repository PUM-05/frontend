import "./submitButton.scss";

export default function SubmitButton (props){
    return (
        <button className = "submit-button" type="submit">
            {props.children}
        </button>
    )
}
