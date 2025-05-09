// Quiz Data
const quizData = [
    {
        question: "What is the capital of Kenya?",
        options: ["Mombasa", "Nakuru", "Nairobi", "Kisumu"],
        answer: 2
    },
    {
        question: "Which animal appears on Kenya's coat of arms?",
        options: ["Lion", "Elephant", "Buffalo", "Giraffe"],
        answer: 0
    },
    {
        question: "How many colors are in the Kenyan flag?",
        options: ["3", "4", "5", "6"],
        answer: 1
    }
];

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const quizResult = document.getElementById('quiz-result');
const demoBtn = document.getElementById('demo-btn');
const contactForm = document.getElementById('contact-form');
const navMenu = document.getElementById('nav-menu');

// Current quiz state
let currentQuestion = 0;
let score = 0;

// Initialize the quiz
function initQuiz() {
    showQuestion();
    demoBtn.textContent = "Next Question";
    demoBtn.removeEventListener('click', initQuiz);
    demoBtn.addEventListener('click', nextQuestion);
}

// Display current question
function showQuestion() {
    if (currentQuestion >= quizData.length) {
        showResults();
        return;
    }

    const question = quizData[currentQuestion];
    quizContainer.innerHTML = `
        <div class="quiz-question">${question.question}</div>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <button class="quiz-option" onclick="selectOption(${index})">${option}</button>
            `).join('')}
        </div>
    `;
}

// Handle option selection
function selectOption(selectedIndex) {
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === question.answer) {
            option.style.backgroundColor = "#a5d6a7"; // Green for correct
        } else if (index === selectedIndex && index !== question.answer) {
            option.style.backgroundColor = "#ef9a9a"; // Red for incorrect
        }
    });

    if (selectedIndex === question.answer) {
        score++;
    }
}

// Move to next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
        quizResult.textContent = "";
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    quizContainer.innerHTML = "";
    quizResult.textContent = `You scored ${score} out of ${quizData.length}!`;
    demoBtn.textContent = "Restart Quiz";
    demoBtn.removeEventListener('click', nextQuestion);
    demoBtn.addEventListener('click', restartQuiz);
}

// Restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    initQuiz();
}

// Form validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const grade = document.getElementById('grade').value;
    
    if (!/^[0-9]{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit M-Pesa number');
        return;
    }
    
    if (!grade) {
        alert('Please select your child\'s grade');
        return;
    }
    
    alert(`Thank you! We'll contact you on ${phone} about Grade ${grade} materials.`);
    contactForm.reset();
});

// Mobile menu toggle
function toggleMenu() {
    navMenu.classList.toggle('show');
}

// Close menu when clicking on nav links
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
});

// Initialize demo button
demoBtn.addEventListener('click', initQuiz);