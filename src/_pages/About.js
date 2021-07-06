import React from "react";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();

  return (
    <div className=" text-center font-semibold mt-5">
      <div className="flex flex-col">
        Navya Share is a image sharing web app.
        <div className=" text-left mx-auto">
          1. select images you want to share
          <br /> 2. click on upload. <br />
          3. submit after done.
        </div>
      </div>
      <div className="text-center font-mono text-gray-400 font-semibold mt-20">
        Developed By Yaswanth Geddada.
      </div>
      <button
        onClick={() => history.push("/")}
        className="bg-gray-700 m-4 w-56  text-white font-semibold px-5 py-1 rounded-lg  focus:outline-none"
      >
        ⬅️ Go back
      </button>
    </div>
  );
};

export default About;
