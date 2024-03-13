// Hàm lấy các URL để fetch
export function fetchURL(functionality, params) {
  const serverDomain = "http://52.41.36.82";
  let url = serverDomain;
  switch (functionality) {
    case "GET_PRODUCTS":
      url += "/shop/products";
      break;
    case "PUT_EDIT_PRODUCT":
      url += `/admin/edit-product/${params}`;
      break;
    case "DELETE_PRODUCT":
      url += `/admin/delete-product/${params}`;
      break;
    case "POST_ADD_PRODUCT":
      url += "/admin/add-product";
      break;
    case "POST_LOGIN":
      url += "/auth/login";
      break;
    case "POST_SIGNUP":
      url += "/auth/signup";
      break;
    case "FIND_USER":
      url += `/auth/find/${params}`;
      break;
    case "ASSIGN_ROLE":
      url += `/auth/assign-role`;
      break;
    case "GET_ORDERS":
      url += `/shop/orders`;
      break;
    case "GET_ORDER":
      url += `/shop/order/${params}`;
      break;
    case "IMAGE_URL":
      url += `/images/${params}`;
      break;
    case "UPDATE_AMOUNT":
      url += `/admin/update-amount/${params}`;
      break;
    case "GET_CHAT_ROOMS":
      url += `/support/chat-rooms`;
      break;
    case "GET_CHAT_ROOM":
      url += `/support/chat-room/${params}`;
      break;
    default:
      break;
  }

  return url;
}

// Hàm hỗ trợ fetch data
export async function fetchData(requestContent) {
  const res = await fetch(requestContent.url, {
    method: requestContent.method ? requestContent.method : "GET",
    headers: requestContent.headers ? requestContent.headers : {},
    body: requestContent.body ? requestContent.body : null,
  });

  // Nếu res không ok thì sẽ trả về 1 Object có chứa message và biến hasError để xử lý error
  if (!res.ok) {
    return { message: res.statusText, hasError: true };
  } else {
    return await res.json();
  }
}
