import Character from "./components/Character";
import { Grid } from "@mui/material";

const App = () => {
  const rows: number[] = Array.from(Array(5).keys());
  const cols: number[] = Array.from(Array(3).keys());

  function ataque1Loco(id:number){

  }

  return (
    <>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{background: "red", width: "40%"}}>
          {rows.map((row) => {
            return <div style={{display: "grid", gridTemplateColumns: "auto auto auto"}}>
              {cols.map((col) => {
                return <div style={{border: "1px solid #000", height: 100}}>
                  <Character name="Daniel" healthPointss={10} attack={10} ataque1Loco={ataque1Loco}/>
                </div>
              })}
            </div>
          })}
        </div>
        <div style={{background: "green", width: "40%"}}>
        {rows.map((row) => {
            return <div style={{display: "grid", gridTemplateColumns: "auto auto auto"}}>
              {cols.map((col) => {
                return <div style={{border: "1px solid #000", height: 100}}>
                  <Character name="Matías" healthPointss={20} attack={5} ataque1Loco={ataque1Loco}/>
                </div>
              })}
            </div>
          })}
        </div>
      </div>
    </>
  );
};

export default App;
