import { Link } from "react-router-dom";
import PageWrapper from "../../components/pagewrapper/PageWrapper";
import "./statistics.scss";

import PieChartGroup from "../../components/pieChartGroup/PieChartGroup";
export default function Statistics() {
  return (
    <>
      <PageWrapper>
        
        <div className="chart-container">

            <PieChartGroup/>
        </div>
      </PageWrapper>
    </>
  );
}
