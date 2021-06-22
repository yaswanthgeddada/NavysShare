import { storage } from "../_firebase/firebase";
import { firestore } from "../_firebase/firebase";

export const addImageToStorageBucket = async (
  imagesList,
  setIsLoading,
  setProgressValue,
  setUrlList,
  urlList,
  path
) => {
  const promises = [];
  imagesList.map((image) => {
    const imageName = Date.now() + image.name;
    setIsLoading(true);

    const uploadTask = storage.ref(`${path}/${imageName}`).put(image);
    promises.push(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // console.log(snapshot.bytesTransferred);
        setProgressValue((snapshot.bytesTransferred / image.size) * 100);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await storage
          .ref(path)
          .child(imageName)
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
            setUrlList((prevState) => [...prevState, url]);
            setIsLoading(false);
          });
      }
    );
  });

  Promise.all(promises)
    .then(() => {
      console.log("added");
    })

    .catch((err) => console.log(err));
};

export const addImageUrlToDb = async (data) => {
  try {
    await firestore.collection("photos").add(data);
    console.log("photos added");
  } catch (error) {
    console.log(error);
  }
};