import React from "react";
import "../styles/menu.css";

const Menu = () => {
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
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
        <p>Option 4</p>
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
