import { useState } from "react";
import { fetchData, fetchURL } from "../ultilities/fetchUrl";
import { getUser } from "../ultilities/getUser";
import RoleItem from "../components/auth/RoleItem";

const Role = () => {
  const user = getUser();
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);

  const findUserHandler = async (e) => {
    e.preventDefault();
    const keyword = e.target.email.value;

    // Gọi API tìm User với keyword
    const res = await fetchData({
      url: fetchURL("FIND_USER", keyword),
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        role: user.role,
        keyword: keyword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.hasError) {
      setError(res.message);
    } else {
      setError(null);
      setUserList([...res.user]);
    }
  };

  return (
    <>
      <div className="my-5">
        <form onSubmit={findUserHandler}>
          <div className="mb-3">
            <input
              className="form-control"
              name="email"
              placeholder="Enter user email to assign role"
            />
          </div>
          <div>
            <button className="btn btn-success">Find</button>
          </div>
        </form>
      </div>

      <div className="my-5 overflow-auto">
        {error && <p className="text-center text-danger">{error}</p>}
        {userList.length !== 0 && (
          <table className="table">
            <thead className="table-warning">
              <tr>
                <th>User Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <RoleItem key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Role;
