const defaultQuestions = [
   {
    question: "Коя е столицата на България?",
    answers: ["Пловдив", "София", "Варна", "Бургас"],
    correct: 1,
    teacher: "Столицата на България е София. Тя е най-големият град в страната.",
    explanation: "София е столицата на България и там се намират основните държавни институции."
    },

    {
        question: "Колко е 9 × 8?",
        answers: ["64", "72", "81", "78"],
        correct: 1,
        teacher: "9 по 8 е 72.",
        explanation: "9 × 8 означава числото 8 да се събере 9 пъти. Получава се 72."
    },
    {
        question: "Кой е автор на романа „Под игото“?",
        answers: ["Иван Вазов", "Христо Ботев", "Елин Пелин", "Йордан Йовков"],
        correct: 0,
        teacher: "„Под игото“ е написан от Иван Вазов.",
        explanation: "„Под игото“ е роман от Иван Вазов. Творбата е едно от най-важните произведения в българската литература."
    },
    {
        question: "Кой орган в човешкото тяло изпомпва кръвта?",
        answers: ["Бял дроб", "Черен дроб", "Сърце", "Стомах"],
        correct: 2,
        teacher: "Сърцето изпомпва кръвта в човешкото тяло.",
        explanation: "Сърцето изпомпва кръвта в тялото. То работи като помпа и помага кислородът и хранителните вещества да достигат до органите."
    },
    {
        question: "Кое от изброените е планета?",
        answers: ["Луна", "Марс", "Слънце", "Комета"],
        correct: 1,
        teacher: "Марс е планета. Луната е спътник, а Слънцето е звезда.",
        explanation:  "Марс е планета от Слънчевата система. Луната е естествен спътник, Слънцето е звезда, а кометата е малко небесно тяло."
    },
    {
        question: "Коя река образува част от северната граница на България?",
        answers: ["Дунав", "Марица", "Искър", "Струма"],
        correct: 0,
        teacher: "Река Дунав образува част от северната граница на България.",
        explanation:  "Река Дунав образува голяма част от северната граница на България с Румъния."
    },
    {
        question: "Коя част на речта назовава действие?",
        answers: ["Съществително име", "Прилагателно име", "Глагол", "Местоимение"],
        correct: 2,
        teacher: "Глаголът назовава действие или състояние.",
        explanation: "Глаголът е част на речта, която назовава действие или състояние. Например: уча, пиша, мисля, играя."
    },
    {
        question: "Колко градуса има правият ъгъл?",
        answers: ["45°", "90°", "180°", "360°"],
        correct: 1,
        teacher: "Правият ъгъл е точно 90 градуса.",
        explanation: "Правият ъгъл винаги е 90 градуса. Той изглежда като ъгъла на квадрат или правоъгълник."
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
        teacher: "На 24 май честваме българската просвета, култура и славянската писменост.",
        explanation: "На 24 май в България се отбелязва Денят на българската просвета и култура и на славянската писменост."
    },
    {
        question: "Кое животно е бозайник?",
        answers: ["Костенурка", "Делфин", "Жаба", "Щука"],
        correct: 1,
        teacher: "Делфинът е бозайник, защото ражда малки и ги кърми.",
        explanation: "Делфинът е бозайник, защото ражда малки, диша с бели дробове и кърми потомството си."
    },
    {
        question: "Кой химичен елемент се означава с O?",
        answers: ["Злато", "Кислород", "Водород", "Въглерод"],
        correct: 1,
        teacher: "С буквата O се означава кислородът.",
        explanation: "Символът O означава кислород. Той е химичен елемент, необходим за дишането на хората, животните и много живи организми."
    },
    {
        question: "Кой е най-високият връх в България?",
        answers: ["Ботев", "Мусала", "Вихрен", "Черни връх"],
        correct: 1,
        teacher: "Мусала е най-високият връх в България.",
        explanation:  "Мусала е най-високият връх в България. Той се намира в Рила планина."
    },
    {
        question: "Коя е най-голямата планета в Слънчевата система?",
        answers: ["Земя", "Марс", "Юпитер", "Венера"],
        correct: 2,
        teacher: "Юпитер е най-голямата планета в Слънчевата система.",
        explanation: "Юпитер е най-голямата планета в Слънчевата система. Той е газов гигант и е много по-голям от Земята."
    },
    {
        question: "Кой е написал стихотворението „Хаджи Димитър“?",
        answers: ["Иван Вазов", "Христо Ботев", "Пейо Яворов", "Алеко Константинов"],
        correct: 1,
        teacher: "„Хаджи Димитър“ е стихотворение от Христо Ботев.",
        explanation: "Стихотворението „Хаджи Димитър“ е написано от Христо Ботев. То е посветено на подвига и саможертвата на героя."
    },
    {
        question: "Колко е 144 : 12?",
        answers: ["10", "11", "12", "14"],
        correct: 2,
        teacher: "144 разделено на 12 е 12.",
        explanation:  "144 : 12 е 12, защото 12 × 12 = 144."
    }
];
let questions = loadSavedQuestions();

function getCurrentProfileId() {
    const fromStorage = localStorage.getItem("activeProfileId");
    return fromStorage || "guest";
}

function getScopedStorageKey(key) {
    return `${key}:${getCurrentProfileId()}`;
}

function loadSavedQuestions() {
    const ACTIVE_GROUP_KEY = "activeQuestionGroupId";
    const DEFAULT_QUESTIONS_MODE_KEY = "useDefaultQuestions";

    if (localStorage.getItem(getScopedStorageKey(DEFAULT_QUESTIONS_MODE_KEY)) === "true") {
        return defaultQuestions;
    }

    const savedGroups = localStorage.getItem(getScopedStorageKey("questionGroups"));
    const activeGroupId = localStorage.getItem(getScopedStorageKey(ACTIVE_GROUP_KEY));

    if (savedGroups && activeGroupId) {
        try {
            const groups = JSON.parse(savedGroups);
            const activeGroup = groups.find(group => group.id === activeGroupId);

            if (
                activeGroup &&
                Array.isArray(activeGroup.questions) &&
                activeGroup.questions.length >= 15
            ) {
                return activeGroup.questions.slice(0, 15);
            }
        } catch (error) {
            console.error("Грешка при зареждане на групата въпроси:", error);
        }
    }

    const savedQuestions = localStorage.getItem(getScopedStorageKey("customQuestions"));

    if (!savedQuestions) {
        return defaultQuestions;
    }

    try {
        const parsedQuestions = JSON.parse(savedQuestions);

        if (Array.isArray(parsedQuestions) && parsedQuestions.length >= 15) {
            return parsedQuestions.slice(0, 15);
        }

        alert("За персонализирана игра трябва да имаш минимум 15 въпроса. Засега ще се заредят стандартните въпроси.");
        return defaultQuestions;

    } catch (error) {
        console.error("Грешка при зареждане на персонализираните въпроси:", error);
        return defaultQuestions;
    }
}

const levels = [
    "2.25", "2.50", "2.75", "3.00", "3.25",
    "3.50", "3.75", "4.00", "4.25", "4.50",
    "4.75", "5.00", "5.25", "5.50", "6.00"
];

let currentQuestion = 0;
let answered = false;
let usedFifty = false;
let usedFriend = false;
let usedTeacher = false;
let helpTimerInterval = null;

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
const startGroupLabel = document.getElementById("startGroupLabel");
const gameGroupLabel = document.getElementById("gameGroupLabel");

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

function shuffleQuestions(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function shuffleAnswers(question) {
    const shuffledQuestion = {
        ...question,
        answers: [...question.answers]
    };

    for (let i = shuffledQuestion.answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestion.answers[i], shuffledQuestion.answers[j]] = [shuffledQuestion.answers[j], shuffledQuestion.answers[i]];
    }

    const correctIndex = shuffledQuestion.answers.indexOf(question.answers[question.correct]);
    shuffledQuestion.correct = correctIndex;

    return shuffledQuestion;
}

function getCurrentQuestionGroupLabel() {
    const savedGroupName = localStorage.getItem(getScopedStorageKey("activeQuestionGroupName"));

    if (savedGroupName) {
        return savedGroupName;
    }

    if (localStorage.getItem(getScopedStorageKey("useDefaultQuestions")) === "true") {
        return "Стандартни въпроси";
    }

    const savedQuestions = localStorage.getItem(getScopedStorageKey("customQuestions"));

    if (savedQuestions) {
        try {
            const parsedQuestions = JSON.parse(savedQuestions);
            if (Array.isArray(parsedQuestions) && parsedQuestions.length >= 15) {
                return "Персонализирани въпроси";
            }
        } catch (error) {
            console.warn("Неуспешно четене на персонализирани въпроси:", error);
        }
    }

    return "Стандартни въпроси";
}

function updateQuestionGroupLabel() {
    const labelText = `Източник: ${getCurrentQuestionGroupLabel()}`;

    if (startGroupLabel) {
        startGroupLabel.textContent = labelText;
    }

    if (gameGroupLabel) {
        gameGroupLabel.textContent = labelText;
    }
}

function startGame() {
    clearHelpTimer();

    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    currentQuestion = 0;
    const baseQuestions = loadSavedQuestions();
    questions = shuffleQuestions(baseQuestions).map(shuffleAnswers);
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
    updateQuestionGroupLabel();
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

        if (index === 4 || index === 9 || index === 14) {
            li.classList.add("safe");
        }

        if (index === currentQuestion) {
            li.classList.add("active");
        }

        levelsList.appendChild(li);
    });
}

function loadQuestion() {
    updateQuestionGroupLabel();
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
        clearHelpTimer();
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

    const explanation = q.explanation || q.teacher || "Няма добавено пояснение за този въпрос.";

    messageBox.innerHTML = `
        <strong>Браво! Това е верният отговор.</strong><br>
        ${explanation}
    `;
        if (currentQuestion === questions.length - 1) {
            setTimeout(() => endGame(true), 1200);
        } else {
            nextBtn.style.display = "inline-block";
        }
    } 
    else {
        answerButtons[index].classList.add("wrong");
        answerButtons[correctIndex].classList.add("correct");

        const explanation = q.explanation || q.teacher || "Няма добавено пояснение за този въпрос.";

    messageBox.innerHTML = `
        <strong>Грешен отговор.</strong><br>
        Верният отговор е: <strong>${q.answers[correctIndex]}</strong>.<br>
        ${explanation}
`;

        setTimeout(() => endGame(false), 1800);
    }
}

function nextQuestion() {
    clearHelpTimer();
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
function clearHelpTimer() {
    if (helpTimerInterval) {
        clearInterval(helpTimerInterval);
        helpTimerInterval = null;
    }
}

function escapeHTML(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getHelpTimerSeconds() {
    const savedTimer = localStorage.getItem("helpTimerSeconds");
    const seconds = Number(savedTimer);

    if (!savedTimer || isNaN(seconds)) {
        return 30;
    }

    if (seconds < 5) {
        return 5;
    }

    if (seconds > 120) {
        return 120;
    }

    return seconds;
}

function startHelpTimer(type, finalMessageCallback) {
    clearHelpTimer();

    let seconds = getHelpTimerSeconds();
    const q = questions[currentQuestion];

    showHelpTimer(type, seconds, q.question);

    helpTimerInterval = setInterval(() => {
        seconds--;

        showHelpTimer(type, seconds, q.question);

        if (seconds <= 0) {
            clearHelpTimer();
            finalMessageCallback();
        }
    }, 1000);
}

function showHelpTimer(type, seconds, question) {
    const title = type === "friend"
        ? "Помощ от съученик"
        : "Помощ от учител";

    messageBox.innerHTML = `
        <div class="help-timer-box">
            <div class="help-timer-title">${title}</div>
            <div class="help-question">
                <strong>Въпрос:</strong><br>
                ${escapeHTML(question)}
            </div>
            <div class="help-countdown">${seconds}</div>
            <div class="help-small-text">
                Изчакай помощта... Отговорът ще се появи след края на таймера.
            </div>
        </div>
    `;
}
function askClassmate() {
    if (usedFriend || answered) {
        return;
    }

    usedFriend = true;
    friendBtn.disabled = true;
    friendBtn.classList.add("used");

    startHelpTimer("friend", function () {
        if (answered) {
            return;
        }

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

        messageBox.innerHTML = `
            <strong>Съученикът мисли, че отговорът е:</strong><br>
            ${String.fromCharCode(65 + suggestedAnswer)}: ${escapeHTML(q.answers[suggestedAnswer])}
        `;
    });
}

function askTeacher() {
    if (usedTeacher || answered) {
        return;
    }

    usedTeacher = true;
    teacherBtn.disabled = true;
    teacherBtn.classList.add("used");

    startHelpTimer("teacher", function () {
        if (answered) {
            return;
        }

        const q = questions[currentQuestion];

        const teacherHelp = q.teacher || q.explanation || "Учителят няма добавена подсказка за този въпрос.";

        messageBox.innerHTML = `
            <strong>Учителят подсказва:</strong><br>
            ${escapeHTML(teacherHelp)}
        `;
    });
}

function showConfetti() {
    const existing = document.querySelector(".confetti-layer");
    if (existing) {
        existing.remove();
    }

    const layer = document.createElement("div");
    layer.className = "confetti-layer";

    const colors = ["#f5c542", "#ff6b6b", "#4ade80", "#38bdf8", "#f472b6", "#ffffff"];

    for (let i = 0; i < 45; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[i % colors.length];
        piece.style.animationDuration = `${2.4 + Math.random() * 1.6}s`;
        piece.style.animationDelay = `${Math.random() * 0.3}s`;
        piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        layer.appendChild(piece);
    }

    document.body.appendChild(layer);

    setTimeout(() => {
        layer.remove();
    }, 3200);
}

function endGame(won) {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");

    const finalGrade = document.getElementById("finalGrade");
    const finalMessage = document.getElementById("finalMessage");

    if (won) {
        finalGrade.textContent = "Отличен 6.00!";
        finalMessage.textContent = "Поздравления! Ти стана отличник!";
        showConfetti();
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
    clearHelpTimer();

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
    updateQuestionGroupLabel();
}

updateQuestionGroupLabel();
