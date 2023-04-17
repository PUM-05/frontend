import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import "./pieChart.scss";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
export default function pieChart(props) {
   const data = {
    labels: props.labels,
    datasets: props.datasets,
    
  };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        maxHeight: 50,
        plugins: {
          title: {
            display: true,
            position: "top",
            text: props.titletext,
            padding: {
              top: 10,
              bottom: 10
            },
            font: {
              size: 24,
              family: 'Helvetica Neue'
            } 
          },
          legend: {
            display: false,
            position: "bottom",
            

            labels: {
              fontColor: "#333",
              fontSize: 40,
              usePointStyle: true,
              boxWidth: 5,
            }
          }
        }

    };

      return(
        <div className="pie-button-wrapper">
          <Pie data={data} options={options}/>
          
        </div>
      ) 


    
}