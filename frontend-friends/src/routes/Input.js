import { Link } from "react-router-dom";
import CategoryButton from "../components/categoryButton/CategoryButton";
import TextField  from "../components/textfield/TextField";
import Toggle from "../components/toggle/Toggle";

export default function Input() {
  return (
    <>
      <h1>Inmatning</h1>
      <Link to="/dashboard">Gå till överblickssida</Link>
      <CategoryButton id="test" name="knappar" color="darkblue">Kategori 1</CategoryButton>
      <CategoryButton id="test2" name="knappar" color="darkblue">Kategori 2</CategoryButton>
      <form>
        <TextField />
      </form>
      <Toggle/>
    </>
  );
}
