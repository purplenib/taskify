import convertStringToColorHex from './convertStringToColorHex';

const convertStringToRGBA = (str: string, alpha: number) => {
  const hex = convertStringToColorHex(str);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const rgba = `rgba(${r},${g},${b},${alpha})`;
  return rgba;
};

export default convertStringToRGBA;
