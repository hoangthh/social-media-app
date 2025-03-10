import React from "react";
import "./LeftNav.scss";
import { Avatar } from "@mui/material";

export default function LeftNav() {
  const userName = "Huy Hoàng";

  return (
    <div className="left-nav">
      <div className="left-nav--item">
        <Avatar sx={{ width: 35, height: 35 }} />
        <p className="left-nav--item--name">{userName}</p>
      </div>
      <div className="left-nav--item">
        <Avatar sx={{ width: 35, height: 35 }} />
        <p className="left-nav--item--name">{userName}</p>
      </div>
      <div className="left-nav--item">
        <Avatar sx={{ width: 35, height: 35 }} />
        <p className="left-nav--item--name">{userName}</p>
      </div>
    </div>
  );
}
