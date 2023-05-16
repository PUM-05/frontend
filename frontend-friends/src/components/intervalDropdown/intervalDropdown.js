import './intervalDropdown.scss'

/**
 * Component displaying a dropdown menu with differnet alternatives for intervals for charts.
 * @param {*} props contains props
 * @returns dropdown component
 */
export default function IntervalDropdown (props) {
  function getOptions () {
    const options = []
    for (let i = 0; i < Object.keys(props.options).length; i++) {
      options.push(<option key={i} value={Object.keys(props.options)[i]}>{Object.values(props.options)[i]}</option>)
    }
    return options
  }

  return (
    <div className='dropdown-container'>
      <select className='time-select' onChange={props.onChange} value={props.value}>
        {getOptions()}

      </select>
    </div>
  )
}
