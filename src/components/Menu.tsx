import React, { useEffect, useState } from "react";
import "../styles/menu.css";
import { Button } from "@mui/material";
import BigelButton from "./BigelButton";

interface Props {
  setActionSelected: (action: number) => void,
  actionSelected: number | null,
}

const Menu = ({setActionSelected, actionSelected}: Props) => {
  
  return (
    <div className="menu-container">
      <div className="left-info">
        <div className="headers">
          <h5>Name</h5>
          <h5>Info 1</h5>
          <h5>Info 2</h5>
          <h5>Info 3</h5>
        </div>
        <div className="info">
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
        </div>
      </div>
      <div className="action-selection">
        <BigelButton onClick={() => setActionSelected(1)} selected={actionSelected==1}>Attack</BigelButton>
        <BigelButton onClick={() => setActionSelected(2)} selected={actionSelected==2}>Defend</BigelButton>
        <BigelButton onClick={() => setActionSelected(3)} selected={actionSelected==3}>Fireball</BigelButton>
      </div>
      <div className="right-info">
        <div className="headers">
          <h5>Name</h5>
          <h5>Info 1</h5>
          <h5>Info 2</h5>
          <h5>Info 3</h5>
        </div>
        <div className="info">
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
