import "./style/LoginComponent.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import loginImage from "../../assets/images/leaves.jpg";
import logoImage from "../../assets/images/logo.png";
import { login, useAuthDispatch } from "../../_context";

const LoginComponent = () => {
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  let history = useHistory();

  useEffect(() => {
    if (email !== "") {
      setErrors((prevState) => ({ ...prevState, email: false }));
    }
  }, [email]);

  useEffect(() => {
    if (password !== "") {
      setErrors((prevState) => ({ ...prevState, password: false }));
    }
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkSubmit()) {
      return;
    }
    try {
      const loginParams = {
        email: email,
        password: password,
        nickname: "nickname1",
        phone: "+901231231234",
        gender: "female",
      };
      const response = await login(dispatch, loginParams);
      if (!response?.user) {
        return;
      }
      history.push("/home");
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  const checkSubmit = () => {
    const errorList = {
      email: email.length === 0,
      password: password.length === 0,
    };
    setErrors(errorList);
    return Object.keys(errorList).every((e) => !errorList[e]);
  };

  const renderRequiredNotificationLabel = () => {
    return (
      <label style={{ color: "#d94040", marginTop: "-1.5rem" }}>
        This field is required
      </label>
    );
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left-side">
          <div className="login-logo-wrapper">
            <img src={logoImage} id="login-logo" alt="goal-tracking-app-logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={errors.email ? "error" : ""}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && renderRequiredNotificationLabel()}
            <label htmlFor="pwd">Password</label>
            <input
              id="pwd"
              className={errors.password ? "error" : ""}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
            {errors.password && renderRequiredNotificationLabel()}
            <button id="submit_btn" type="submit">
              Login
            </button>
          </form>
          <div className="footer">
            <h4>
              <span>{"Don't have an account?"}</span>
              <Link className="link" to="/register">
                Register now
              </Link>
            </h4>
          </div>
        </div>
        <div className="login-right-side">
          <div className="login-image-wrapper">
            <img
              src={loginImage}
              id="login-image"
              alt="goal-tracking-app-login-image"
            />
            <span className="app-title">Goal Tracking App</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
