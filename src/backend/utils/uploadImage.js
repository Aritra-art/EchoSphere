const cloudName = "dazdakg1z";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
const CLOUDINARY_UPLOAD_PRESET = "imgxhaff";
export const uploadImage = async (image) => {
  const file = image;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "echosphere");

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
};
