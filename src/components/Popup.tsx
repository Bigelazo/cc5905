import React from "react";
import "./Popup.css";

interface PopupProps {
  message: string;
}

const Popup: React.FC<PopupProps> = ({ message }) => {
  return <div className="popup">{message}</div>;
};

export default Popup;
