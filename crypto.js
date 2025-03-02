// crypto.js
function decryptData(encryptedData) {
    const key = '12345678123456781234567812345678';
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
