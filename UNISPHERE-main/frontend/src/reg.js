import React from "react";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsCheckd] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = { name,username,email,phone,password,detailsFilled: false, details: {} };

    if (!isChecked) {
      alert("You must accept the information provided is correct!");
      return;
    }
    
    const res = await axios.get("http://localhost:5001/users");
    const emailExists = res.data.find((user) => user.email === email);
    const userExists = res.data.find((user) => user.username === username);

    if (userExists) {
      alert("User already registered!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (emailExists) {
      alert("Email already registered!");
      return;
    }
    
    await axios.post("http://localhost:5001/users", newUser);
    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="REg">
      <div className="th">
        <div className="tonav">
          <a className="" href="/">Home</a>
          <a className="active" href="/login">Login</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </div>
        <h1>Registration</h1>
        <form onSubmit={handleRegister}>
          <div className="inputs">
            <div className="input-feild">
              <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} />
              <i class='bx bxs-user'></i>

            </div>
            <div className="input-feild">
              <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
              <i class='bx bxs-user'></i>

            </div>
            <div className="input-feild">
              <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
              <i class='bx bxs-envelope'></i>

            </div>
            <div className="input-feild">
              <input type="number" placeholder="Phone Number" required onChange={(e) => setPhone(e.target.value)} />
              <i class='bx bxs-phone'></i>

            </div>
            <div className="input-feild">
              <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
              <i class='bx bxs-lock-alt'></i>

            </div>
            <div className="input-feild">
              <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
              <i class='bx bxs-lock-alt'></i>

            </div>
          </div>
          <label>
            <input type="checkbox" checked={isChecked} onChange={()=>setIsCheckd(!isChecked)}/>I hereby declare that the above
            information provided is true and correct
          </label>
          <button type="submit" className="btn1">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
