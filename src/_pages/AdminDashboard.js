import React, { useEffect, useState } from "react";
import ImagesCard from "../_components/ImagesCard";
import { firestore } from "../_firebase/firebase";
import { autoDelete } from "../_services/getPhotos";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const AdminDashboard = () => {
  const [images, setImages] = useState();
  const history = useHistory();

  useEffect(() => {
    const getPhotos = async () => {
      try {
        await firestore
          .collection("photos")
          .orderBy("id", "desc")
          .onSnapshot((snapShot) =>
            setImages(
              snapShot.docs.map((doc) => ({ ...doc.data(), picId: doc.id }))
            )
          );
      } catch (error) {
        console.error(error);
      }
    };

    getPhotos();
  }, []);

  const handleDelete = () => {
    const confirm = window.confirm(
      "If you click ok all the file will be deleted 💀"
    );
    console.log(confirm);
    if (confirm) {
      autoDelete();
      window.alert("all the files has been deleted 💀");
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };

  return (
    <div className="flex flex-col">
      <div>
        <button
          onClick={handleDelete}
          className="bg-red-700 m-4 w-56  text-white font-semibold px-5 py-1 rounded-lg  focus:outline-none"
        >
          Delete All Files ☠️
        </button>
        <button
          onClick={signOut}
          className="bg-gray-700 m-4 w-56  text-white font-semibold px-5 py-1 rounded-lg  focus:outline-none"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-wrap">
        {images ? (
          images.map((data) => <ImagesCard key={data.id} pics={data} />)
        ) : (
          <div className="flex flex-col justify-center items-center w-full">
            <CircularProgress />
            <p className="text-center font-bold text-gray-600">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
