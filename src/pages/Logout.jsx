import { redirect } from "react-router-dom";

export function action() {
  // Xóa cookies
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  return redirect("/");
}
