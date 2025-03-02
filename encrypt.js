const crypto = require('crypto');
const fs = require('fs');

// 加密函數
function encryptJSON(data, password) {
    const iv = crypto.randomBytes(16); // 生成隨機初始化向量 (IV)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(password), iv); // 創建加密器
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex'); // 加密數據
    encrypted += cipher.final('hex'); // 完成加密
    return { iv: iv.toString('hex'), encryptedData: encrypted }; // 返回加密後的數據和 IV
}

// 讀取原始 JSON 文件
const jsonData = require('./10.json'); // 確保 10.json 文件存在於當前目錄
const password = '12345678'; // 加密密碼

// 加密 JSON 數據
const encrypted = encryptJSON(jsonData, password);

// 將加密後的數據保存到文件
fs.writeFileSync('10_encrypted.json', JSON.stringify(encrypted));

console.log('加密完成，生成 10_encrypted.json 文件');