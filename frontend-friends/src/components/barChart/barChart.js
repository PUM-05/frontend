import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

/**
 * Bar chart displaying the given data
 * @param {*} props are the properties it contains
 * @returns a bar chart component
 */
export default function barChart (props) {
  const data = {
    labels: props.labels,
    datasets: props.datasets
  }
  const options = ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top'
      },
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
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        grace: '2%',
        stacked: true,
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }
    }
  })

  return (
    <div className='bar-button-wrapper'>
      <Bar data={data} options={options} />
    </div>
  )
}
