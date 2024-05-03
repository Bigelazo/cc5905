import Character from "./components/Character";
import Character1 from "./Character1";
import "./styles/style.css";

const App = () => {
  const elements: number[] = Array.from(Array(9).keys());

  const c1: Character1 = new Character1("Daniel", 100, 10);
  const c2: Character1 = new Character1("Matías", 200, 5);

  function ataque1Loco(id: number): void {
    return;
  }

  return (
    <>
      <div className="container">
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
    </>
  );
};

export default App;
