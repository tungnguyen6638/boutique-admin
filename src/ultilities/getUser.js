import { redirect } from "react-router-dom";

// Lấy cookie theo tên
export function getCookie(cname) {
  let name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Hàm để phục vụ việc lấy user trong cookies
export function getUser() {
  const currentUser =
    getCookie("username").length !== 0 ||
    getCookie("email").length !== 0 ||
    getCookie("password").length !== 0 ||
    getCookie("role").length !== 0
      ? {
          username: getCookie("username"),
          email: getCookie("email"),
          password: getCookie("password"),
          role: getCookie("role"),
        }
      : null;

  return currentUser;
}

// Hàm để kiểm tra việc có user login ko, nếu không có thì sẽ điều hướng trang đang truy cập về trang chủ
// (Route protection)
export function checkAuth() {
  const user = getUser();

  if (!user) {
    return redirect("/login");
  }
  return null;
}
