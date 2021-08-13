import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";

import { firestore } from "../_firebase/firebase";
import { FcDownload } from "react-icons/fc";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiWindows } from "react-icons/bi";

import { saveAs } from "file-saver";
var fs = require("fs");

const SelectedImages = () => {
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState();
  let date = "";

  useEffect(() => {
    const docRef = firestore.collection("photos").doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setData(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);
  if (data) {
    const dd = new Date(data?.id);
    date = dd.getDate() + "/" + dd.getMonth() + "/" + dd.getFullYear();
  }

  const downloadImage = (image) => {
    // create Canvas
    fetch(image, {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.jpeg`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };

  return (
    <div className="flex flex-col md:mx-20 mx-10 mt-10 bg-gray-100 rounded-xl">
      <div className="border-2 p-4 flex space-x-5 rounded-t-xl ">
        <div
          className="hover:text-ncolor-primary cursor-pointer"
          onClick={() => history.push("/navyashare")}
        >
          <BsArrowLeftShort size="25" />
        </div>
        <div>{date}</div>
      </div>
      <div className="flex flex-wrap border p-4 rounded-b-xl">
        {data &&
          Object.entries(data.images).map((image) => (
            <div
              key={image[0]}
              className="p-2 m-2 border-2 rounded-xl bg-white"
            >
              <img src={image[1]} alt="" className="h-56 w-56 object-contain" />
              <button
                onClick={() => downloadImage(image[1])}
                className="border-2 float-right mt-2 rounded ring-0 focus:outline-none hover:bg-ncolor-background "
              >
                <FcDownload size="25" />
              </button>
              <button
                onClick={() => window.open(image[1])}
                className="border-2 float-right m-2 mt-2 text-blue-500 rounded ring-0 focus:outline-none hover:bg-ncolor-background "
              >
                <BiWindows size="25" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectedImages;
