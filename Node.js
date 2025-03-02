const crypto = require('crypto');
const fs = require('fs');

function encryptJSON(data, password) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(password), iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
}

const jsonData = require('./10.json'); // 讀取原始 JSON 文件
const password = '12345678';
const encrypted = encryptJSON(jsonData, password);

fs.writeFileSync('10_encrypted.json', JSON.stringify(encrypted)); // 保存加密後的 JSON