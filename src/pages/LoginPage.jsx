import React, { useContext } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import app from "../firebase";
import UserContext from "../context/UserContext";

const initialValues = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("kindly enter email to sign up"),
  password: Yup.string().required("No password provided."),
});

const SignUpPage = () => {
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          handleLogin(user.accessToken);
          toast.success("Login Successfully");
          navigate("/");
          // ...
        })
        .catch((error) => {
          toast.error(error.message);
          // ..
        });
    },
  });
  return (
    <div
      className="is-flex is-justify-content-center is-align-items-center"
      style={{ height: "80vh" }}
    >
      <div className="column is-half" style={{ maxWidth: 400 }}>
        <div className="box">
          <h1 className="title has-text-centered">Login</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  required
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  required
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.errors.password && formik.touched.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="field">
              <div className="control">
                <button
                  type="submit"
                  className="button is-primary is-fullwidth"
                >
                  Login
                </button>
              </div>
            </div>
            <div>
              Already Have Account?{" "}
              <Link to="/signup" classNameName="link">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
