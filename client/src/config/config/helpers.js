export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas"); //selects the canvas image on the webpage
  const dataURL = canvas.toDataURL(); //converts the canvas image into a dataURL
  const link = document.createElement("a"); //link element <a> is being created

  link.href = dataURL; //the <a href=""> is set to dataURL
  link.download = "canvas.png"; //the download property is set to the desired file name(image will be downloade with this name)
  document.body.appendChild(link); //we add the link in the body as the last child of the body
  link.click(); //a click event is intiated on the link which intiates the download of the canvas as image
  document.body.removeChild(link); //finally, after clicked, it is then removed from the body
};

export const reader = (file) =>      //takes a file as an argument and returns a Promise
  new Promise((resolve, reject) => {   //promises acts as a placeholder for the asynchronus code, here the File Reader is the asynchcronus code
    const fileReader = new FileReader(); //built-in JavaScript API that helps read the contents of files
    fileReader.onload = () => resolve(fileReader.result); //when the file has finished loading the onload funtion is called
    //inside the onload funtion the fileReader.result property contains the content of the file as a data URL.
    fileReader.readAsDataURL(file); //used to read the contents of a file as a data URL
  });

export const getContrastingColor = (color) => { //takes a color and returns either black or white dependind on the brightness of the input color
  
  const hex = color.replace("#", ""); // Remove the '#' character if it exists

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};
