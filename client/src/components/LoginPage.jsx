import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginHandler(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login Sucessful");
      setRedirect(true);
    } catch (error) {
      alert("Login Failed.");
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-2 flex grow justify-around">
      <div className="mt-20  w-full">
        <h1 className="text-4xl text-center mb-4 text-themeGold">Login</h1>
        <form
          className="flex flex-col max-w-md mx-auto"
          onSubmit={loginHandler}
        >
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
          <button className="bg-themeBlue w-[150px] rounded-md self-center text-center hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeGold">
            Login
          </button>
          <div className="text-center py-2 text-slate-600">
            Don't have an account yet?{" "}
            <Link className="underline text-gray-500" to={"/register"}>
              {" "}
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
