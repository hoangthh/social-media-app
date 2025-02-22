import { FriendModel } from "../models/friendModel.js";
import { UserModel } from "../models/userModel.js";

// Gửi lời mời kết bạn
export const createFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Kiểm tra xem lời mời đã tồn tại chưa
    const existingRequest = await FriendModel.findOne({
      senderId,
      receiverId,
    });
    if (existingRequest) return res.status(400).json("Lời mời đã tồn tại");

    // Tạo lời mời mới
    const newRequest = await FriendModel.create({
      senderId,
      receiverId,
    });
    res.status(200).json(newRequest);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Thay đổi lời mời kết bạn
export const updateFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!status || status !== "accepted")
      return res.status(404).json("Invalid status");

    const request = await FriendModel.findById(requestId);

    if (!request) return res.status(404).json("Missing friend request");

    request.status = status;

    await request.save();

    res.status(200).json(request);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy danh sách bạn bè
export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    // const friends = await FriendModel.find({
    //   $or: [{ senderId: userId }, { receiverId: userId }],
    //   status: "accepted",
    // }).populate("senderId receiverId", "name avatar");
    const friends = await FriendModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
      // status: "accepted",
    });

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMutualFriends = async (req, res) => {
  try {
    const userId1 = req.user.userId; // Người dùng hiện tại
    const userId2 = req.params.userId; // Người dùng cần so sánh

    // Lấy danh sách bạn bè của userId1
    const friendsOfUser1 = await FriendModel.find({
      $or: [{ senderId: userId1 }, { receiverId: userId1 }],
      status: "accepted",
    });

    // Lấy danh sách bạn bè của userId2
    const friendsOfUser2 = await FriendModel.find({
      $or: [{ senderId: userId2 }, { receiverId: userId2 }],
      status: "accepted",
    });

    // Chuyển danh sách bạn bè thành mảng ID
    const friendsId1 = friendsOfUser1.map((f) =>
      f.senderId.toString() !== userId1
        ? f.senderId.toString()
        : f.receiverId.toString()
    );
    const friendsId2 = friendsOfUser2.map((f) => {
      return f.senderId.toString() !== userId2
        ? f.senderId.toString()
        : f.receiverId.toString();
    });

    // Tìm những người có trong cả hai danh sách
    const mutualFriendIds = friendsId2.filter((id) => friendsId1.includes(id));

    const mutualFriends = await Promise.all(
      mutualFriendIds.map(async (id) => await UserModel.findById(id))
    );

    res.status(200).json(mutualFriends);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Xóa lời mời bạn bè
export const deleteFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const friendRequest = await FriendModel.findByIdAndDelete(requestId);

    if (!friendRequest) {
      return res.status(404).json("Missing friend request");
    }

    res.status(200).json("Delete friend request successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
