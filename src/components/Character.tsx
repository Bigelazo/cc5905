import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import Character_ from "../model/Character_";

interface Props {
  c: Character_;
  attack: (fromId: number, toId: number) => void;
}

const Character = ({ c, attack }: Props) => {
  const [name, setName] = useState(c.name);
  const [healthPoints, setHealthPoints] = useState(c.hp);
  const [attackDamage, setAttackDamage] = useState(c.atk);

  return (
    <>
      <div>{name}</div>
      <div>Hp: {healthPoints}</div>
      <div>Atk: {c.atk}</div>
      <Button variant="contained" size="small" onClick={() => attack}>
        Atk
      </Button>
    </>
  );
};

export default Character;
