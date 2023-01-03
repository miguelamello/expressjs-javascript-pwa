/*
  Class Crypt 
  Classe base que encripta ou decripta dados 
  utilizados no aplicativo. 
*/

"use strict";

function Crypt() {

  // Private Properties
  const CryptoJS = import('./../node_modules/crypto-js/crypto-js');
  let _cryptokey = '';
  let _cryptoiv = '';

  // Public Methods
  this._encrypt = (data) => {
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), 
      _cryptokey, 
      { iv: _cryptoiv }
    );
    return encrypted.toString();
  };

  this._encryptString = (data) => {
    let encrypted = CryptoJS.AES.encrypt(
      data, 
      _cryptokey, 
      { iv: _cryptoiv }
    );
    return encrypted.toString();
  };

  this._decrypt = (data) => {
    let decrypted = CryptoJS.AES.decrypt(
      data, 
      _cryptokey, 
      { iv: _cryptoiv }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  this._hexCryptoKey = (key) => {
    _cryptokey = CryptoJS.enc.Hex.parse(key);
  };

  this._hexCryptoIv = (iv) => {
    _cryptoiv = CryptoJS.enc.Hex.parse(iv);
  };

  //--> MODULE INITIALIZATION
  
  (() => {})()

}

export default new Crypt;
