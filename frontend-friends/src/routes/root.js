import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div>
        <h1>Bästa kundtjänstapplikationen</h1>
        <Link to="/example">Till exempel</Link>
      </div>
    </>
  );
}
