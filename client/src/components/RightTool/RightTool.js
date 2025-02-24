import React from "react";
import "./RightTool.scss";
import FriendRequestList from "../FriendRequestList/FriendRequestList";
import ContactList from "../ContactList/ContactList";

export default function RightTool() {
  return (
    <div className="right-tool">
      <FriendRequestList />
      <ContactList />
      {/* <div className="">Group</div> */}
    </div>
  );
}
