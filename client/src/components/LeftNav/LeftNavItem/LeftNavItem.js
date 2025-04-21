import React from "react";
import "./LeftNavItem.scss";
import { Typography } from "@mui/material";

export default function LeftNavItem({ src, text }) {
  return (
    <div className="left-nav-item">
      <img src={src} alt="" className="left-nav-item--img" />
      <p className="left-nav-item--p">{text}</p>
    </div>
  );
}
