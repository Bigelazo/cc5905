import Character from "./components/Character";
import Character1 from "./Character1";
import { ReactNode } from "react";

const App = () => {
  const rows: number[] = Array.from(Array(5).keys());
  const cols: number[] = Array.from(Array(3).keys());

  const c1: Character1 = new Character1("Daniel", 100, 10);
  const c2: Character1 = new Character1("Matías", 200, 5);
  const c3: Character1 = new Character1("Eric", 150, 8);
  const c4: Character1 = new Character1("Federico", 180, 12);
  const loadInformation: Character1[] = [c1, c2];

  const characterParty: Character1[] = [c1];
  const enemiesParty: Character1[] = [c2, c3, c4];

  function ataque1Loco(id: number): void {
    return;
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ background: "red", width: "40%" }}>
          <p>Enemigos</p>
          {rows.map((row) => {
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                }}
              >
                {cols.map((col) => {
                  return (
                    <div style={{ border: "1px solid #000", height: 100 }}>
                      <Character c={c1} ataque1Loco={ataque1Loco} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ background: "green", width: "40%" }}>
          <p>Aliados</p>
          {rows.map((row) => {
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                }}
              >
                {cols.map((col) => {
                  return (
                    <div style={{ border: "1px solid #000", height: 100 }}>
                      <Character c={c2} ataque1Loco={ataque1Loco} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
