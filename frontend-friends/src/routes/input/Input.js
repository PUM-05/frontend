import { Link } from 'react-router-dom'
import SubmitButton from '../../components/submitButton/SubmitButton'
import TextField from '../../components/textfield/TextField'
import Toggle from '../../components/toggle/Toggle'
import CategoryButtonGroup from '../../components/categoryButtonGroup/CategoryButtonGroup'
import PageWrapper from '../../components/pagewrapper/PageWrapper'
import './input.scss'
import { postData } from '../../utils/request'

export default function Input() {
    async function sendData() {
        const data = {
            notes: 'test',
        }
        let res = await postData('/case', data)
        console.log(res)
    }
    return (
        <>
            <PageWrapper>
                <div className="contain-all">
                    <Link to="/dashboard">Gå till överblickssida</Link>
                    <div className="header-container">
                        <h1>Kommunikationsmedie</h1>
                    </div>

                    <div className="form-container">
                        <form>
                            <Toggle />
                            <TextField placeholder="Ärendenr" isRequired={false} />
                            <CategoryButtonGroup name="category"></CategoryButtonGroup>
                            <div className="text-field-container">
                                <TextField placeholder="Tidsåtgång" isRequired={true} />
                                <TextField placeholder="Efterarbete" />
                            </div>
                        </form>
                        <SubmitButton name="submit">SKICKA</SubmitButton>
                    </div>
                    <button onClick={sendData}>Testa att skicka data</button>
                </div>
            </PageWrapper>
        </>
    )
}
