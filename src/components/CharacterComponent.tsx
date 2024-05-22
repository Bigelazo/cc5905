import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import Character from "../model/Character";

interface Props {
  c: Character;
  currentPlayer: number | null;
  doActionSelected: (c: number) => () => void;
}

const CharacterComponent = ({ c, currentPlayer, doActionSelected }: Props) => {
  
  return (
    <div style={currentPlayer == c.id?{color: "yellow"}:{}} onClick={doActionSelected(c.id)}>
      <div>{c.name}</div>
      <div>Hp: {c.hp}</div>
      <div>Atk: {c.atk}</div>
    </div>
  );
};

export default CharacterComponent;
