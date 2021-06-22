import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImagesCard = ({ pics }) => {
  const date = new Date(pics.id);

  return (
    <Link
      to={`/selected/${pics.picId}`}
      className="flex flex-col flex-wrap md:w-1/5 md:h-1/5 w-4/5 md:mx-2 mx-auto border m-2 cursor-pointer hover:shadow-lg"
    >
      <div className="border-b-2 p-2 bg-yellow-400 text-gray-900 font-semibold shadow">
        Uploaded on :{" "}
        <span>
          {date.getDate() +
            " / " +
            date.getMonth() +
            " / " +
            date.getFullYear()}
        </span>
      </div>

      <div className="flex flex-wrap  flex-grow px-2 ">
        {Object.entries(pics.images).map((img) => (
          <LazyLoadImage
            key={Math.random()}
            src={img[1]}
            effect="blur"
            className="h-20 w-20 p-2"
            alt=""
          />
        ))}
      </div>
    </Link>
  );
};

export default ImagesCard;
