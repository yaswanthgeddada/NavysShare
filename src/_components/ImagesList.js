import React from "react";

const ImagesList = ({ image, progress, urlList }) => {
  // URL.createObjectURL(image) ||
  // console.log("imageUrls", image);
  return (
    <div className="flex justify-between md:w-3/5 items-center bg-gray-100 border h-20 mx-10 md:mx-auto px-6 mt-5">
      <div className="flex space-x-4 items-center text-gray-800 font-semibold text-lg">
        <img
          src={
            URL.createObjectURL(image?.originalImage) ||
            "assets/images/noimage.png"
          }
          className="bg-contain box-content h-16 w-16 border-2 "
          alt=""
        />
        <div>
          <p>
            {image.originalImage.name.length > 10
              ? image.originalImage.name.substring(1, 7) + "...."
              : image.originalImage.name}
          </p>
          <p className=" text-sm font-normal ">
            {(image.originalImage.size / 1048576).toFixed(3)} mb
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImagesList;
