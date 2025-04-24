import moment from "moment";
import "moment/locale/vi";

// Thiết lập ngôn ngữ mặc định là tiếng Việt
moment.locale("vi");

export default moment;

export const formatSmartTime = (date) => {
  const now = moment();
  const inputDate = moment(date);

  const diffInDays = now.diff(inputDate, "days");

  const relativeTime = inputDate.fromNow();

  if (diffInDays < 7) {
    // Nếu thời gian là "vài giây trước" hoặc "một phút trước"
    if (relativeTime === "vài giây trước") {
      return ""; // trả về chuỗi rỗng
    }

    if (relativeTime === "một phút trước") {
      return "1 phút trước"; // chuyển thành "1 phút trước"
    }

    // Nếu cách dưới 7 ngày → relative time
    return relativeTime; // ví dụ: "2 giờ trước"
  } else {
    // Nếu cách trên 7 ngày → định dạng chuẩn
    return inputDate.format("DD MMMM, YYYY"); // ví dụ: "12 Tháng Tư, 2024"
  }
};

export const formatFlexibleTime = (date) => {
  const inputDate = moment(date);
  const startOfToday = moment().startOf("day");
  const oneWeekAgo = moment().subtract(7, "days");

  if (inputDate.isSameOrAfter(startOfToday)) {
    // Sau 0h hôm nay
    return inputDate.format("HH:mm");
  } else if (inputDate.isAfter(oneWeekAgo)) {
    // Trong vòng 1 tuần, trước hôm nay
    return inputDate.format("dddd - HH:mm");
  } else {
    // Trước 1 tuần
    return inputDate.format("HH:mm - DD/MM/YYYY");
  }
};
