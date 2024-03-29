import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
)
/**
 * Line diagram displaying given data
 * @param {*} props {titletext, labels, datasets}
 * @returns Line diagram component
 */
export default function lineChart (props) {
  const data = {
    labels: props.labels,
    datasets: props.datasets

  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    maxHeight: 50,
    scales: {
      y: {
        min: 0
      }
    },
    plugins: {
      title: {
        display: true,
        position: 'top',
        text: props.titletext,
        padding: {
          top: 10,
          bottom: 10
        },
        font: {
          size: 15,
          family: ['Montserrat', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
        }
      },
      legend: {
        display: false,
        position: 'bottom',

        labels: {
          fontColor: '#333',
          fontSize: 40,
          usePointStyle: true,
          boxWidth: 5
        }
      }
    }

  }

  return (
    <div className='bar-button-wrapper'>
      <Line data={data} options={options} />

    </div>
  )
}
