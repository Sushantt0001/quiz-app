const quizData = [
    {
        category: "general",
        easy: [
            { question:"What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], answer: "Delhi" },
            { question:"Who is the current President of the United States?", options: ["Joe Biden", "Donald Trump", "Barack Obama", "George Bush"], answer: "Joe Biden" }
        ],
        medium: [
            { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
            { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: "Blue Whale" }
        ],
        hard: [
            { question: "What is the chemical symbol for Gold?", options: ["Au", "Ag", "Gd", "Go"], answer: "Au" },
            { question: "Who wrote the play 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: "William Shakespeare" }
        ]
    },
    {
        category: "technology",
        easy: [
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Marking Language"], answer: "Hyper Text Markup Language" },
            { question: "Which language is used for web development?", options: ["Python", "HTML", "C++", "Java"], answer: "HTML" }
        ],
        medium: [
            { question: "What does API stand for?", options: ["Application Programming Interface", "Application Protocol Interface", "Applied Programming Interface", "Advanced Programming Interface"], answer: "Application Programming Interface" },
            { question: "Which of the following is a backend programming language?", options: ["HTML", "CSS", "JavaScript", "Node.js"], answer: "Node.js" }
        ],
        hard: [
            { question: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Google", "Facebook"], answer: "Netscape" },
            { question: "Which programming language is primarily used for iOS development?", options: ["Swift", "Kotlin", "Java", "Python"], answer: "Swift" }
        ]
    }
];

let selectedCategory=null;
let selectedDifficulty=null;
let questions=[];
let currentQuestion=0;
let score=0;
let answered=false;

let timeLeft = 5;
let timer;

const categorySection=document.getElementById("category-section");
const difficultySection=document.getElementById("difficulty-section");
const quizCard=document.getElementById("quiz-card");
const questionEl=document.getElementById("question");
const optionsEl=document.getElementById("options");
const nextBtn=document.getElementById("next-btn");
const resultCard=document.getElementById("result-container");
const scoreEl=document.getElementById("score");

document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("title-slide").classList.add("hide");
    categorySection.classList.remove("hide");
});

document.querySelectorAll(".category-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        selectedCategory = btn.dataset.category;
        categorySection.classList.add("hide");
        difficultySection.classList.remove("hide");
    });
});

document.querySelectorAll(".difficulty-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        selectedDifficulty=btn.dataset.difficulty;

        const categoryObj = quizData.find(q => q.category === selectedCategory);
        if (!categoryObj) return;

        questions=categoryObj[selectedDifficulty];

        currentQuestion = 0;
        score=0;

        difficultySection.classList.add("hide");
        quizCard.classList.remove("hide");

        loadQuestion();
    });
});

function loadQuestion(){
    answered = false;
    nextBtn.classList.remove("show");

    const current=questions[currentQuestion];
    questionEl.innerText=current.question;
    optionsEl.innerHTML="";

    current.options.forEach(option=>{
        const li=document.createElement("li");
        li.innerText=option;
        li.addEventListener("click", selectOption);
        optionsEl.appendChild(li);
    });

    startTimer();
}

function startTimer(){
    timeLeft = 5;
    document.getElementById("timer").innerText = `⏱ Time Left: ${timeLeft}s`;

    clearInterval(timer);

    timer = setInterval(()=>{
        timeLeft--;
        document.getElementById("timer").innerText = `⏱ Time Left: ${timeLeft}s`;

        if(timeLeft <= 2){
            document.getElementById("timer").style.color = "red";
        }

        if(timeLeft === 0){
            clearInterval(timer);
            autoSubmit();
        }
    },1000);
}

function selectOption(e){
    if(answered) return;

    clearInterval(timer);

    answered=true;

    const selected=e.target.innerText;
    const correct=questions[currentQuestion].answer;

    Array.from(optionsEl.children).forEach(li=>{
        if(li.innerText===correct){
            li.style.backgroundColor="lightgreen";
        }else{
            li.style.backgroundColor="salmon";
        }
    });

    if(selected === correct){
        score++;
    }

    nextBtn.classList.add("show");
}

function autoSubmit(){
    if(answered) return;

    answered = true;

    const correct = questions[currentQuestion].answer;

    Array.from(optionsEl.children).forEach(li=>{
        if(li.innerText === correct){
            li.style.backgroundColor = "lightgreen";
        } else {
            li.style.backgroundColor = "salmon";
        }
    });

    nextBtn.classList.add("show");
}

nextBtn.addEventListener("click",()=>{
    currentQuestion++;

    if(currentQuestion<questions.length){
        loadQuestion();
    }else{
        showResult();
    }
});

function showResult(){
    quizCard.classList.add("hide");
    resultCard.classList.remove("hide");
    scoreEl.innerText=score+" / "+questions.length;
}

document.getElementById("restart-btn").addEventListener("click",()=>{
    resultCard.classList.add("hide");
    categorySection.classList.remove("hide");

    selectedCategory=null;
    selectedDifficulty=null;
    questions=[];
    currentQuestion=0;
    score=0;
});