const questionInput = document.getElementById("questionInput");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");
const answerD = document.getElementById("answerD");
const correctAnswer = document.getElementById("correctAnswer");
const teacherHint = document.getElementById("teacherHint");

const addQuestionBtn = document.getElementById("addQuestionBtn");
const clearQuestionsBtn = document.getElementById("clearQuestionsBtn");
const messageBox = document.getElementById("messageBox");
const questionsList = document.getElementById("questionsList");
const questionCounter = document.getElementById("questionCounter");

addQuestionBtn.addEventListener("click", addQuestion);
clearQuestionsBtn.addEventListener("click", clearQuestions);

function getSavedQuestions() {
    const saved = localStorage.getItem("customQuestions");

    if (!saved) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}

function saveQuestions(questions) {
    localStorage.setItem("customQuestions", JSON.stringify(questions));
}

function addQuestion() {
    const question = questionInput.value.trim();
    const a = answerA.value.trim();
    const b = answerB.value.trim();
    const c = answerC.value.trim();
    const d = answerD.value.trim();
    const hint = teacherHint.value.trim();

    if (!question || !a || !b || !c || !d) {
        messageBox.textContent = "Моля, попълни въпроса и всички четири отговора.";
        return;
    }

    const newQuestion = {
        question: question,
        answers: [a, b, c, d],
        correct: Number(correctAnswer.value),
        teacher: hint || "Няма добавена подсказка от учител."
    };

    const questions = getSavedQuestions();
    questions.push(newQuestion);
    saveQuestions(questions);

    const totalQuestions = questions.length;

if (totalQuestions < 12) {
    messageBox.textContent = `Въпросът е добавен. Трябват ти още ${12 - totalQuestions} въпроса за пълна игра.`;
} else {
    messageBox.textContent = "Готово! Имаш минимум 12 въпроса и можеш да играеш персонализираната игра.";
}

    questionInput.value = "";
    answerA.value = "";
    answerB.value = "";
    answerC.value = "";
    answerD.value = "";
    teacherHint.value = "";
    correctAnswer.value = "0";

    renderQuestions();
}

function renderQuestions() {
    const questions = getSavedQuestions();

    questionsList.innerHTML = "";

    const count = questions.length;
    const remaining = Math.max(12 - count, 0);

    if (count < 12) {
        questionCounter.textContent = `Добавени въпроси: ${count} / 12. Остават още ${remaining} въпроса.`;
    } else {
        questionCounter.textContent = `Добавени въпроси: ${count}. Готово! Имаш достатъчно въпроси за цяла игра.`;
    }

    if (questions.length === 0) {
        questionsList.innerHTML = "<p>Все още няма добавени персонализирани въпроси.</p>";
        return;
    }

    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "saved-question";

        div.innerHTML = `
            <strong>${index + 1}. ${q.question}</strong>
            <p>A: ${q.answers[0]}</p>
            <p>B: ${q.answers[1]}</p>
            <p>C: ${q.answers[2]}</p>
            <p>D: ${q.answers[3]}</p>
            <p><strong>Верен отговор:</strong> ${String.fromCharCode(65 + q.correct)}</p>
            <button class="delete-btn" onclick="deleteQuestion(${index})">Изтрий</button>
        `;

        questionsList.appendChild(div);
    });
}

function deleteQuestion(index) {
    const questions = getSavedQuestions();
    questions.splice(index, 1);
    saveQuestions(questions);

    messageBox.textContent = "Въпросът е изтрит.";
    renderQuestions();
}

function clearQuestions() {
    const confirmDelete = confirm("Сигурен ли си, че искаш да изтриеш всички персонализирани въпроси?");

    if (!confirmDelete) {
        return;
    }

    localStorage.removeItem("customQuestions");
    messageBox.textContent = "Всички персонализирани въпроси са изтрити.";
    renderQuestions();
}

renderQuestions();