// preload.js

  
const imagePaths = [
  'assets/ARS.png',
  'assets/AST.png',
  'assets/back.png',
  'assets/ball.png',
  'assets/BHA.png',
  'assets/BOU.png',
  'assets/BRE.png',
  'assets/BUR.png',
  'assets/CHE.png',
  'assets/CRY.png',
  'assets/EVE.png',
  'assets/FUL.png',
  'assets/LEE.png',
  'assets/LEI.png',
  'assets/LIV.png',
  'assets/MNC.png',
  'assets/MNU.png',
  'assets/NEW.png',
  'assets/NOR.png',
  'assets/NOT.png',
  'assets/SHU.png',
  'assets/SOU.png',
  'assets/TOT.png',
  'assets/WAT.png',
  'assets/WBA.png',
  'assets/WHU.png',
  'assets/WOL.png'
];

const preloadImages = (imagePaths) => {
    const imagePromises = imagePaths.map((path) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = path;
      });
    });
  
    return Promise.all(imagePromises);
  };
  

  // Preload images
  preloadImages(imagePaths)
    .then(() => console.log('All images preloaded successfully'))
    .catch((error) => console.error('Error preloading images:', error));

  