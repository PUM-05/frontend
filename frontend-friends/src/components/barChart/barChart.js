import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

import './barChart.scss'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


/**
 * Bar chart displaying the given data
 * @param {*} props are the properties it contains
 * @returns a bar chart component
 */
export default function barChart (props) {
  let xVals = ["Italy", "France", "Spain", "USA", "Argentina"]
  let yVals = [55, 49, 44, 24, 15]

  const data = {
    labels: props.labels,
    datasets: props.datasets,
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  const oldoptions = {
    responsive: true,
    maintainAspectRatio: false,
    maxHeight: 50,
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
          size: 24,
          family: ['Montserrat', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
        }
      },
    }

  }

  return (
    <div className='bar-button-wrapper'>
      <Bar data={data} options={options} />
    </div>
  )
}
