import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import './piechart.scss'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

/**
 * Pie chart displaying given data
 * @param {*} props {titletext, labels, datasets}
 * @returns Pie chart component
 */
export default function pieChart (props) {
  const data = {
    labels: props.labels,
    datasets: props.datasets

  }
  const options = {
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
          size: 18,
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
    <div className='pie-button-wrapper'>
      <Pie data={data} options={options} />

    </div>
  )
}
