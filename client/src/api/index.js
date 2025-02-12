import axios from "axios";

const URL = "http://localhost:5000";

export const fetchPosts = () => axios.get(`${URL}/posts`);

export const createPost = (formData) =>
  axios.post(`${URL}/posts/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reactPost = async (userId, postId, reactionType) => {
  const res = await axios.post(`${URL}/posts/react`, {
    userId: userId,
    postId: postId,
    reactionType: reactionType,
  });

  return res;
};

export const fetchUser = async () => {
  const res = await axios.get(`${URL}/user`, {
    withCredentials: true,
  });

  return res;
};

export const fetchChatsByUserId = async (userId) => {
  const res = await axios.get(`${URL}/chats/${userId}`);
  return res.data;
};

export const searchUserByName = async (name) => {
  const res = await axios.get(`${URL}/user/search?name=${name}`);
  return res;
};

export const fetchUserByUserId = async (userId) => {
  const res = await axios.get(`${URL}/user/${userId}`);
  return res.data;
};

export const fetchMessagesByChatId = async (chatId) => {
  const res = await axios.get(`${URL}/messages/${chatId}`);
  return res.data;
};

export const sendMessage = async (message) => {
  const res = await axios.post(`${URL}/messages`, message);
  return res.data;
};
