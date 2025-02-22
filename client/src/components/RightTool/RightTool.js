import React from "react";
import "./RightToool.scss";
import FriendRequestList from "../FriendRequestList/FriendRequestList";
import Contact from "../Contact/Contact";

export default function RightTool() {
  return (
    <div className="right-tool">
      <FriendRequestList />
      <Contact />
      <div className="">Group</div>
    </div>
  );
}
