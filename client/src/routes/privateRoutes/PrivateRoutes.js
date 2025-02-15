import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import * as api from "../../api";

export default function PrivateRoutes() {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.fetchUser();

      if (user) {
        setIsLogin(true);
        dispatch(actions.getUser.getUserSuccess(user));
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading)
    return (
      <p>
        You have to <a href="/login">login</a>
      </p>
    );

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
