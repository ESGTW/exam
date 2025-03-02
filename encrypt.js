// encrypt.js
const fs = require('fs');
const CryptoJS = require('crypto-js');

const key = '12345678123456781234567812345678'; // 32 字元的密鑰
const data = fs.readFileSync('10.json', 'utf8');

// 加密
const encrypted = CryptoJS.AES.encrypt(data, key).toString();
fs.writeFileSync('10_encrypted.json', encrypted);
