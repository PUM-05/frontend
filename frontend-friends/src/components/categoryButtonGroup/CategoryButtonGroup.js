import "./categoryButtonGroup.scss";
import CategoryButton from '../categoryButton/CategoryButton'
import { useState } from "react";
import SubcategoryButton from '../subcategoryButton/SubcategoryButton'

export default function CategoryButtonGroup (props){

    const [check1, setCheck1] = useState(false); 
    const [check2, setCheck2] = useState(false); 
    
    const [bool1, setBool1] = useState(true);
    const [bool2, setBool2] = useState(true);

    const [buttonText1, setButtonText1] = useState('Stämpelklocka'); 
    const [buttonText2, setButtonText2] = useState('Konto'); 
     
    function handleClick(target, givenBool) {
        
        switch(givenBool){
            case "bool1":
                if(buttonText1 != 'Stämpelklocka'){
                    setButtonText1('Stämpelklocka');
                }
                setBool1(!bool1);
                break;
            case "bool2":
                if(buttonText2 != 'Konto'){
                    setButtonText2('Konto');
                }
                setBool2(!bool2);
                break;
        }
    } 

    function subcategoryClick(target, givenBool) {
        switch(givenBool){
            case "bool1":
                setCheck1(true);
                setCheck2(false);
                setButtonText1(target.value);
                setBool1(!bool1);
                break;
            case "bool2":
                setCheck1(false);
                setCheck2(true);
                setButtonText2(target.value);
                setBool2(!bool2);
                break;
        }
    }

    function uncheckSubcatBtn(){
        setCheck1(false);
        setCheck2(false);
        setButtonText1('Stämpelklocka');
        setButtonText2('Konto');
    }

    return (
        <div className="top-button-group-wrapper">
                <div className="button-group-wrapper">
                    <CategoryButton id="Knapp1" name={props.name} color="darkblue" onClick={uncheckSubcatBtn}>Justera lön</CategoryButton>
                    <CategoryButton id="Knapp2" name={props.name} color="orange" onClick={uncheckSubcatBtn}>Registrera frånvaro</CategoryButton>
                    <CategoryButton id="Knapp3" name={props.name} color="red" onClick={uncheckSubcatBtn}>Registrera ny personal</CategoryButton>
                    <CategoryButton id="Knapp4" name={props.name} value={check1} color="green" onClick={event => handleClick(event.target, "bool1")}>{buttonText1}</CategoryButton>
                    {!bool1 ? 
                        <div className="subcategory-popup-1">
                            <SubcategoryButton id="Knapp10" value="Problem med stämpelklocka" name={props.name} color="yellow" onClick={event => subcategoryClick(event.target, "bool1")}>Problem</SubcategoryButton>
                            <SubcategoryButton id="Knapp11" value="Installation av stämpelklocka" name={props.name} color="darkblue" onClick={event => subcategoryClick(event.target, "bool1")}>Installation</SubcategoryButton>
                            <SubcategoryButton id="Knapp12" value="Synkronisering av stämpelklocka"name={props.name} color="darkblue" onClick={event => subcategoryClick(event.target, "bool1")}>Synkronisering</SubcategoryButton>
                        </div>  
                    : null}
                    <CategoryButton id="Knapp5" name={props.name} color="darkblue" onClick={uncheckSubcatBtn}>Ändra inställningar</CategoryButton>
                    <CategoryButton id="Knapp13" name={props.name} value={check2} color="darkblue" onClick={event => handleClick(event.target, "bool2")}>{buttonText2}</CategoryButton>
                    <CategoryButton id="Knapp8" name={props.name} color="darkblue" onClick={uncheckSubcatBtn}>Exportera data</CategoryButton>
                    <CategoryButton id="Knapp9" name={props.name} color="darkblue" onClick={uncheckSubcatBtn}>Annat</CategoryButton>
                    {!bool2 ? 
                        <div className="subcategory-popup-1">
                            <SubcategoryButton id="Knapp6"  value="Skapa nytt konto" name={props.name} color="darkblue" onClick={event => subcategoryClick(event.target, "bool2")}>Skapa nytt konto</SubcategoryButton>
                            <SubcategoryButton id="Knapp7" value="Ta bort konto" name={props.name} color="darkblue"onClick={event => subcategoryClick(event.target, "bool2")}>Ta bort konto</SubcategoryButton>
                        </div> 
                    : null }
                </div>       
        </div>
    )
}