import { storage } from "../firebase";

export const uploadImgsToFirebase = async (rawPhotos) => {
  if (rawPhotos.length > 0) {
    // create array to store the uploadied image url
    const array = Array.from(
      { length: rawPhotos.length },
      (value, index) => index
    );

    let uploadedImgs = await Promise.all(
      array.map(async (index) => {
        const file = rawPhotos[index];

        const uploadTask = storage
          .ref("avatar")
          .child(`${file.name}`)
          .put(file);

        const url = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => reject(error),
            async () => {
              const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
              resolve(downloadUrl);
            }
          );
        });

        console.log(url);
        return url;
      })
    );

    return uploadedImgs;
  }
};
export const uploadProfileImageToFirebase = async (rawPhoto) => {
  console.log(rawPhoto);
  let url;
  if (rawPhoto) {
    const file = rawPhoto;

    const uploadTask = storage.ref("avatar").child(`${file.name}`).put(file);
    // gets the url of the uploaded image
    let url = await storage.ref("avatar").child(file.name).getDownloadURL();

    console.log(url);
    return url;
  }
};
