import axios from "axios";

const URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const fetchPosts = () => axiosInstance.get(`/api/posts`);

export const createPost = (formData) =>
  axiosInstance.post(`/api/posts/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const fetchReactionByPostId = async (postId) => {
  try {
    const res = await axiosInstance.get(`/api/reaction/post/${postId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createReactionPost = async (postId, userId, reactionType) => {
  const res = await axiosInstance.post(`/api/reaction/post`, {
    postId: postId,
    userId: userId,
    reactionType: reactionType,
  });

  return res.data;
};

export const fetchComments = async (postId) => {
  const res = await axiosInstance.get(`/api/comments/${postId}`);

  return res.data;
};

export const createComment = async (newComment) => {
  const res = await axiosInstance.post(`/api/comments/`, newComment);

  return res.data;
};

export const fetchUser = async () => {
  try {
    const res = await axiosInstance.get(`/api/users/me`);

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
