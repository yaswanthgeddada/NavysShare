import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

const useUploadImageList = (initalValue, e) => {
  const [imagesList, setImagesList] = useState(initalValue);
  const [thumbnails, setThumbnails] = useState([]);

  if (e.target.files[0]) {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImagesList((prevState) => [...prevState, newImage]);
      Resizer.imageFileResizer(
        newImage,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri) => {
          setThumbnails((prevState) => [...prevState, uri]);
        },
        "base64"
      );
    }
  } else {
    setImagesList([...imagesList]);
    setThumbnails((prevState) => [...prevState]);
  }
  return imagesList;
};

export default useUploadImageList;
