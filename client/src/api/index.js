import axios from "axios";

const URL = "http://localhost:5000";

export const fetchPosts = () => axios.get(`${URL}/posts`);
export const createPost = (formData) =>
  axios.post(`${URL}/posts/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const fetchUser = async () => {
  const res = await axios.get(`${URL}/user`, {
    withCredentials: true,
  });

  return res;
};
export const reactPost = async (userId, postId, reactionType) => {
  const res = await axios.post(`${URL}/posts/react`, {
    userId: userId,
    postId: postId,
    reactionType: reactionType,
  });

  return res;
};
