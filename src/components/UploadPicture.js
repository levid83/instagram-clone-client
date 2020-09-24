import React from "react";
import ImageUploader from "react-images-upload";
import styled from "styled-components";

const StyledImageUploader = styled(ImageUploader)`
  & .fileContainer {
    box-shadow: none;
    padding: 0;
    margin: 0;
  }
  .chooseFileButton {
    background-color: #1e88e5 !important;
  }
`;

const UploadPicture = (props) => {
  const { onSetPicture } = props;

  return (
    <StyledImageUploader
      withIcon={false}
      buttonText="Choose image"
      onChange={(e) => onSetPicture(e[0])}
      withLabel={false}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
      withPreview={false}
      singleImage={true}
    />
  );
};

export default UploadPicture;
