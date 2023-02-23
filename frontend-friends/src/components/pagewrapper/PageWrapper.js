import { Link, useLocation } from "react-router-dom";
import "./pagewrapper.scss";
import SideBar from "../sidebar/SideBar";

export default function PageWrapper(props) {
  return (
    <div className="page-container">
      <SideBar />
      <div className="content-container">{props.children}</div>
    </div>
  );
}
