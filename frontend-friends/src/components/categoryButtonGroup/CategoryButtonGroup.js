import "./categoryButtonGroup.scss";
import CategoryButton from '../categoryButton/CategoryButton'
import { useState } from "react";

export default function CategoryButtonGroup (props){
    
    
    const [bool1, setBool1] = useState(true);
    let clickedButton;

    
    const handleClick = event => {
        clickedButton = event.currentTarget;
        console.log(event.currentTarget)
        setBool1(!bool1);
    } 

    const subcategoryClick = event => {
        //let buttonText = event.currentTarget.value;
        //clickedButton.value = buttonText;
        console.log(event.currentTarget.value);
        console.log(clickedButton);
        setBool1(!bool1);
    }

    return (
        <div className="top-button-group-wrapper">
                <div className="button-group-wrapper">
                    <CategoryButton id="Knapp1" value="Justera lön" name={props.name} color="darkblue">Justera lön</CategoryButton>
                    <CategoryButton id="Knapp2" value="Registrera frånvaro" name={props.name} color="orange">Registrera frånvaro</CategoryButton>
                    <CategoryButton id="Knapp3" name={props.name} color="red">Registrera ny personal</CategoryButton>
                    <CategoryButton id="Knapp4" name={props.name} color="green" onClick={handleClick}>Stämpelklocka</CategoryButton>
                    {!bool1 ? <div className="break"></div> : null}
                    {!bool1 ? <CategoryButton id="Knapp10" value="Problem med stämpelklocka" name={props.name} color="yellow" onClick={subcategoryClick}>Problem</CategoryButton> : null}
                    {!bool1 ? <CategoryButton id="Knapp11" value="Installation av stämpelklocka" name={props.name} color="darkblue" onClick={() => subcategoryClick("Knapp4")}>Installation</CategoryButton> : null}
                    {!bool1 ? <CategoryButton id="Knapp12" value="Synkronisering av stämpelklocka"name={props.name} color="darkblue" onClick={() => subcategoryClick("Knapp4")}>Synkronisering</CategoryButton> : null}
                    <CategoryButton id="Knapp5" name={props.name} color="darkblue">Ändra inställningar</CategoryButton>
                    <CategoryButton id="Knapp6" name={props.name} color="darkblue">Skapa nytt konto</CategoryButton>
                    <CategoryButton id="Knapp7" name={props.name} color="darkblue">Ta bort konto</CategoryButton>
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