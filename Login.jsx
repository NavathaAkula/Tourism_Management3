import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import videoSrc from '../assets/images/1.mp4';


const Login = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error state to store error messages
  const navigate = useNavigate(); // For navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Basic email and password validation
    if (!email || !password) {
      setError("Both fields are required.");
      return; // Prevent further execution if validation fails
    }

    try {
      // Send login request to the backend API to validate email and password
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
   
      const data = await res.json();

      // If login is successful
      if (res.status === 200 && data.success) {
        // Save the user ID to localStorage or sessionStorage
        localStorage.setItem("userId", data.userId); // Assuming data.userId contains the user ID from backend
        navigate("/home"); // Redirect to home page (or dashboard)
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="relative h-screen w-full">
    <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    src={videoSrc}
    autoPlay
    loop
    muted
  ></video>


<div className="relative flex justify-center items-center h-full right-200px">
  <div className="flex flex-col border  rounded-lg p-6 w-full max-w-sm sm:w-[320px] bg-white bg-opacity-50 shadow-md">

        <h1 className="text-3xl text-center font-semibold">Login</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="p-3 rounded border border-black bg-white bg-opacity-80"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="font-semibold">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="p-3 rounded border border-black bg-white bg-opacity-80"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <p className="text-blue-700 text-sm hover:underline">
                <Link to={`/signup`}>Don't have an account? Signup</Link>
            </p>
            <button
                type="submit"
                className="p-3 text-white bg-slate-700 rounded hover:opacity-95"
            >
                Submit
            </button>
        </form>
    </div>
</div>
</div>


   
  );
};

export default Login;
