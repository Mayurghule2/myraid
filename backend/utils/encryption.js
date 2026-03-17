const CryptoJS = require("crypto-js");

exports.encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, process.env.AES_SECRET).toString();
};

exports.decrypt = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, process.env.AES_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};