import React, { useState } from "react";
import { Button } from "@mui/material";

interface Props {
  name: string;
  healthPointss: number;
  attack: number;
}

const Character = ({ name, healthPointss, attack }: Props) => {
  const [healthPoints, setHealthPoints] = useState(20);

  return (
    <>
      <div>Nombre: {name}</div>
      <div>Vida: {healthPoints}</div>
      <div>Daño:{attack}</div>
      <Button
        variant="outlined"
        onClick={() => setHealthPoints(healthPoints - 1)}
      >
        Attack Button
      </Button>
    </>
  );
};

export default Character;
