const generateStars = (
  containerId: string,
  positions: { [key: string]: string }[],
  sizeRange: { min: number; max: number },
): void => {
  const starContainer = document.getElementById(containerId);
  const screenWidth = window.innerWidth;

  // if (screenWidth > 1250) {
  //   for (let i = 0; i < positions.length; i++) {
  //     const star = document.createElement("img");

  //     // Use the specified star SVG file
  //     star.src = "/fire.svg";
  //     star.className = "star -z-20";

  //     const size =
  //       Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
  //     star.style.width = `${size}rem`;
  //     star.style.height = `${size}rem`;

  //     // Apply the color directly to the star SVG using the 'filter' property
  //     star.style.filter = `brightness(100%) hue-rotate(${Math.random() * 360}deg)`;

  //     star.style.position = "absolute";
  //     Object.assign(star.style, positions[i]);

  //     starContainer?.appendChild(star);
  //   }
  // }
};

export default generateStars;
