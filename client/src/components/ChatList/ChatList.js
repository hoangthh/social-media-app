import React, { useEffect, useState } from "react";
import "./ChatList.scss";
import { Avatar, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { hideChatList, showChatWindow } from "../../redux/actions";
import { chatListState$, userState$ } from "../../redux/selectors";
import Chat from "./Chat/Chat";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector(userState$);
  const { isShow } = useSelector(chatListState$);

  useEffect(() => {
    const getChats = async () => {
      const res = await api.fetchChatsByUserId(currentUser._id);
      setChats(res);
    };
    getChats();
  }, [currentUser]);

  useEffect(() => {
    if (searchValue === "") {
      setSearchResult(null);
      return;
    }

    const delaySearch = setTimeout(async () => {
      const res = await api.searchUsersByName(searchValue);
      setSearchResult(res);
    }, 500); // Đợi 300ms trước khi gọi API

    return () => clearTimeout(delaySearch); // Xóa timeout khi searchValue thay đổi trước khi hết thời gian chờ
  }, [searchValue]);

  const handleSelectChat = (receiverId, chatId, chat) => {
    dispatch(hideChatList());
    dispatch(showChatWindow({ receiverId, chatId, chat }));
  };

  return (
    <div className={`chat-list ${isShow ? "show" : "hide"}`}>
      {/* Header */}
      <div className="chat-list--header">
        <p className="chat-list--header__p">Đoạn chat</p>
        <p>...</p>
      </div>

      {/* Search */}
      <TextField
        id="search-input"
        placeholder="Tìm kiếm trên Messenger"
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
          margin: "15px 0",
          width: "100%",
          background: "#f0f2f5",
          borderRadius: "20px",
          border: "none",
          outline: "none",
        }}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* Chat List */}
      {chats.map((chat) => {
        const chatUserId = chat.members.find(
          (member) => member !== currentUser._id
        );
        return (
          <div
            key={chat._id}
            onClick={() => handleSelectChat(chatUserId, chat._id, chat)}
          >
            <Chat chat={chat} />
          </div>
        );
      })}

      {/* Chat People */}
      {searchResult &&
        searchResult?.map((item, index) => (
          <div
            className="chat-list--item"
            key={index}
            onClick={() => handleSelectChat(item?._id)}
          >
            <Avatar src={item?.avatar} />
            <div className="chat-list--item--info">
              <p className="chat-list--item--info__header">{item?.name}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
