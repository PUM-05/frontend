import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "./icons/DashboardIcon";
import StatisticsIcon from "./icons/StatisticsIcon";
import ListIcon from "./icons/ListIcon";
import Logo from "./logo/Logo";

export default function SideBar() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="sidebar-container">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <ul>
        <li>
          <Link
            to="/"
            className={`navigation-link ${path === "/" ? "active" : ""}`}
          >
            <span>Inmatning</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={`navigation-link ${
              path === "/dashboard" ? "active" : ""
            }`}
          >
            <DashboardIcon /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/statistik"
            className={`navigation-link ${
              path === "/statistik" ? "active" : ""
            }`}
          >
            <StatisticsIcon />
            Statistik
          </Link>
          <Link
            to="/lista"
            className={`navigation-link ${path === "/lista" ? "active" : ""}`}
          >
            <ListIcon />
            Ärendelista
          </Link>
        </li>
      </ul>
    </div>
  );
}
