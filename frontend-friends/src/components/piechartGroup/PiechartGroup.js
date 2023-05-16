import PieChart from "../piechart/Piechart";
import "./piechartGroup.scss";
import { useEffect, useState } from "react";
import { getData } from "../../utils/request";
/**
 * Group of pie charts for the dashboard page
 * @param {*} props
 * @returns Component containing two pie charts
 */
export default function PieChartGroup(props) {
  const [mediumData, setMediumData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLabels, setCategoryLabels] = useState([]);
  let interval = 14;

  useEffect(() => {
    async function getPieData() {
      const today = new Date();
      let startYear = today.getFullYear();
      let startMonth = today.getMonth() + 1;
      let startDay = today.getDate();
      let endYear = today.getFullYear();
      let endMonth = today.getMonth() + 1;
      let endDay = today.getDate();
      if (endDay < 14) {
        if (endMonth === 1) {
          startYear -= 1;
          startMonth = 12;
        } else {
          startMonth -= 1;
        }
        const newDate = new Date(startYear, startMonth, 0);
        startDay = newDate.getDate();
        startDay = startDay - 13 + endDay;
      } else {
        startDay -= 13;
      }
      const mediumUrl =
        "/stats/medium?start-time=" +
        (startYear +
          "-" +
          ("0" + startMonth).slice(-2) +
          "-" +
          ("0" + startDay).slice(-2)) +
        "T00:00:00&end-time=" +
        (endYear +
          "-" +
          ("0" + endMonth).slice(-2) +
          "-" +
          ("0" + endDay).slice(-2)) +
        "T23:59:59";
      const categoryUrl =
        "/stats/category?start-time=" +
        (startYear +
          "-" +
          ("0" + startMonth).slice(-2) +
          "-" +
          ("0" + startDay).slice(-2)) +
        "T00:00:00&end-time=" +
        (endYear +
          "-" +
          ("0" + endMonth).slice(-2) +
          "-" +
          ("0" + endDay).slice(-2)) +
        "T23:59:59";

      const mediumPromise = (await getData(mediumUrl)).json();
      const mediumArray = await mediumPromise;
      setMediumData([mediumArray.phone, mediumArray.email]);

      const categoryPromise = (await getData(categoryUrl)).json();
      const categoryArray = await categoryPromise;
      const categoryData = [];
      const categoryLabels = []
      for (let i = 0; i < categoryArray.length; i++) {
        categoryData.push(categoryArray[i].count);
        categoryLabels.push(categoryArray[i].category_name);
      }
      setCategoryData(categoryData);
      setCategoryLabels(categoryLabels);

    }
    getPieData();
  }, []);
  return (
    <div className="pie-chart-container">
      <PieChart
        labels={["Telefon", "Mail"]}
        titletext="Medie"
        datasets={[
          {
            label: "Antal Ärenden",
            data: mediumData,
            backgroundColor: [
              "rgba(87, 156, 251, 0.5)",
              "rgba(32, 226, 186, 0.5)",
            ],
            borderColor: ["white"],
            borderWidth: 4,
          },
        ]}
      />
      <PieChart
        labels={categoryLabels}
        titletext="Kategori"
        datasets={[
          {
            label: "Antal Ärenden",
            data: categoryData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: ["white"],
            borderWidth: 4,
          },
        ]}
      />
    </div>
  );
}
