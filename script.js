let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// 解密 JSON 文件
function decryptJSON(encrypted, password) {
    const iv = Buffer.from(encrypted.iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(password), iv);
    let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
}

// 加載題庫
async function loadQuestions() {
    const response = await fetch('10_encrypted.json');
    const encryptedData = await response.json();
    const password = '12345678';
    questions = decryptJSON(encryptedData, password);
    showQuestion();
}

// 顯示題目
function showQuestion() {
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
        setTimeout(showQuestion, 1000);
    } else {
        setTimeout(() => {
            alert(`測驗結束！得分: ${score}/5`);
            window.location.href = 'index.html';
        }, 3000);
    }
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