import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import Character1 from "../Character1";

interface Props {
  c: Character1;
  ataque1Loco: (id: number) => void;
}

const Character = ({ c, ataque1Loco }: Props) => {
  const [name, setName] = useState(c.name);
  const [healthPoints, setHealthPoints] = useState(c.hp);
  const [attackDamage, setAttackDamage] = useState(c.atk);

  return (
    <>
      <div>Nombre: {name}</div>
      <div>Vida: {healthPoints}</div>
      <div>Daño:{c.atk}</div>
      <Button
        variant="contained"
        size="small"
        onClick={() => setHealthPoints(healthPoints - 1)}
      >
        Attack
      </Button>
    </>
  );
};

export default Character;
