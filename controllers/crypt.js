/*
  Class Crypt 
  Classe base que encripta ou decripta dados 
  utilizados no aplicativo. 
*/

"use strict";

class Crypt {

  constructor() {}

  async encrypt(decrypted, key, iv) {
    const data = new TextEncoder().encode(decrypted);
    const keyBytes = new Uint8Array(key.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const ivBytes = new Uint8Array(iv.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const importedKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['encrypt']);
    const encryptedData = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: ivBytes }, importedKey, data);
    const encryptedText = Array.from(new Uint8Array(encryptedData)).map(b => b.toString(16).padStart(2, '0')).join('');
    return encryptedText;
  }

  async decrypt(encrypted, key, iv) {
    const encryptedBytes = new Uint8Array(encrypted.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const keyBytes = new Uint8Array(key.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const ivBytes = new Uint8Array(iv.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const importedKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['decrypt']);
    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: ivBytes }, importedKey, encryptedBytes);
    const decryptedText = new TextDecoder().decode(decryptedData);
    return decryptedText;
  }

}

export default new Crypt();
