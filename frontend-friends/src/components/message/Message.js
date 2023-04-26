import { useEffect, useState } from 'react'
import { getData } from '../../utils/request'
export default Message;

function Message(props) {
  const [isListUpdated, setListUpdated] = useState(false);
  const [cases, setCases] = useState([])

  async function listUpdated () {
    const request = await (getData('/case'))
    setListUpdated(true); 
  };

  
  useEffect(() => {
    loadCases()
  }, [])

  /**
   * Fetching cases from the server to display in list
   */
  async function loadCases () {
    const request = await (getData('/case'))
    const data = await (request.json())
    setCases(data.cases)
  }

  return (
    <div>
      <p>{props.text}</p>
    </div>
  );
}