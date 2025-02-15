import React from "react";
import "./Header.scss";
import { TextField, AppBar, Stack, Avatar, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import { useDispatch, useSelector } from "react-redux";
import { hideChatList, showChatList } from "../../redux/actions";
import { chatListState$, userState$ } from "../../redux/selectors";
import ChatList from "../ChatList/ChatList";

const navbarItems = [
  { title: "Trang chủ", icon: <HomeOutlinedIcon /> },
  { title: "Video", icon: <OndemandVideoOutlinedIcon /> },
  { title: "Trò chơi", icon: <SportsEsportsOutlinedIcon /> },
  { title: "Marketplace", icon: <StorefrontOutlinedIcon /> },
  { title: "Nhóm", icon: <Diversity3OutlinedIcon /> },
];

export default function Header() {
  const dispatch = useDispatch();

  const user = useSelector(userState$);

  const { isShow } = useSelector(chatListState$);

  const handleToggleChatList = () => {
    if (isShow) {
      dispatch(hideChatList());
      return;
    }
    dispatch(showChatList());
  };

  const handleNavbarClick = (item) => {
    console.log(item);
  };

  return (
    <AppBar
      position="sticky"
      color="red"
      sx={{ paddingRight: 2, background: "#fff" }}
    >
      <Stack direction="row" justifyContent="space-between">
        {/* Left navbar */}
        <div className="left-navbar">
          <img
            alt=""
            src="./facebook-logo.webp"
            style={{
              width: 40,
              height: 40,
              margin: "5px 10px",
            }}
          />
          <TextField
            id="search-input"
            placeholder="Tìm kiếm trên Facebook"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  border: "none",
                  outline: "none",
                  borderRadius: "20px",
                },
              },
            }}
            sx={{
              background: "#f0f2f5",
              borderRadius: "20px",
              border: "none",
              outline: "none",
            }}
          />
        </div>

        {/* Main navbar */}
        <div className="main-navbar">
          {navbarItems.map((item) => (
            <Tooltip
              title={item.title}
              key={item.title}
              onClick={() => handleNavbarClick(item)}
            >
              <div className="main-navbar--item">{item.icon}</div>
            </Tooltip>
          ))}
        </div>

        {/* Right navbar */}
        <div className="right-navbar">
          <Tooltip title="Messenger" onClick={handleToggleChatList}>
            <div className="right-navbar--item">
              <i className="fa-brands fa-facebook-messenger"></i>
            </div>
          </Tooltip>
          {showChatList && <ChatList />}
          <Tooltip title="Thông báo">
            <div className="right-navbar--item">
              <i className="fa-solid fa-bell"></i>
            </div>
          </Tooltip>

          <Tooltip title="Tài khoản">
            <Avatar src={user.avatar}></Avatar>
          </Tooltip>
        </div>
      </Stack>
    </AppBar>
  );
}
