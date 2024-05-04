import Character from "./components/Character";
import Character1 from "./Character1";
import "./styles/style.css";
import "./styles/menu.css";

const App = () => {
  const elements: number[] = Array.from(Array(9).keys());

  const c1: Character1 = new Character1("Daniel", 100, 10);
  const c2: Character1 = new Character1("Matías", 200, 5);

  function ataque1Loco(id: number): void {
    return;
  }

  return (
    <>
      <div className="main-container">
        <div className="info-container">
          The information should be displayed here.
        </div>

        <div className="grid-container">
          <div className="turn-container">
            {elements.map((row) => {
              return <div>TURN</div>;
            })}
          </div>

          <div className="grid-left">
            {elements.map((row) => {
              return (
                <div className="panel">
                  <Character c={c1} ataque1Loco={ataque1Loco} />
                </div>
              );
            })}
          </div>

          <div className="grid-right">
            {elements.map((row) => {
              return (
                <div className="panel">
                  <Character c={c2} ataque1Loco={ataque1Loco} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="menu-container">
          <div className="unit-info">
            <div className="headers">
              <h5>Name</h5>
              <h5>Info 1</h5>
              <h5>Info 2</h5>
              <h5>Info 3</h5>
            </div>
            <div className="info">
              <p>Bad guy 1</p>
              <p>Bad guy 1</p>
              <p>Bad guy 1</p>
              <p>Bad guy 1</p>
            </div>
          </div>
          <div className="action-selection">
            <p>Option 1</p>
            <p>Option 2</p>
            <p>Option 3</p>
            <p>Option 4</p>
          </div>
          <div className="unit-info">
            <div className="headers">
              <h5>Name</h5>
              <h5>Info 1</h5>
              <h5>Info 2</h5>
              <h5>Info 3</h5>
            </div>
            <div className="info">
              <p>Bad guy 1</p>
              <p>Bad guy 1</p>
              <p>Bad guy 1</p>
              <p>Bad guy 1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
