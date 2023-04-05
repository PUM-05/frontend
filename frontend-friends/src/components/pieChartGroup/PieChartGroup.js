import PieChart from "../pieChart/pieChart";
import "./pieChartGroup.scss";
export default function pieChartGroup (props){
    return(
        <div className = "pie-chart-container">
                <PieChart 
                    labels={['TELEFON', 'MAIL']}
                    titletext = "Medie"
                    datasets = {[
                        {
                          label: 'Antal användningar',
                          data: [213, 422],
                          backgroundColor: [
                            'rgba(87, 156, 251, 0.5)',
                            'rgba(32, 226, 186, 0.5)',
                          ],
                          borderColor: [
                            'white',
                            'white',
                          ],
                          borderWidth: 4,
                        },
                    ]}
                />
                <PieChart 
                    labels={['JUSTERA LÖN', 'JUSTERA FRÅNVARO', 'REGISTRERA NY PERSONAL', 'STÄMPELKLOCKA', 'ÄNDRA INSTÄLLNINGAR', 'KONTO', 'EXPORTERA DATA', 'ANNAT']}
                    titletext = "Kategori"
                    datasets = {[
                        {
                          label: '# of Votes',
                          data: [22, 56, 10, 34, 5, 82, 6, 8],
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                          ],
                          borderColor: [
                            'white',

                          ],
                          borderWidth: 4,
                        },
                    ]}
                />
                <PieChart 
                    labels={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
                    datasets = {[
                        {
                          label: '# of Votes',
                          data: [12, 19, 3, 5, 2, 3],
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                          ],
                          borderWidth: 1,
                        },
                    ]}
                />
        </div>
    )
}