let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// 生成 32 字節密鑰
function generateKey(password) {
    return crypto.createHash('sha256').update(password).digest('hex').slice(0, 32);
}

// 解密 JSON 文件
function decryptJSON(encrypted, password) {
    const key = generateKey(password); // 生成 32 字節密鑰
    const iv = Buffer.from(encrypted.iv, 'hex'); // 將 IV 從十六進制轉為 Buffer
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv); // 創建解密器
    let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8'); // 解密數據
    decrypted += decipher.final('utf8'); // 完成解密
    return JSON.parse(decrypted); // 返回解密後的 JSON 數據
}

// 加載題庫
async function loadQuestions() {
    try {
        const response = await fetch('10_encrypted.json'); // 加載加密文件
        if (!response.ok) {
            throw new Error(`HTTP 錯誤！狀態碼: ${response.status}`);
        }
        const encryptedData = await response.json(); // 解析加密數據
        const password = '12345678'; // 解密密碼
        questions = decryptJSON(encryptedData, password); // 解密並獲取題庫
        showQuestion(); // 顯示第一題
    } catch (error) {
        console.error('加載題庫失敗:', error);
        alert('加載題庫失敗，請檢查文件路徑或內容。');
    }
}

// 顯示題目
function showQuestion() {
    if (currentQuestionIndex >= questions.length || currentQuestionIndex >= 5) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `題號: ${question.題號}`;
    document.getElementById('question-text').innerText = question.題目;
    document.getElementById('options').innerHTML = `
        <p>1. ${question.選項1}</p>
        <p>2. ${question.選項2}</p>
        <p>3. ${question.選項3}</p>
        <p>4. ${question.選項4}</p>
    `;
}

// 檢查答案
function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value;
    const question = questions[currentQuestionIndex];
    if (userAnswer == question.答案) {
        document.getElementById('result').innerText = '✅';
        score++;
    } else {
        document.getElementById('result').innerText = '❌';
        document.getElementById('explanation').innerText = `答案: ${question.答案}, 解析: ${question.解析}`;
        setTimeout(() => {
            document.getElementById('explanation').innerText = '';
        }, 10000);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
        setTimeout(showQuestion, 1000); // 顯示下一題
    } else {
        endQuiz();
    }
}

// 結束測驗
function endQuiz() {
    setTimeout(() => {
        alert(`測驗結束！得分: ${score}/5`);
        window.location.href = 'index.html';
    }, 3000);
}

// 開始測驗
function startQuiz() {
    window.location.href = 'quiz.html';
}

// 初始化
if (window.location.pathname.endsWith('quiz.html')) {
    loadQuestions();
    document.getElementById('answer-input').addEventListener('change', checkAnswer);
}