import "./button.scss";

export default function CategoryButton (props){
    return (
        <div className="category-button-wrapper">
            <input id={props.id} name={props.name} type="radio" className="red active"/>
            <label for={props.id} name={props.name} className={`${props.color}`}>{props.children}</label>
        </div>
    )
}
