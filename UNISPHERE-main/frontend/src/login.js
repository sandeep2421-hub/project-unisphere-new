import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsCheckd] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.get("http://localhost:5001/users");
    const user = res.data.find((user) => (user.email === email || user.username === email) && user.password === password);

    if (!isChecked) {
      alert("You must accept the terms and conditions!");
      return;
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      alert("Login Successful!");
      if (!user.detailsFilled) {
        navigate("/details");
      } else {
        navigate("/home");
      }
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="Login">
      <div className="rg">
        <div className="topnav">
          <a className="active" href="/">Home</a>
          <a href="">News</a>
          <a href="">Contact</a>
          <a href="">About</a>
        </div>
        <h1>User Login...</h1>
        <form onSubmit={handleLogin}>


          <div className="input-box">
            <input type="text" placeholder="Username / Email" required onChange={(e) => setEmail(e.target.value)} />
            <i class='bx bxs-user'></i>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
            <i class='bx bxs-lock-alt'></i>
          </div>

          <div className="rem-forgot">
            <label><input type="checkbox" checked={isChecked} onChange={() => setIsCheckd(!isChecked)} />Terms and Conditions Agreed</label>
            <a href="/fp"><Link to="/fp">Forgot Password!</Link></a>
          </div>

          <button type="submit" className="btn">Login</button>


          <div className="register-link">
            <p>Don't have an account? <a href="/reg">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
