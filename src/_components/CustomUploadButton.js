import React from "react";
import { FcUpload } from "react-icons/fc";

const CustomUploadButton = ({ uploadImage, isLoading }) => {
  return (
    <div className="flex flex-col mt-10">
      <label
        htmlFor="upload"
        className="bg-gray-200 
        cursor-pointer
        border-none
        p-8 mx-auto
        rounded-full
        ring-2 
      ring-ncolor-primary
        focus:outline-none focus:border-none filter drop-shadow-lg"
      >
        <input
          type="file"
          id="upload"
          disabled={isLoading}
          hidden
          accept="image/.jpg, image/.jpeg, image/.png "
          onChange={uploadImage}
          multiple
        />
        <FcUpload size="40" />
      </label>
      <p className="mx-auto mt-3">Select photos</p>
    </div>
  );
};

export default CustomUploadButton;
