import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../_context/UserContext";
const Login = () => {
  const { login, setCurrentUser } = useUser();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHanddler = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      const result = await login(username, password);

      if (result) {
        if (result.username === username && result.password === password) {
          localStorage.setItem("user", JSON.stringify(result));
          setCurrentUser(result);
          history.push("/navyashare");
        } else {
          setError("Wrong Credentials 🐵");
        }
      } else {
        setError("something went wrong 👷‍♂️");
      }
    } else {
      setError("enter some value 🤦‍♂️");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 ">
      <div className="text-2xl text-mono text-ncolor-primary font-semibold">
        Navya Studio
      </div>
      <form
        className="flex flex-col text-sm border-2 p-4 space-y-2"
        onSubmit={submitHanddler}
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
    </div>
  );
};

export default Login;
