import { Link } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";

export default function Root() {
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <SideBar />
      </div>
    </>
  );
}
