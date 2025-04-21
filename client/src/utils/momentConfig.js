import moment from "moment";
import "moment/locale/vi";

// Thiết lập ngôn ngữ mặc định là tiếng Việt
moment.locale("vi");

export default moment;

export const formatSmartTime = (date) => {
  const now = moment();
  const inputDate = moment(date);

  const diffInDays = now.diff(inputDate, "days");

  if (diffInDays < 7) {
    // Nếu cách dưới 7 ngày → relative time
    return inputDate.fromNow(); // ví dụ: "2 giờ trước"
  } else {
    // Nếu cách trên 7 ngày → định dạng chuẩn
    return inputDate.format("DD MMMM, YYYY"); // ví dụ: "12 Tháng Tư, 2024"
  }
};
