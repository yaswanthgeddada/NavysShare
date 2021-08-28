import React, { useState } from "react";
import CustomUploadButton from "../_components/CustomUploadButton";
import ImagesList from "../_components/ImagesList";

import {
  addImageToStorageBucket,
  addImageUrlToDb,
} from "../_services/photoUploadService";

import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

import Resizer from "react-image-file-resizer";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

const resizeFile = (file, height, width) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      height,
      width,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const NavyaShare = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [progress, setProgress] = useState(0);
  const [imagesList, setImagesList] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  // console.log("length", urlList.length);

  const uploadImage = async (e) => {
    if (e.target.files[0]) {
      for (let i = 0; i < e.target.files.length; i++) {
        const newImage = e.target.files[i];
        newImage["id"] = Math.random();
        const miniThumbnail = await resizeFile(newImage, 100, 100);
        const thumbnail = await resizeFile(newImage, 150, 150);
        let imgObj = {
          originalImage: e.target.files[i],
          miniThumbnailImage: miniThumbnail,
          thumbnailImage: thumbnail,
        };

        setImagesList((prevState) => [...prevState, imgObj]);
      }
    } else {
      setImagesList([...imagesList]);
      setThumbnails((prevState) => [...prevState]);
    }
  };

  const handleUpload = async () => {
    await addImageToStorageBucket(
      imagesList,
      setIsLoading,
      setProgress,
      setUrlList,
      urlList,
      "userImageUploads"
    );
  };

  const handleSubmit = async () => {
    setIsSubmiting(true);
    try {
      const dates = Date.now();
      console.log(urlList);

      let list = [];

      urlList.forEach((img) => {
        const { originalImage, ...others } = img;
        list.push(others);
      });

      console.log(list);

      let data = {
        id: dates,
        images: list,
      };

      // console.log(data);

      await addImageUrlToDb(data);
      setImagesList([]);
      setUrlList([]);
      setThumbnails([]);
      toast.success("Successfully Uploaded!");
    } catch (error) {
      console.log(error);
      setError(error);
      toast.success("failed to Upload!");
    }
    setIsSubmiting(false);
  };

  return (
    <div className="flex flex-col h-full w-screen overflow-x-hidden">
      <div className="h-full w-full">
        {error && "something went wrong"}

        {/* 👆 custom upload button for customers */}
        <CustomUploadButton uploadImage={uploadImage} isLoading={isLoading} />
        <div className="mt-10 mb-20">
          {imagesList &&
            imagesList?.map((image) => (
              <ImagesList
                key={image.originalImage.name + image.originalImage.size}
                image={image}
                urlList={urlList}
                progress={progress}
              />
            ))}

          <div>
            {progress > 0 && progress < 100 ? (
              <LinearProgress variant="determinate" value={progress} />
            ) : (
              <></>
            )}
          </div>
          <Toaster position="center" />
          {urlList.length === imagesList.length && urlList.length > 0 ? (
            <div className="text-center sticky bottom-0">
              Click on submit button
              <div
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex md:w-56 mt-20 mx-10  w-4/5  fixed bottom-0 overflow-x-hidden md:mx-auto justify-center px-10 items-center bg-red-500 md:h-10 h-16 text-white"
              >
                {isSubmiting ? <CircularProgress size={25} /> : <p>Submit</p>}
              </div>
            </div>
          ) : (
            <div>
              {imagesList.length ? (
                <button
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="md:flex md:w-screen mt-20 mx-10 w-4/5 fixed bottom-0 overflow-x-hidden md:mx-auto justify-center px-10 items-center bg-ncolor-primary md:h-10 h-16 text-white"
                >
                  {isLoading && urlList.length !== imagesList.length ? (
                    <CircularProgress size={25} />
                  ) : (
                    "Upload"
                  )}
                </button>
              ) : (
                <p className="text-center"></p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavyaShare;
