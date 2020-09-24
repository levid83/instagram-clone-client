const px2vw = (size, width = window.innerWidth) =>
  `${((size / width) * 100).toFixed(2)}vw`;

export default px2vw;
