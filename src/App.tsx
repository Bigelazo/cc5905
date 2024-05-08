import Menu from "./components/Menu";
import "./styles/style.css";
import VersusGrid from "./components/VersusGrid";

const App = () => {
  return (
    <>
      <div className="main-container">
        <div className="info-container">
          The information should be displayed here.
        </div>
        <VersusGrid />
        <Menu />
      </div>
    </>
  );
};

export default App;
