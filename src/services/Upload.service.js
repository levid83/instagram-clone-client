export default class UploadService {
  constructor(url = "", cloudName = "", uploadPreset = "") {
    this.url = url;
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
  }
  async uploadPicture(image) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", this.uploadPreset);
    data.append("cloud_name", this.cloudName);
    try {
      let result = await fetch(this.url, {
        method: "post",
        body: data,
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }
}
