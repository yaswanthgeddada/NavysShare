import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { format } from "timeago.js";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteImageGroup } from "../_services/getPhotos";

const ImagesCard = ({ pics }) => {
  if (pics.images.length > 3) {
    pics.images.length = 3;
  }

  const date = new Date(pics.id);

  const deleteHandler = async () => {
    // console.log(pics.picId);
    const confirm = await window.confirm(
      "❌ you want to delete this image group ? ❌"
    );

    if (confirm) {
      await deleteImageGroup(pics.picId);
    }
  };

  // console.log(pics);

  return (
    <div className="flex flex-col flex-wrap md:w-1/5 md:h-1/5 w-4/5 md:mx-2 mx-auto border m-2  hover:shadow-lg">
      <div className="border-b-2 p-2 bg-yellow-400 text-xs text-gray-900 font-semibold shadow">
        <span className="text-base">{date.toLocaleDateString("en-GB")}</span>
        <span className="text-xs text-gray-500"> ({format(date)})</span>
        <span className="float-right cursor-pointer" onClick={deleteHandler}>
          <BsFillTrashFill size="20" className="text-red-800" />
        </span>
      </div>

      <Link
        to={`/selected/${pics?.picId}`}
        className="grid grid-flow-col grid-cols-3 grid-rows-1 gap-0 overflow-x-hidden px-2 cursor-pointer "
      >
        {pics.images.map((img) => (
          <LazyLoadImage
            key={Math.random()}
            src={img.miniThumbnailImage}
            effect="blur"
            className="h-20 w-20 object-contain  p-2"
            alt=""
          />
        ))}
        <div>{pics.images.length >= 3 && ".."} </div>
      </Link>
    </div>
  );
};

export default ImagesCard;
