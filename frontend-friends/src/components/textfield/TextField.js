import "./textfield.scss";

export default function TextField(props) {
  const isRequired = props.isRequired || false;
  if (isRequired) {
    return (
      <div className="mandatory-text-field">
        <input type="text" required onChange={props.onChange} />
        <div className="placeholder">
          {props.placeholder} <span>*</span>
        </div>
      </div>
    );
  }
  return (
    <div className="text-field">
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}
