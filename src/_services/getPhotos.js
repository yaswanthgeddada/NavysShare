import { firestore } from "../_firebase/firebase";
import { storage } from "../_firebase/firebase";

export const getPhotosForAdmin = async () => {
  try {
    const result = await firestore
      .collection("photos")
      .onSnapshot((snapShot) => snapShot.docs);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const autoDelete = () => {
  var desertRef = storage.ref("userImageUploads");
  // Delete the file
  desertRef
    .listAll()
    .then((dir) => {
      dir.items.forEach((fileRef) => {
        var dirRef = storage.ref(fileRef.fullPath);
        dirRef.getDownloadURL().then(function (url) {
          var imgRef = storage.refFromURL(url);
          imgRef
            .delete()
            .then(function () {
              // File deleted successfully
              // console.log("deleted");
            })
            .catch(function (error) {
              // There has been an error
            });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  firestore
    .collection("photos")
    .get()
    .then((res) => {
      res.forEach((element) => {
        element.ref.delete();
      });
    });
};
