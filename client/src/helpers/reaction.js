export const reactions = [
  {
    title: "Thích",
    type: "like",
    className: "like-icon",
    icon: "/like-icon.png",
    src: "/reaction-like.gif",
  },
  {
    title: "Yêu thích",
    type: "favourite",
    className: "favourite-icon",
    icon: "/favourite-icon.png",
    src: "/reaction-favourite.gif",
  },
  {
    title: "Haha",
    type: "haha",
    className: "haha-icon",
    icon: "/haha-icon.png",
    src: "/reaction-haha.gif",
  },
  {
    title: "Wow",
    type: "wow",
    className: "wow-icon",
    icon: "/wow-icon.png",
    src: "/reaction-wow.gif",
  },
  {
    title: "Buồn",
    type: "sad",
    className: "sad-icon",
    icon: "/sad-icon.png",
    src: "/reaction-sad.gif",
  },
  {
    title: "Phẫn nộ",
    type: "angry",
    className: "angry-icon",
    icon: "/angry-icon.png",
    src: "/reaction-angry.gif",
  },
];

// Hàm tìm kiếm Reaction theo Type
export const findReactionByType = (type) => {
  return reactions.find((reaction) => reaction.type === type);
};
