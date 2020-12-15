import logo from "./logo.svg";
import "./Loading.css";

function Loading() {
  return (
    <div className="Loading">
      <img src={logo} className="Loading-logo" alt="logo" />
      <p>Loading......</p>
    </div>
  );
}

export default Loading;
