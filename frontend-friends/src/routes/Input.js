import { Link } from "react-router-dom";
import TextField  from "../components/textfield/TextField";
import Toggle from "../components/toggle/Toggle";

export default function Input() {
  return (
    <>
      <h1>Inmatning</h1>
      <Link to="/dashboard">Gå till överblickssida</Link>
      <form>
        <TextField />
      </form>
      <Toggle/>
    </>
  );
}
