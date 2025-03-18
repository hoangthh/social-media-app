import axios from "axios";

const URL = "https://socialmedia-rvz4.onrender.com";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const fetchPosts = () => axiosInstance.get(`/api/posts`);

export const createPost = async (userId, content, attachment) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    if (attachment) {
      formData.append("attachment", attachment);
    }
    const res = await axiosInstance.post(`/api/posts/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("create post: ", res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchReactionByPostId = async (postId) => {
  try {
    const res = await axiosInstance.get(`/api/reaction/post/${postId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createReactionPost = async (postId, userId, reactionType) => {
  try {
    const res = await axiosInstance.post(`/api/reaction/post`, {
      postId: postId,
      userId: userId,
      reactionType: reactionType,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchComments = async (postId) => {
  const res = await axiosInstance.get(`/api/comments/${postId}`);

  return res.data;
};

export const createComment = async (userId, postId, comment) => {
  try {
    const res = await axiosInstance.post(`/api/comments/`, {
      userId,
      postId,
      comment,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUser = async () => {
  try {
    const res = await axiosInstance.get(`/api/users/me`, {
      withCredentials: true,
    });

    if (res.status !== 200) return null;

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchChatsByUserId = async (userId) => {
  const res = await axiosInstance.get(`/api/chats/${userId}`);
  return res.data;
};

export const createChat = async (senderId, receiverId) => {
  const res = await axiosInstance.post(`/api/chats`, {
    senderId,
    receiverId,
  });
  return res.data;
};

export const searchUsersByName = async (name) => {
  try {
    const res = await axiosInstance.get(`/api/users/search?name=${name}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserByUserId = async (userId) => {
  try {
    const res = await axiosInstance.get(`/api/users/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMessagesByChatId = async (chatId) => {
  const res = await axiosInstance.get(`/api/messages/${chatId}`);
  return res.data;
};

export const sendMessage = async (message) => {
  const res = await axiosInstance.post(`/api/messages`, message);
  return res.data;
};

export const fetchFriendsByUserId = async (userId) => {
  try {
    const res = await axiosInstance.get(`/api/friends/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMutualFriends = async (userId) => {
  try {
    const res = await axiosInstance.get(`/api/friends/mutual/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createFriendRequest = async (senderId, receiverId) => {
  try {
    const res = await axiosInstance.post(`/api/friends`, {
      senderId,
      receiverId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const acceptFriendRequest = async (requestId) => {
  try {
    const res = await axiosInstance.put(`/api/friends/${requestId}`, {
      status: "accepted",
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFriendRequest = async (requestId) => {
  try {
    const res = await axiosInstance.delete(`/api/friends/${requestId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchNotifications = async (userId) => {
  try {
    const res = await axiosInstance.get(`/api/notifications/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createNotification = async (
  senderId,
  receiverId,
  type,
  message
) => {
  try {
    const res = await axiosInstance.post(`/api/notifications`, {
      senderId,
      receiverId,
      type,
      message,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
