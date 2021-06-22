import React from "react";

const About = () => {
  return (
    <div className=" text-center font-semibold">
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
    </div>
  );
};

export default About;
