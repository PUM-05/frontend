import "./categoryButtonGroup.scss";
import CategoryButton from '../categoryButton/CategoryButton'

export default function CategoryButtonGroup (props){

    /*
    const [bool1, setBool1] = useState(true);

    onClick={handleClick}
    const handleClick = event => {
        const Buttonid = event.currentTarget.id;
        setBool1(false);
        
    } 
    */ 
    return (
        <div className="button-group-wrapper">
            <CategoryButton id="Knapp1" value="1" name={props.name} color="darkblue">Justera lön</CategoryButton>
            <CategoryButton id="Knapp2" name={props.name} color="orange">Registrera frånvaro</CategoryButton>
            <CategoryButton id="Knapp3" name={props.name} color="red">Registrera ny personal</CategoryButton>
            <CategoryButton id="Knapp4" name={props.name} color="yellow">Problem med stämpelklocka</CategoryButton>
            <CategoryButton id="Knapp5" name={props.name} color="darkblue">Installation av stämpelklocka</CategoryButton>
            <CategoryButton id="Knapp6" name={props.name} color="darkblue">Synkronisering av stämpelklocka</CategoryButton>
            <CategoryButton id="Knapp7" name={props.name} color="darkblue">Ändra inställningar</CategoryButton>
            <CategoryButton id="Knapp8" name={props.name} color="darkblue">Skapa nytt konto</CategoryButton>
            <CategoryButton id="Knapp9" name={props.name} color="darkblue">Ta bort konto</CategoryButton>
            <CategoryButton id="Knapp10" name={props.name} color="darkblue">Exportera data</CategoryButton>
            <CategoryButton id="Knapp11" name={props.name} color="darkblue">Annat</CategoryButton>
            <CategoryButton id="minknapp" nama={props.name} color="red">Röd knapp </CategoryButton>
        </div>
    )
}
