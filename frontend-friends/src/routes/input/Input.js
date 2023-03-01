import { Link } from "react-router-dom";
import SubmitButton from "../../components/submitButton/SubmitButton";
import TextField from "../../components/textfield/TextField";
import Toggle from "../../components/toggle/Toggle";
import CategoryButtonGroup from "../../components/categoryButtonGroup/CategoryButtonGroup";
import PageWrapper from "../../components/pagewrapper/PageWrapper";
import "./input.scss";

export default function Input() {
  return (
    <>
      <PageWrapper>
        <div className="contain-all">
          <div className="header-container">
            <h1>Inmatning</h1>
            <Link to="/dashboard">Gå till överblickssida</Link>
          </div>

          <div className="form-container">
            <form>
              <Toggle />
              <TextField placeholder="Ärendenr" isRequired={false} />
              <CategoryButtonGroup name="category"></CategoryButtonGroup>
              <div className="text-field-container">
                <TextField placeholder="Tidsåtgång *" isRequired={true} />
                <TextField placeholder="Efterarbete" />
              </div>
            </form>
            <SubmitButton name="submit" value="1" color="yellow">
              Spara
            </SubmitButton>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
