import { Link } from "react-router-dom";
import Toggle from "../components/toggle/Toggle";

export default function Input() {
  return (
    <>
      <h1>Inmatning</h1>
      <Link to="/dashboard">Gå till överblickssida</Link>
      <Toggle/>
    </>
  );
}
