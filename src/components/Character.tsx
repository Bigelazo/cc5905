import React, { useState } from "react";
import { Button } from "@mui/material";

interface Props {
  name: string;
  healthPointss: number;
  attack: number;
  ataque1Loco: (id:number) => void;
}

const Character = ({ name, healthPointss, attack, ataque1Loco }: Props) => {
  const [healthPoints, setHealthPoints] = useState(20);

  return (
    <>
      <div>Nombre: {name}</div>
      <div>Vida: {healthPoints}</div>
      <div>Daño:{attack}</div>
      <Button
        variant="contained"
        size="small"
        onClick={() => setHealthPoints(healthPoints - 1)}
      >
        Attack Button
      </Button>
    </>
  );
};

export default Character;
