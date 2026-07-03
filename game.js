
const defaultQuestions = [
    {
        question: "Коя е столицата на България?",
        answers: ["Пловдив", "София", "Варна", "Бургас"],
        correct: 1,
        teacher: "Столицата на България е София. Тя е най-големият град в страната."
    },
    {
        question: "Колко е 9 × 8?",
        answers: ["64", "72", "81", "78"],
        correct: 1,
        teacher: "9 по 8 е 72."
    },
    {
        question: "Кой е автор на романа „Под игото“?",
        answers: ["Иван Вазов", "Христо Ботев", "Елин Пелин", "Йордан Йовков"],
        correct: 0,
        teacher: "„Под игото“ е написан от Иван Вазов."
    },
    {
        question: "Кой орган в човешкото тяло изпомпва кръвта?",
        answers: ["Бял дроб", "Черен дроб", "Сърце", "Стомах"],
        correct: 2,
        teacher: "Сърцето изпомпва кръвта в човешкото тяло."
    },
    {
        question: "Кое от изброените е планета?",
        answers: ["Луна", "Марс", "Слънце", "Комета"],
        correct: 1,
        teacher: "Марс е планета. Луната е спътник, а Слънцето е звезда."
    },
    {
        question: "Коя река образува част от северната граница на България?",
        answers: ["Дунав", "Марица", "Искър", "Струма"],
        correct: 0,
        teacher: "Река Дунав образува част от северната граница на България."
    },
    {
        question: "Коя част на речта назовава действие?",
        answers: ["Съществително име", "Прилагателно име", "Глагол", "Местоимение"],
        correct: 2,
        teacher: "Глаголът назовава действие или състояние."
    },
    {
        question: "Колко градуса има правият ъгъл?",
        answers: ["45°", "90°", "180°", "360°"],
        correct: 1,
        teacher: "Правият ъгъл е точно 90 градуса."
    },
    {
        question: "Кой празник се отбелязва на 24 май в България?",
        answers: [
            "Ден на независимостта",
            "Ден на народните будители",
            "Ден на българската просвета и култура",
            "Национален празник"
        ],
        correct: 2,
        teacher: "На 24 май честваме българската просвета, култура и славянската писменост."
    },
    {
        question: "Кое животно е бозайник?",
        answers: ["Костенурка", "Делфин", "Жаба", "Щука"],
        correct: 1,
        teacher: "Делфинът е бозайник, защото ражда малки и ги кърми."
    },
    {
        question: "Кой химичен елемент се означава с O?",
        answers: ["Злато", "Кислород", "Водород", "Въглерод"],
        correct: 1,
        teacher: "С буквата O се означава кислородът."
    },
    {
        question: "Кой е най-високият връх в България?",
        answers: ["Ботев", "Мусала", "Вихрен", "Черни връх"],
        correct: 1,
        teacher: "Мусала е най-високият връх в България."
    }
];
let questions = loadSavedQuestions();

function loadSavedQuestions() {
    const savedQuestions = localStorage.getItem("customQuestions");

    if (!savedQuestions) {
        return defaultQuestions;
    }

    try {
        const parsedQuestions = JSON.parse(savedQuestions);

        if (Array.isArray(parsedQuestions) && parsedQuestions.length >= 12) {
            return parsedQuestions.slice(0, 12);
        }

        alert("За персонализирана игра трябва да имаш минимум 12 въпроса. Засега ще се заредят стандартните въпроси.");
        return defaultQuestions;

    } catch (error) {
        console.error("Грешка при зареждане на персонализираните въпроси:", error);
        return defaultQuestions;
    }
}

const levels = [
    "2.50", "3.00", "3.25", "3.50", "3.75", "4.00",
    "4.25", "4.50", "4.75", "5.00", "5.50", "6.00"
];

let currentQuestion = 0;
let answered = false;
let usedFifty = false;
let usedFriend = false;
let usedTeacher = false;

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");
const menuBtn = document.getElementById("menuBtn");
const endMenuBtn = document.getElementById("endMenuBtn");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const currentGrade = document.getElementById("currentGrade");
const messageBox = document.getElementById("messageBox");

const answerButtons = document.querySelectorAll(".answer-btn");

const fiftyBtn = document.getElementById("fiftyBtn");
const friendBtn = document.getElementById("friendBtn");
const teacherBtn = document.getElementById("teacherBtn");

const levelsList = document.getElementById("levelsList");
const menuSide = document.getElementById("menuSide");

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
nextBtn.addEventListener("click", nextQuestion);
menuBtn.addEventListener("click", goToMenu);
endMenuBtn.addEventListener("click", goToMenu);


fiftyBtn.addEventListener("click", useFiftyFifty);
friendBtn.addEventListener("click", askClassmate);
teacherBtn.addEventListener("click", askTeacher);

answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectAnswer(index));
});

function startGame() {
    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    currentQuestion = 0;
    answered = false;
    usedFifty = false;
    usedFriend = false;
    usedTeacher = false;

    fiftyBtn.disabled = false;
friendBtn.disabled = false;
teacherBtn.disabled = false;

fiftyBtn.classList.remove("used");
friendBtn.classList.remove("used");
teacherBtn.classList.remove("used");

   menuSide.classList.add("hidden");
levelsList.classList.remove("hidden");
createLevels();
loadQuestion();

createLevels();
    loadQuestion();
}

function createLevels() {
    levelsList.innerHTML = "";

    levels.forEach((level, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>Въпрос ${index + 1}</span>
            <span>${level}</span>
        `;

        if (index === 5 || index === 9 || index === 11) {
            li.classList.add("safe");
        }

        if (index === currentQuestion) {
            li.classList.add("active");
        }

        levelsList.appendChild(li);
    });
}

function loadQuestion() {
    answered = false;
    nextBtn.style.display = "none";
    messageBox.textContent = "Избери верен отговор.";

    const q = questions[currentQuestion];

    questionNumber.textContent = `Въпрос ${currentQuestion + 1} от ${questions.length}`;
    currentGrade.textContent = `Оценка: ${levels[currentQuestion]}`;
    questionText.textContent = q.question;

    answerButtons.forEach((button, index) => {
        button.textContent = `${String.fromCharCode(65 + index)}: ${q.answers[index]}`;
        button.disabled = false;
        button.className = "answer-btn";
        button.style.visibility = "visible";
    });

    createLevels();
}

function selectAnswer(index) {
    if (answered) {
        return;
    }

    answered = true;

    const q = questions[currentQuestion];
    const correctIndex = q.correct;

    answerButtons.forEach(button => {
        button.disabled = true;
    });

    if (index === correctIndex) {
        answerButtons[index].classList.add("correct");
        messageBox.textContent = "Браво! Това е верният отговор.";

        if (currentQuestion === questions.length - 1) {
            setTimeout(() => endGame(true), 1200);
        } else {
            nextBtn.style.display = "inline-block";
        }
    } else {
        answerButtons[index].classList.add("wrong");
        answerButtons[correctIndex].classList.add("correct");

        messageBox.textContent = `Грешен отговор. Верният отговор е: ${q.answers[correctIndex]}.`;

        setTimeout(() => endGame(false), 1800);
    }
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function useFiftyFifty() {
    if (usedFifty || answered) {
        return;
    }
usedFifty = true;
fiftyBtn.disabled = true;
fiftyBtn.classList.add("used");

    const q = questions[currentQuestion];
    const wrongAnswers = [];

    q.answers.forEach((answer, index) => {
        if (index !== q.correct) {
            wrongAnswers.push(index);
        }
    });

    wrongAnswers.sort(() => Math.random() - 0.5);

    const toHide = wrongAnswers.slice(0, 2);

    toHide.forEach(index => {
        answerButtons[index].style.visibility = "hidden";
        answerButtons[index].disabled = true;
    });

    messageBox.textContent = "50/50 премахна два грешни отговора.";
}

function askClassmate() {

    if (usedFriend || answered) {
        return;
    }

    usedFriend = true;
friendBtn.disabled = true;
friendBtn.classList.add("used");

    const q = questions[currentQuestion];

    let suggestedAnswer;
    const chance = Math.random();

    if (chance < 0.75) {
        suggestedAnswer = q.correct;
    } else {
        const wrongAnswers = q.answers
            .map((answer, index) => index)
            .filter(index => index !== q.correct);

        suggestedAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    }

    messageBox.textContent =
        `Съученикът мисли, че отговорът е ${String.fromCharCode(65 + suggestedAnswer)}: ${q.answers[suggestedAnswer]}.`;
}

function askTeacher() {
    if (usedTeacher || answered) {
        return;
    }

    usedTeacher = true;
teacherBtn.disabled = true;
teacherBtn.classList.add("used");

    const q = questions[currentQuestion];

    messageBox.textContent = `Учителят подсказва: ${q.teacher}`;
}

function endGame(won) {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");

    const finalGrade = document.getElementById("finalGrade");
    const finalMessage = document.getElementById("finalMessage");

    if (won) {
        finalGrade.textContent = "Отличен 6.00!";
        finalMessage.textContent = "Поздравления! Ти стана отличник!";
    } else {
        const achievedIndex = Math.max(currentQuestion - 1, 0);
        const grade = currentQuestion === 0 ? "2.00" : levels[achievedIndex];

        finalGrade.textContent = `Твоята оценка: ${grade}`;

        if (grade === "2.00") {
            finalMessage.textContent = "Не се отказвай! Опитай отново и ще се справиш по-добре.";
        } else {
            finalMessage.textContent = "Добра игра! Следващия път можеш да стигнеш още по-високо.";
        }
    }
}

function restartGame() {
    startGame();
}
function goToMenu() {
    gameScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    currentQuestion = 0;
    answered = false;
    usedFifty = false;
    usedFriend = false;
    usedTeacher = false;

    nextBtn.style.display = "none";

    if (messageBox) {
        messageBox.textContent = "Избери верен отговор.";
    }

    answerButtons.forEach(button => {
        button.disabled = false;
        button.className = "answer-btn";
        button.style.visibility = "visible";
    });

    fiftyBtn.disabled = false;
    friendBtn.disabled = false;
    teacherBtn.disabled = false;
    fiftyBtn.classList.remove("used");
friendBtn.classList.remove("used");
teacherBtn.classList.remove("used");

    // Това изчиства оценките отстрани, за да изглежда менюто като в началото
    levelsList.innerHTML = "";
levelsList.classList.add("hidden");
menuSide.classList.remove("hidden");
}
levelsList.innerHTML = "";
