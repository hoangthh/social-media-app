import React, { useEffect, useState } from "react";
import * as api from "../../../api";

export default function ReactionUser({ reactionUserId, reactionUserCount }) {
  const [reactionUser, setReactionUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const reactionUser = await api.fetchUserByUserId(reactionUserId);
      setReactionUser(reactionUser);
    };

    reactionUserId && fetchUser();
  }, [reactionUserId]);

  return (
    <>
      <p>{reactionUser?.name}</p>
      {/* Nếu số lượng người react nhiều hơn 10 thì thể hiện phần còn lại */}
      {reactionUserCount > 10 && <p>và {reactionUserCount - 10} người khác</p>}
    </>
  );
}
