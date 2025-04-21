import React from "react";
import "./LeftNav.scss";
import { Avatar } from "@mui/material";
import LeftNavItem from "./LeftNavItem/LeftNavItem";

export default function LeftNav() {
  return (
    <div className="left-nav">
      <LeftNavItem src={"/facebook-ai-icon.png"} text={"Meta AI"} />
      <LeftNavItem src={"/friend-icon.png"} text={"Bạn bè"} />
      <LeftNavItem src={"/video-icon.png"} text={"Video"} />
      <LeftNavItem src={"/marketplace-icon.webp"} text={"Marketplace"} />
      <LeftNavItem src={"/memory-icon.webp"} text={"Kỉ niệm"} />
      <LeftNavItem src={"/bookmark-icon.png"} text={"Đã lưu"} />
      <LeftNavItem src={"/game-icon.png"} text={"Chơi game"} />
      <LeftNavItem src={"/messenger-icon.webp"} text={"Messenger"} />
    </div>
  );
}
