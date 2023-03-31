import "./text-area.scss"

export default function TextArea(props){
    return(
        <div className="text-area">
            <textarea id={props.id} name="text-area"></textarea>
            <label htmlFor={props.id}>{props.placeholder}</label>
        </div>
    )
}