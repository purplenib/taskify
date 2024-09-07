const convertStringToColorHex = (str: string) => {
  let hex = '';
  for (let i = 0; i < str.length; i += 1) {
    hex += str.charCodeAt(i).toString(16);
  }
  if (hex.length < 6) {
    hex = hex.padStart(6, '0');
  } else if (hex.length > 6) {
    hex = hex.slice(0, 6);
  }
  return hex;
};
export default convertStringToColorHex;
