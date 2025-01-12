import React from "react";
import { TextField, AppBar, Box, Stack, styled, Avatar } from "@mui/material";
import {} from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import "./Header.scss";

export default function Header() {
  return (
    <AppBar
      position="static"
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
            placeholder="Tìm kiếm"
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
          <div className="main-navbar--item">
            <HomeOutlinedIcon />
          </div>
          <div className="main-navbar--item">
            <OndemandVideoOutlinedIcon />
          </div>
          <div className="main-navbar--item">
            <SportsEsportsOutlinedIcon />
          </div>
          <div className="main-navbar--item">
            <StorefrontOutlinedIcon />
          </div>
          <div className="main-navbar--item">
            <Diversity3OutlinedIcon />
          </div>
        </div>

        {/* Right navbar */}
        <div className="right-navbar">
          <div className="right-navbar--item">
            <i className="fa-brands fa-facebook-messenger"></i>
          </div>
          <div className="right-navbar--item">
            <i className="fa-solid fa-bell"></i>
          </div>

          <Avatar></Avatar>
        </div>
      </Stack>
    </AppBar>
  );
}
