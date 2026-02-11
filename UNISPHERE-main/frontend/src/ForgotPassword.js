import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [maskedPhone, setMaskedPhone] = useState("");
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUsernameSubmit = async () => {
        try {
            const response = await axios.get("http://localhost:5001/users");
            const foundUser = response.data.find(u => u.username === username);
            if (foundUser) {
                setUser(foundUser);
                const masked = `${foundUser.phone.slice(0, 2)}*****${foundUser.phone.slice(-2)}`;
                setMaskedPhone(masked);
                setStep(2);
            } else {
                alert("Username not found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handlePhoneSubmit = () => {
        if (user.phone === phone) {
            setStep(3);
        } else {
            alert("Phone number does not match!");
        }
    };
    const navigate = useNavigate();
    const handlePasswordSubmit = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await axios.patch(`http://localhost:5001/users/${user.id}`, {
                password: newPassword,
            });
            alert("Password successfully updated!");
            setStep(1);
            setUsername("");
            setPhone("");
            setNewPassword("");
            setConfirmPassword("");
            navigate("/login");
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };


    return (
        <div className="forgot-password-container">
            <div className="nt">
                <h1><a href="/login">Login</a></h1>
            </div>
            <h2>Forgot Password</h2>
            {step === 1 && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleUsernameSubmit}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <p>Verify your phone number: {maskedPhone}</p>
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button onClick={handlePhoneSubmit}>Verify</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
