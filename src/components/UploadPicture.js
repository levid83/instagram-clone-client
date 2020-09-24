import React from "react";
const UploadPicture = (props) => {
  const { onSetPicture } = props;
  return (
    <div className="file-field input-field" style={{ margin: "10px" }}>
      <div className="btn #64b5f6 blue darken-1">
        <span>Update picture</span>
        <input type="file" onChange={(e) => onSetPicture(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
  );
};
export default UploadPicture;
