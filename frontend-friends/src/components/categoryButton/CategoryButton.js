import "./button.scss";

export default function CategoryButton (props){
    return (
        <>
        <input id={props.id} name={props.name} type="radio" className="red active"/>
        <label for={props.id} name={props.name} className={`${props.color}`}>{props.children}</label>
        </>
    )
}
