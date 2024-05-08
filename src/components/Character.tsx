import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import Character_ from "../model/Character_";

interface Props {
  c: Character_;
  receiveDamage: (atk: number) => void;
}

const Character = ({ c, receiveDamage }: Props) => {
  const [name, setName] = useState(c.name);
  const [healthPoints, setHealthPoints] = useState(c.hp);
  const [attackDamage, setAttackDamage] = useState(c.atk);

  return (
    <>
      <div>{name}</div>
      <div>Hp: {healthPoints}</div>
      <div>Atk: {c.atk}</div>
      <Button
        variant="contained"
        size="small"
        onClick={() => setHealthPoints(healthPoints - c.atk)}
      >
        Atk
      </Button>
    </>
  );
};

export default Character;
