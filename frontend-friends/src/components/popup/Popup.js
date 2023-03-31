import "./popup.scss"
import TextField from "../textfield/TextField"
import SubmitButton from "../submitButton/SubmitButton"
import CloseIcon from "../sidebar/icons/CloseIcon"
import TextArea from "../textArea/TextArea"

export default function Popup(props){
    return(
        <>
        <div className="popup-container">
            <div className="popup-background" onClick={props.handleClose}></div>
            <div className="popup">
                <h1>Redigera ärende</h1>
                <span onClick={props.handleClose}><CloseIcon/></span>
                <div className="text-fields-container">
                    <TextField
                        placeholder="Ärendenr"
                        isRequired={false}
                    />
                    <div className="dual-textfield-container">
                        <TextField
                            placeholder="Tidsåtgång"
                            isRequired={false}
                        />
                        <TextField
                            placeholder="Efterarbete"
                            isRequired={false}
                        />
                    </div>
                    <TextArea placeholder="Fritext..." id="fritext"></TextArea>
                </div>
                <SubmitButton>SPARA</SubmitButton>
            </div>
        </div>
        </>
    )
}