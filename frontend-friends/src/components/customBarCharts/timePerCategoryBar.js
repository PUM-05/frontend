import { getData } from "../../utils/request"
import { useState, useEffect } from "react"
import IntervalDropdown from "../intervalDropdown/intervalDropdown"
import BarChart from "../barChart/barChart"

export default function TimePerCategory(props){



  function getCategories(){

  }

  const handleChange = (event) => {
    switch (event.target.value) {
      case '2Week':
        setInterval(14)
        break
      case '4Week':
        setInterval(4)
        break
      case 'year':
        setInterval(12)
        break
      default:
        setInterval(7)
        break
    }
  }

  return(
    <div>
    <IntervalDropdown onChange={handleChange}/>
    <BarChart
      titletext='Genomsnittlig tid per kategori'
      datasets={[20,20]}
      labels={getCategories()}
    />
  </div>
  )
}