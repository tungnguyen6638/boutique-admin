import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";
import { getUser } from "../../ultilities/getUser";

const RootLayout = () => {
  return (
    <>
      <main className="bg-light">
        <div className="d-sm-flex">
          <NavBar />
          <section className="flex-fill mx-5">
            <Outlet />
          </section>
        </div>
      </main>
    </>
  );
};

export function loader() {
  const user = getUser();
  return { user: user };
}

export default RootLayout;
