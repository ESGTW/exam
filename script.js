let questions = [];
let currentQuestionIndex = 0;

// 加載並解密題庫
fetch('10_encrypted.json')
    .then(response => response.text())
    .then(data => {
        questions = decryptData(data);
        questions = questions.sort(() => Math.random() - 0.5).slice(0, 5); // 隨機選取 5 題
        loadQuestion();
    });

// 載入題目
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `第 ${currentQuestionIndex + 1} 題`;
    document.getElementById('question-text').innerText = question.題目;
    document.getElementById('options').innerHTML = `
        <p>1. ${question.選項1}</p>
        <p>2. ${question.選項2}</p>
        <p>3. ${question.選項3}</p>
        <p>4. ${question.選項4}</p>
    `;
    document.getElementById('result').innerText = '';
    document.getElementById('explanation').innerText = '';
}

// 提交答案
function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answer-input').value);
    const question = questions[currentQuestionIndex];
    const resultDiv = document.getElementById('result');
    const explanationDiv = document.getElementById('explanation');

    if (userAnswer === question.答案) {
        resultDiv.innerText = '✅';
        resultDiv.style.color = 'blue';
        setTimeout(nextQuestion, 1000);
    } else {
        resultDiv.innerText = '❌';
        resultDiv.style.color = 'red';
        explanationDiv.innerText = `解析: ${question.解析}`;
        setTimeout(nextQuestion, 10000);
    }
}

// 下一題
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = `
            <h1>測驗完成！</h1>
            <p>3 秒後返回首頁...</p>
        `;
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }
}
