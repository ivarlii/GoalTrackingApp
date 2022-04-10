import { Link } from "react-router-dom";
import "./style/RegisterComponent.css";

const RegisterComponent = () => {
  return (
    <div className="register-wrapper">
      <div className="register-left-side"></div>
      <div className="register-right-side">
        Register page
        <Link to="/">Back to login</Link>
      </div>
    </div>
  );
};

export default RegisterComponent;
