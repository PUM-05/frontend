import { Link } from "react-router-dom";
import CategoryButton from "../components/categoryButton/CategoryButton";

export default function Input() {
  return (
    <>
      <CategoryButton id="hej" name="knappar" color="red"> Hej </CategoryButton>
      <h1>Inmatning</h1>
      <Link to="/dashboard">Gå till överblickssida</Link>
      <CategoryButton id="test" name="knappar" color="darkblue">Kategori 1</CategoryButton>
      <CategoryButton id="test2" name="knappar" color="darkblue">Kategori 2</CategoryButton>
    </>
  );
}
