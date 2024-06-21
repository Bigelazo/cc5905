import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import Character from "../model/Character";

interface Props {
  c: Character;
  currentPlayer: number | null;
  doActionSelected: (c: number) => () => void;
}

const CharacterComponent = ({ c, currentPlayer, doActionSelected }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={currentPlayer == c.id ? { color: "yellow" } : {}}
        onClick={(e) => {
          e.stopPropagation();
          doActionSelected(c.id)();
        }}
      >
        {c.name}
      </div>
      {show && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#555",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          <div>Name: {c.name}</div>
          <div>Health points: {c.hp}</div>
          <div>Attack damage: {c.atk}</div>
        </div>
      )}
    </>
  );
};

export default CharacterComponent;
