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

        plugins: {
          title: {
            display: true,
            position: "top",
            text: props.titletext,
            fontSize: 18,
            fontColor: "#111"
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontColor: "#333",
              fontSize: 40
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