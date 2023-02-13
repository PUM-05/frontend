import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <div>
        <Link to="/">Start</Link>
        <Link to="/example">Exempel</Link>
      </div>
    </>
  );
}
