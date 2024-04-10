import Character from "./components/Character";
import { Grid } from "@mui/material";

const App = () => {
  return (
    <>
      <Grid container spacing={12} justifyContent="center">
        <Grid item>
          <Character name="Daniel" healthPointss={10} attack={10} />
        </Grid>
        <Grid item>
          <Character name="Matías" healthPointss={20} attack={5} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
