import "./textfield.scss"
export default function TextField(props) {
    const isRequired = props.isRequired;
    if (isRequired) {
        return (
            <input type="text" placeholder={props.placeholder} className="text-field" required />          
        );
    }
    return (
        <input type="text" placeholder={props.placeholder} className="text-field" />    
    );
}
