import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BubbleController
} from 'chart.js'
import { Bubble } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BubbleController,
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
export default function bubbleChart (props) {
  const data = {
    labels: props.labels,
    datasets: props.datasets
  }
  const options = ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right'
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
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || ''
            const xValue = context.parsed.x || ''
            const yValue = context.parsed.y || ''
            return label + ': (' + xValue + ', ' + yValue + ')'
          },
          // Hide the r value (radius)
          labelPoint: function () {
            return ''
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Antal ärenden'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Genomsnittlig tid'
        },
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
      <Bubble data={data} options={options} />
    </div>
  )
}
