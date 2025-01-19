import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { userState$ } from "../../redux/selectors";
import * as api from "../../api/";

export default function PrivateRoutes() {
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(userState$); // user từ Redux
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(actions.getUser.getUserRequest());
      console.log(user);
      if (user) {
        setIsUser(true);
        setLoading(false);
      } else {
        setIsUser(false);
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

  return true ? <Outlet /> : <Navigate to="/login" />;
}
