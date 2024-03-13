import { Link, Form, useActionData, redirect } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticateActions } from "../../store/authenticateSlice";
import { useRef } from "react";
import { fetchURL, fetchData } from "../../ultilities/fetchUrl";

const SignupForm = () => {
  const data = useActionData();

  // Tạo dispatch
  const dispatch = useDispatch();
  // Lấy các state trong redux để cho việc validate
  const nameIsValid = useSelector((state) => state.authenticate.nameIsValid);
  const emailIsValid = useSelector((state) => state.authenticate.emailIsValid);
  const passwordIsValid = useSelector(
    (state) => state.authenticate.passwordIsValid
  );
  const phoneIsValid = useSelector((state) => state.authenticate.phoneIsValid);
  const nameIsTouched = useSelector(
    (state) => state.authenticate.nameIsTouched
  );
  const emailIsTouched = useSelector(
    (state) => state.authenticate.emailIsTouched
  );
  const passwordIsTouched = useSelector(
    (state) => state.authenticate.passwordIsTouched
  );
  const phoneIsTouched = useSelector(
    (state) => state.authenticate.phoneIsTouched
  );

  // Tạo ref để lấy giá trị input
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  return (
    <>
      <div className={`py-5`}>
        <div
          className={`container d-flex align-items-center justify-content-center`}
        >
          <div className={`py-5 w-50 text-center ${styles["form"]}`}>
            <h2 className={`py-3 ${styles["form-header"]}`}>Sign Up</h2>

            <Form method="post" className="px-5">
              <div className="my-3">
                <input
                  type="text"
                  className="form-control signup-form-input"
                  placeholder="Full Name"
                  name="full-name"
                  ref={nameRef}
                  onFocus={() =>
                    dispatch(authenticateActions.setNameIstouched())
                  }
                  onBlur={() =>
                    dispatch(
                      authenticateActions.fullnameValidation(
                        nameRef.current.value
                      )
                    )
                  }
                />
                {!nameIsValid && !nameIsTouched && (
                  <p className="text-danger">Name is not valid</p>
                )}
              </div>
              <div className="my-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                  onFocus={() => {
                    dispatch(authenticateActions.setEmailIsTouched());
                  }}
                  onBlur={() =>
                    dispatch(
                      authenticateActions.emailValidation(
                        emailRef.current.value
                      )
                    )
                  }
                />
                {!emailIsValid && !emailIsTouched && (
                  <p className="text-danger">Email is invalid</p>
                )}
              </div>
              <div className="my-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  ref={passwordRef}
                  onFocus={() =>
                    dispatch(authenticateActions.setPasswordIsTouched())
                  }
                  onBlur={() =>
                    dispatch(
                      authenticateActions.passwordValidation(
                        passwordRef.current.value
                      )
                    )
                  }
                />
                {!passwordIsValid && !passwordIsTouched && (
                  <p className="text-danger">
                    Password must be greater than 8 characters
                  </p>
                )}
              </div>
              <div className="my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  ref={phoneRef}
                  onFocus={() =>
                    dispatch(authenticateActions.setPhoneIsTouched())
                  }
                  onBlur={() =>
                    dispatch(
                      authenticateActions.phoneValidation(
                        phoneRef.current.value
                      )
                    )
                  }
                />
                {!phoneIsValid && !phoneIsTouched && (
                  <p className="text-danger">
                    Please enter correct phone number
                  </p>
                )}
              </div>
              <div className={styles["btn-signup"]}>
                {data && <p className="text-danger">{data.errMessage}</p>}
                <button className={`btn py-2 d-block w-100 my-5`}>
                  Sign up
                </button>
              </div>

              <p className={styles["navigate"]}>
                Already have an account ? <Link to="/login">Click</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;

// Tạo action cho Route
export async function action({ request, params }) {
  const req = await request.formData();
  const user = {
    username: req.get("full-name"),
    email: req.get("email"),
    password: req.get("password"),
    phone: req.get("phone"),
    role: "admin",
  };

  const res = await fetchData({
    url: fetchURL("POST_SIGNUP"),
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.hasError) {
    return { errMessage: res.message };
  } else {
    // Xuất thông báo đăng kí thành công
    window.alert(res.message);
    // Điều hướng tới trang login
    return redirect("/login");
  }
}
