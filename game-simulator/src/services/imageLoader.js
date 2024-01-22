export const loadImage = (src) => {
    const image = new Image();
    image.src = `./assets/${src}.png`;
    return image;
  };