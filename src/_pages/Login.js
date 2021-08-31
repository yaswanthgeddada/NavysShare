import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../_context/UserContext";

import { useAuth } from "../_context/AuthContext";

const Login = () => {
  // const { login, setCurrentUser } = useUser();
  const { currentUser, signup, login, logout } = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const submitHanddler = async (e) => {
  //   e.preventDefault();
  //   if (username !== "" && password !== "") {
  //     const result = await login(username, password);

  //     if (result) {
  //       if (result.username === username && result.password === password) {
  //         localStorage.setItem("user", JSON.stringify(result));
  //         setCurrentUser(result);
  //         history.push("/navyashare");
  //       } else {
  //         setError("Wrong Credentials 🐵");
  //       }
  //     } else {
  //       setError("something went wrong 👷‍♂️");
  //     }
  //   } else {
  //     setError("enter some value 🤦‍♂️");
  //   }
  // };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      try {
        await login(username, password);
        history.push("/navyashare");
      } catch (error) {
        setError(error.message + " 🐵");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col  justify-center items-center mt-20 ">
      <div className="text-2xl text-mono text-ncolor-primary font-semibold">
        Navya Studio
      </div>
      <form
        className="flex flex-col w-96 text-sm border-2 p-4 space-y-2"
        onSubmit={loginHandler}
      >
        {error && <p className="text-center text-red-600">{error}</p>}
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
        />
        <button className="border-2 rounded-xl foucs:outline-none bg-ncolor-primary mt-2 text-white py-1">
          Submit
        </button>
      </form>
      <button
        onClick={() => history.push("/")}
        className="bg-gray-700 m-4 w-56 mt-10  text-white font-semibold px-5 py-1 rounded-lg  focus:outline-none"
      >
        ⬅️ Go back to Home
      </button>
    </div>
  );
};

export default Login;
