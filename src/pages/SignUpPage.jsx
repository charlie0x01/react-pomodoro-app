import React, { useContext } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import app from "../firebase";
import UserContext from "../context/UserContext";

const initialValues = {
  email: "",
  password: "",
};

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("kindly enter email to sign up"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const SignUpPage = () => {
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const formik = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          handleLogin(user.accessToken);
          toast.success("Sign Up Successfully");
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
          <h1 className="title has-text-centered">Sign Up</h1>
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
                  Sign Up
                </button>
              </div>
            </div>
            <div>
              Already Have Account?{" "}
              <Link to="/login" classNameName="link">
                Login Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
