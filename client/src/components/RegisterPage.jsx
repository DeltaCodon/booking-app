import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function registerUser(ev) {
    ev.preventDefault();
    try {
      axios.post("/register", {
        name,
        email,
        password,
      });
    } catch (error) {
      alert("Registration failed. Please try again later.");
      console.log(error);
    }
  }

  return (
    <div className="mt-2 flex grow justify-around">
      <div className="mt-20  w-full">
        <h1 className="text-4xl text-center mb-4 text-themeGold">Register</h1>
        <form
          className="flex flex-col max-w-md mx-auto"
          onSubmit={registerUser}
        >
          <input
            type="text"
            placeholder="First and last name"
            className=""
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder={"something@domain.com"}
            className=""
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder={"*******"}
            className=""
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button className="bg-themeBlue w-[150px] rounded-md self-center text-center">
            Sign-Up
          </button>
          <div className="text-center py-2 text-slate-600">
            Already have an account?{" "}
            <Link className="underline text-gray-500" to={"/login"}>
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
