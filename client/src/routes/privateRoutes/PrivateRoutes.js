import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import * as api from "../../api";
import Header from "../../components/Header/Header";
import { useSocket } from "../../socket/SocketProvider";
import { convertToPascalCase } from "../../helpers/string";

export default function PrivateRoutes() {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const { socket } = useSocket();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.fetchUser();

      if (user) {
        const formatUser = { ...user, name: convertToPascalCase(user.name) };
        setIsLogin(true);
        dispatch(actions.getUser.getUserSuccess(formatUser));
        setLoading(false);

        // Thêm user hiện tại vào danh sách user online của server
        socket?.emit("addUser", user._id);
      } else {
        navigate("/login", { replace: true });
      }
    };

    fetchUser();
  }, [dispatch, navigate, socket]);

  if (loading)
    return (
      <p>
        Loading to <a href="/login">login</a> ...
      </p>
    );

  return isLogin ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
