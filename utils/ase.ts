import CryptoJS from 'crypto-js';

const AES_ALGORITHM = 'AES';
const IV = CryptoJS.enc.Utf8.parse('0123456789ABCDEF');
const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');

export function encrypt(plaintext: string): string {
  const encrypted = CryptoJS.AES.encrypt(plaintext, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

export function decrypt(ciphertext: string): string {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}