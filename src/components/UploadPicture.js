import React from "react";
import ImageUploader from "react-images-upload";
import styled from "styled-components";

const StyledImageUploader = styled(ImageUploader)`
  & .fileContainer {
    box-shadow: none;
    padding: 0;
    margin: 0;
    align-items: stretch;
  }
  & .chooseFileButton {
    background-color: #1e88e5 !important;
    border-radius: 0;
  }
  & .uploadPictureContainer {
    width: 90%;
  }
`;

const UploadPicture = (
  { onSetPicture, withPreview } = { withPreview: false }
) => {
  return (
    <StyledImageUploader
      withIcon={false}
      buttonText="Choose image"
      onChange={(e) => onSetPicture(e[0])}
      withLabel={false}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
      withPreview={withPreview}
      singleImage={true}
    />
  );
};

export default UploadPicture;
