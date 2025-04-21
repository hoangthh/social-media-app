import React from "react";
import "./Login.scss";
import { Button, styled, TextField } from "@mui/material";

const LoginButton = styled(Button)`
  width: 100%;
  padding: 10px 0;
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  color: #fff;
  background-color: rgb(0, 119, 255);
  border: none;
  border-radius: 5px;
  text-transform: none;
`;

const CreateAccountButton = styled(Button)`
  width: 80%;
  padding: 10px 0;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background-color: rgb(4, 190, 4);
  border: none;
  border-radius: 5px;
  text-transform: none;
`;

const GoogleButton = styled(Button)`
  width: 100%;
  font-size: 15px;
  margin-top: 20px;
  color: black;
  background-color: #fff;
  border: none;
  border-radius: 25px;
  text-transform: none;

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const FacebookButton = styled(Button)`
  width: 100%;
  font-size: 15px;
  margin-top: 20px;
  color: #fff;
  background-color: rgb(0, 110, 255);
  border: none;
  border-radius: 25px;
  text-transform: none;

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

export default function Login() {
  const handleLoginGoogle = () => {
    // Chuyển hướng đến backend để bắt đầu quy trình OAuth
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/google`;
  };

  const handleLoginFacebook = () => {
    // Chuyển hướng đến backend để bắt đầu quy trình OAuth
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/facebook`;
  };

  return (
    <div className="login">
      {/* Heading left */}
      <div className="login--heading">
        <h5 className="login--heading__main">facebook</h5>
        <p
          className="login--heading__sub"
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
        >
          Facebook giúp bạn kết nối và chia sẻ
          <br /> với mọi người trong cuộc sống của bạn
        </p>
      </div>

      {/* Form right */}
      <form className="login--form">
        <TextField variant="outlined" label="Email" sx={{ width: "100%" }} />
        <TextField
          variant="outlined"
          label="Mật khẩu"
          sx={{ width: "100%", marginTop: 2 }}
        />
        <LoginButton variant="contained">Đăng nhập</LoginButton>
        <div className="login--form__forgot-password">
          <a className="login--form__forgot-password--a" href="/">
            Quên mật khẩu?
          </a>
        </div>
        <CreateAccountButton variant="contained">
          Tạo tài khoản mới
        </CreateAccountButton>
        <span style={{ marginTop: 20 }}>hoặc</span>
        <GoogleButton variant="contained" onClick={handleLoginGoogle}>
          <img src="/google-logo.webp" alt="google-logo" />
          Đăng nhập với Google
        </GoogleButton>

        <FacebookButton variant="contained" onClick={handleLoginFacebook}>
          <img src="/facebook-logo.webp" alt="google-logo" />
          Đăng nhập với Facebook
        </FacebookButton>

        {/* Footer bottom */}
        <div className="login--footer">
          <a href="/" className="login--footer__create-page">
            Tạo Trang
          </a>

          <p className="login--footer__heading">
            dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
          </p>
        </div>
      </form>
    </div>
  );
}
