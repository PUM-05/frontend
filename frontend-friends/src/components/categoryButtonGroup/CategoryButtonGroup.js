import "./categoryButtonGroup.scss";
import CategoryButton from '../categoryButton/CategoryButton'
import { useState } from "react";
import SubcategoryButton from '../subcategoryButton/SubcategoryButton'

export default function CategoryButtonGroup (props){
    
    
    const [bool1, setBool1] = useState(true);
    const [bool2, setBool2] = useState(true);
    let clickedButton;

    
    function handleClick(givenBool) {
        console.log(givenBool);
        switch(givenBool){
            case bool1:
                setBool1(!givenBool);
                break;
            case bool2:
                setBool2(!givenBool);
                break;
        }
    } 

    function subcategoryClick(givenBool) {
        switch(givenBool){
            case bool1:
                setBool1(!givenBool);
                break;
            case bool2:
                setBool2(!givenBool);
                break;
        }
        //setBool1(!givenBool);
    }

    return (
        <div className="top-button-group-wrapper">
                <div className="button-group-wrapper">
                    <CategoryButton id="Knapp1" value="Justera lön" name={props.name} color="darkblue">Justera lön</CategoryButton>
                    <CategoryButton id="Knapp2" value="Registrera frånvaro" name={props.name} color="orange">Registrera frånvaro</CategoryButton>
                    <CategoryButton id="Knapp3" name={props.name} color="red">Registrera ny personal</CategoryButton>
                    <CategoryButton id="Knapp4" name={props.name} color="green" onClick={() => handleClick(bool1)}>Stämpelklocka</CategoryButton>
                    {!bool1 ? <div className="subcategory-popup-1">
                        <SubcategoryButton id="Knapp10" value="Problem med stämpelklocka" name={props.name} color="yellow" onClick={() => subcategoryClick(bool1)}>Problem</SubcategoryButton>
                        <SubcategoryButton id="Knapp11" value="Installation av stämpelklocka" name={props.name} color="darkblue" onClick={() => subcategoryClick(bool1)}>Installation</SubcategoryButton>
                        <SubcategoryButton id="Knapp12" value="Synkronisering av stämpelklocka"name={props.name} color="darkblue" onClick={() => subcategoryClick(bool1)}>Synkronisering</SubcategoryButton>
                    </div>  : null}
                    <CategoryButton id="Knapp5" name={props.name} color="darkblue">Ändra inställningar</CategoryButton>
                    <CategoryButton id="Knapp13" name={props.name} color="darkblue" onClick={() => handleClick(bool2)}> Konto </CategoryButton>
                    {!bool2 ? <div className="subcategory-popup-1">
                        <SubcategoryButton id="Knapp6" name={props.name} color="darkblue" onClick={() => subcategoryClick(bool2)}>Skapa nytt konto</SubcategoryButton>
                        <SubcategoryButton id="Knapp7" name={props.name} color="darkblue"onClick={() => subcategoryClick(bool2)}>Ta bort konto</SubcategoryButton>
                    </div> : null }
                    <CategoryButton id="Knapp8" name={props.name} color="darkblue">Exportera data</CategoryButton>
                    <CategoryButton id="Knapp9" name={props.name} color="darkblue">Annat</CategoryButton>
                </div>       
        </div>
    )
}

/*
    {bool1 ? 
                <div className="button-group-wrapper">
                    <CategoryButton id="Knapp1" value="Justera lön" name={props.name} color="darkblue">Justera lön</CategoryButton>
                    <CategoryButton id="Knapp2" value="Registrera frånvaro" name={props.name} color="orange">Registrera frånvaro</CategoryButton>
                    <CategoryButton id="Knapp3" name={props.name} color="red">Registrera ny personal</CategoryButton>
                    <CategoryButton id="Knapp4" name={props.name} color="green" onClick={handleClick}>Stämpelklocka</CategoryButton>
                    <CategoryButton id="Knapp5" name={props.name} color="darkblue">Ändra inställningar</CategoryButton>
                    <CategoryButton id="Knapp6" name={props.name} color="darkblue">Skapa nytt konto</CategoryButton>
                    <CategoryButton id="Knapp7" name={props.name} color="darkblue">Ta bort konto</CategoryButton>
                    <CategoryButton id="Knapp8" name={props.name} color="darkblue">Exportera data</CategoryButton>
                    <CategoryButton id="Knapp9" name={props.name} color="darkblue">Annat</CategoryButton>
                </div>
            : null
            }
            {!bool1 ? <div className="subcategory-popup-1">
                <button id="back" onClick={() => setBool1(!bool1)}>Tillbaka</button>
                <CategoryButton id="Knapp10" value="Problem med stämpelklocka" name={props.name} color="yellow" onClick={() => subcategoryClick("Knapp4")}>Problem</CategoryButton>
                <CategoryButton id="Knapp11" value="Installation av stämpelklocka" name={props.name} color="darkblue" onClick={() => subcategoryClick("Knapp4")}>Installation</CategoryButton>
                <CategoryButton id="Knapp12" value="Synkronisering av stämpelklocka"name={props.name} color="darkblue" onClick={() => subcategoryClick("Knapp4")}>Synkronisering</CategoryButton>
                
                </div>
            : null} 
*/