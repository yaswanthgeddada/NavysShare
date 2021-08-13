import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

import ImagesList from "../_components/ImagesList";

import {
  addImageToStorageBucket,
  addImageUrlToDbforLinks,
} from "../_services/photoUploadService";

import toast, { Toaster } from "react-hot-toast";

const CreateNewLink = () => {
  const [inZone, setInZone] = useState(false);

  const [imagesList, setImagesList] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const dragEnter = () => {
    // console.log("file entered");
    setInZone(true);
  };
  const dragLeave = () => {
    // console.log("file Left");
    setInZone(false);
  };
  const dropOver = (e) => {
    setInZone(true);
    // console.log("drop over");
    let event = e;
    event.stopPropagation();
    event.preventDefault();
  };
  const fileDrop = (e) => {
    let event = e;
    event.stopPropagation();
    event.preventDefault();

    const files = e.dataTransfer.files;
    console.log(files);
    uploadImage(files);
    setInZone(false);
  };

  const uploadImage = async (files) => {
    if (files[0]) {
      for (let i = 0; i < files.length; i++) {
        const newImage = files[i];
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
      let data = {
        id: dates,
        password: Math.floor(Math.random() * 1000 + 1000),
        images: { ...urlList },
        thumbnails: { ...thumbnails },
      };

      // console.log(data);

      await addImageUrlToDbforLinks(data);
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
    <div className="flex flex-col w-screen ">
      {/* drag and drop zone */}
      <div className="m-20 ">
        <label htmlFor="draginput" className="cursor-pointer">
          <div
            draggable="true"
            className={`border-dashed ${
              inZone ? "bg-blue-400" : "bg-gray-100"
            } text-xl font-bold text-center text-gray-500 border-4 border-light-blue-500 h-56 w-full rounded-2xl flex justify-center items-center`}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOver={dropOver}
            onDrop={(e) => fileDrop(e)}
          >
            Drag <br /> & <br /> Drop Here
            <input
              type="file"
              hidden
              name="draginput"
              title="draginput"
              id="draginput"
              accept="image/*"
              multiple
              onChange={(e) => uploadImage(e.target.files)}
            />
          </div>
        </label>
      </div>

      <hr />

      {/* sidebar for the files to view */}
      <div>
        <div className="mt-10 mb-20">
          {imagesList &&
            imagesList?.map((image) => (
              <ImagesList
                key={image.name + image.size}
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
          <div>
            {urlList.length === imagesList.length && urlList.length > 0 ? (
              <div className="text-center sticky bottom-0">
                Click on submit button
                <div
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex md:w-screen mt-20 mx-10  w-4/5  fixed bottom-0 overflow-x-hidden md:mx-auto justify-center px-10 items-center bg-red-500 md:h-10 h-16 text-white"
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
    </div>
  );
};

export default CreateNewLink;
