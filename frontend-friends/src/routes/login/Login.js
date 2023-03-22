import { Link } from "react-router-dom";
import SubmitButton from "../../components/submitButton/SubmitButton";
import TextField from "../../components/textfield/TextField";
import PageWrapper from "../../components/pagewrapper/PageWrapper";
import "./Login.scss";
import Logo from "../../components/sidebar/logo/Logo"
import { useState } from "react";

export default function Input() {
  return (
    <>
        <div className="contain-all">
          <div class="default-logo">
            <Logo  className="login-logo"/>
          </div>
          <div className="form-container">
            <form>
              <TextField placeholder="Användarnamn" isRequired={true}/>
            </form>
            <SubmitButton name="submit">LOGGA IN</SubmitButton> 
            {
                //TODO: Om användare är admin, skickas till 
                //ny sida, där man kan skriva in lösenord, när man har klickat på login-knapp?
                //Eller ska det finnas ett password-field direkt? Förvirrande för "vanliga" användare? 
            }
          </div>
        </div>
    </>
  );
}
