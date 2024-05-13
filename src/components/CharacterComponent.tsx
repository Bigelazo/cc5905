import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import Character from "../model/Character";

interface Props {
  c: Character;
  attack: (toId: number) => void;
  currentPlayer: number | null;
}

const CharacterComponent = ({ c, attack, currentPlayer }: Props) => {
  
  return (
    <>
      <div>{c.name}</div>
      <div>Hp: {c.hp}</div>
      <div>Atk: {c.atk}</div>
      <Button variant="contained" size="small" onClick={() => attack(c.id)}>
        Atk
      </Button>
    </>
  );
};

export default CharacterComponent;
