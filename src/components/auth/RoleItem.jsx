import { fetchData, fetchURL } from "../../ultilities/fetchUrl";
import { getUser } from "../../ultilities/getUser";
import { useNavigate } from "react-router-dom";

const RoleItem = ({ user }) => {
  const currentUser = getUser();
  const navigate = useNavigate();

  const assignRoleHandler = async (userId) => {
    // Tìm value của checkbox để lấy role
    const assignedRoles = document.getElementsByName(`btnradio${userId}`);
    let assignedRole = "";
    for (let i = 0, length = assignedRoles.length; i < length; i++) {
      if (assignedRoles[i].checked) {
        assignedRole = assignedRoles[i].value;
        break;
      }
    }

    // Fetch đến API để assign role
    const res = await fetchData({
      url: fetchURL("ASSIGN_ROLE"),
      method: "PUT",
      body: JSON.stringify({
        email: currentUser.email,
        password: currentUser.password,
        role: currentUser.role,
        assignedId: userId,
        assignedRole: assignedRole,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.hasError) {
      window.alert(res.message);
    } else {
      window.alert(res.message);
      navigate("/");
    }
  };
  return (
    <>
      <tr>
        <td>{user.email}</td>
        <td>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              assignRoleHandler(user._id);
            }}
          >
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name={`btnradio${user._id}`}
                id={user._id + "1"}
                autoComplete="off"
                defaultValue="admin"
                defaultChecked={user.role === "admin"}
              />
              <label
                className="btn btn-outline-warning"
                htmlFor={user._id + "1"}
              >
                Admin
              </label>

              <input
                type="radio"
                className="btn-check"
                name={`btnradio${user._id}`}
                id={user._id + "2"}
                autoComplete="off"
                defaultValue="supporter"
                defaultChecked={user.role === "supporter"}
              />
              <label
                className="btn btn-outline-warning"
                htmlFor={user._id + "2"}
              >
                Supporter
              </label>

              <input
                type="radio"
                className="btn-check"
                name={`btnradio${user._id}`}
                id={user._id + "3"}
                autoComplete="off"
                defaultValue="client"
                defaultChecked={user.role === "client"}
              />
              <label
                className="btn btn-outline-warning"
                htmlFor={user._id + "3"}
              >
                Client
              </label>
            </div>

            <button className="btn btn-warning ms-3">Assign</button>
          </form>
        </td>
      </tr>
    </>
  );
};

export default RoleItem;
