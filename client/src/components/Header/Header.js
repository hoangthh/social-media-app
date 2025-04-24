import React, { useEffect, useState } from "react";
import "./Header.scss";
import {
  TextField,
  AppBar,
  Stack,
  Avatar,
  Tooltip,
  styled,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import { useDispatch, useSelector } from "react-redux";
import { hideChatList, showChatList } from "../../redux/actions";
import { chatListState$, userState$ } from "../../redux/selectors";
import ChatList from "../ChatList/ChatList";
import * as api from "../../api";
import { Link } from "react-router-dom";
import NotificationList from "../NotificationList/NotificationList";
import { useSocket } from "../../socket/SocketProvider";

const DeleteSearchIcon = styled(CloseRoundedIcon)`
  &:hover {
    cursor: pointer;
  }
`;

const CustomBadge = styled(Badge)`
  &.MuiBadge-root {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

const navbarItems = [
  {
    title: "Trang chủ",
    defaultIcon: <HomeOutlinedIcon />,
    activeIcon: <HomeRoundedIcon color="primary" />,
  },
  {
    title: "Video",
    defaultIcon: <OndemandVideoOutlinedIcon />,
    activeIcon: <OndemandVideoRoundedIcon color="primary" />,
  },
  {
    title: "Trò chơi",
    defaultIcon: <SportsEsportsOutlinedIcon />,
    activeIcon: <SportsEsportsRoundedIcon color="primary" />,
  },
  {
    title: "Marketplace",
    defaultIcon: <StorefrontOutlinedIcon />,
    activeIcon: <StorefrontRoundedIcon color="primary" />,
  },
  {
    title: "Nhóm",
    defaultIcon: <Diversity3OutlinedIcon />,
    activeIcon: <Diversity3RoundedIcon color="primary" />,
  },
];

export default function Header() {
  const {
    arrivalSenderIds,
    setArrivalSenderIds,
    arrivalNotifications,
    setArrivalNotifications,
  } = useSocket();

  const [activeNavbarItem, setActiveNavbarItem] = useState(
    navbarItems[0].title
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [showNoti, setShowNoti] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(userState$);

  const { isShow } = useSelector(chatListState$);

  useEffect(() => {
    if (searchValue === "") {
      setSearchResult(null);
      return;
    }

    const delaySearch = setTimeout(async () => {
      const res = await api.searchUsersByName(searchValue);
      console.log(res);
      setSearchResult(res);
    }, 500); // Đợi 300ms trước khi gọi API

    return () => clearTimeout(delaySearch); // Xóa timeout khi searchValue thay đổi trước khi hết thời gian chờ
  }, [searchValue]);

  const handleToggleChatList = () => {
    if (isShow) {
      dispatch(hideChatList());
      return;
    }
    setShowNoti(false);
    dispatch(showChatList());
    setArrivalSenderIds([]);
  };

  const handleToggleNotiList = () => {
    if (showNoti) {
      setShowNoti(false);
      return;
    }
    dispatch(hideChatList());
    setShowNoti(true);
    setArrivalNotifications([]);
  };

  const handleNavbarClick = (item) => {
    setActiveNavbarItem(item.title);
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
          <Link to="/">
            <img
              className="left-navbar--logo"
              src="./facebook-logo.webp"
              alt="logo"
            />
          </Link>
          <TextField
            id="search-input"
            placeholder="Tìm kiếm trên Facebook"
            size="small"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {searchValue && (
                      <DeleteSearchIcon onClick={() => setSearchValue("")} />
                    )}
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

          {/* Search Result */}
          {searchResult && (
            <div className="left-navbar--search">
              {searchResult?.map((item) => (
                <Link
                  // href={`/user/${item?._id}`}
                  className="left-navbar--search__link"
                  to={`/user/${item?._id}`}
                  key={item?._id}
                >
                  <div className="chat">
                    <Avatar src={item?.avatar} />
                    <div className="chat--info">
                      <p className="chat--info__header">{item?.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Main navbar */}
        <div className="main-navbar">
          {navbarItems.map((item) => (
            <Tooltip
              title={item.title}
              key={item.title}
              onClick={() => handleNavbarClick(item)}
            >
              <div
                className={`main-navbar--item ${
                  activeNavbarItem === item.title ? "active" : ""
                }`}
              >
                {activeNavbarItem === item.title
                  ? item.activeIcon
                  : item.defaultIcon}
              </div>
            </Tooltip>
          ))}
        </div>

        {/* Right navbar */}
        <div className="right-navbar">
          <Tooltip title="Messenger" onClick={handleToggleChatList}>
            <div className="right-navbar--item">
              <i className="fa-brands fa-facebook-messenger"></i>
              <CustomBadge
                badgeContent={arrivalSenderIds.length}
                color="primary"
              ></CustomBadge>
            </div>
          </Tooltip>
          <ChatList />
          <Tooltip title="Thông báo" onClick={handleToggleNotiList}>
            <div className="right-navbar--item">
              <i className="fa-solid fa-bell"></i>
              <CustomBadge
                badgeContent={arrivalNotifications?.length}
                color="primary"
              ></CustomBadge>
            </div>
          </Tooltip>
          {showNoti && <NotificationList />}

          <Tooltip title="Tài khoản">
            <Avatar src={user?.avatar}></Avatar>
          </Tooltip>
        </div>
      </Stack>
    </AppBar>
  );
}
