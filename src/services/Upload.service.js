const UPLOAD_PRESET = "insta_clone";
const CLOUD_NAME = "levid83";
const URL = "https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/image/upload";

export default class UploadService {
  constructor(uploadPreset = UPLOAD_PRESET, cloudName = CLOUD_NAME, url = URL) {
    this.url = url;
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
  }
  async uploadPicture(picture) {
    const data = new FormData();
    data.append("file", picture);
    data.append("upload_preset", this.uploadPreset);
    data.append("cloud_name", this.cloudName);
    try {
      let result = await fetch(this.url, {
        method: "post",
        body: data,
      });
      return result.json();
    } catch (err) {
      throw new Error("Cannot upload the picture");
    }
  }
}
