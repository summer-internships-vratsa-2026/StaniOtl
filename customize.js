const questionInput = document.getElementById("questionInput");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");
const answerD = document.getElementById("answerD");
const correctAnswer = document.getElementById("correctAnswer");
const teacherHint = document.getElementById("teacherHint");
const explanationInput = document.getElementById("explanationInput");

const addQuestionBtn = document.getElementById("addQuestionBtn");
const clearQuestionsBtn = document.getElementById("clearQuestionsBtn");
const defaultQuestionsBtn = document.getElementById("defaultQuestionsBtn");

const messageBox = document.getElementById("messageBox");
const questionsList = document.getElementById("questionsList");
const questionCounter = document.getElementById("questionCounter");

const groupNameInput = document.getElementById("groupNameInput");
const saveGroupBtn = document.getElementById("saveGroupBtn");
const groupsList = document.getElementById("groupsList");

const helpTimerInput = document.getElementById("helpTimerInput");
const saveTimerBtn = document.getElementById("saveTimerBtn");
const saveCountBtn = document.getElementById("saveCountBtn");
const questionCountSelect = document.getElementById("questionCountSelect");
const gradingStartInput = document.getElementById("gradingStartInput");
const gradingEndInput = document.getElementById("gradingEndInput");
const saveGradingBtn = document.getElementById("saveGradingBtn");

const ACTIVE_GROUP_KEY = "activeQuestionGroupId";
const DEFAULT_QUESTIONS_MODE_KEY = "useDefaultQuestions";
const HELP_TIMER_KEY = "helpTimerSeconds";

const customizeSounds = {
    lifeline: new Audio("sounds/lifeline.mp3")
};

function playCustomizeSound(name) {
    const sound = customizeSounds[name];

    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
}

if (addQuestionBtn) {
    addQuestionBtn.addEventListener("click", function (event) {
        event.preventDefault();
        addQuestion();
    });
} else {
    console.error("Липсва бутон с id='addQuestionBtn'");
}

if (clearQuestionsBtn) {
    clearQuestionsBtn.addEventListener("click", function (event) {
        event.preventDefault();
        clearQuestions();
    });
}

if (defaultQuestionsBtn) {
    defaultQuestionsBtn.addEventListener("click", function (event) {
        event.preventDefault();
        useDefaultQuestions();
    });
}

if (saveGroupBtn) {
    saveGroupBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveCurrentQuestionsAsGroup();
    });
} else {
    console.error("Липсва бутон с id='saveGroupBtn'");
}

if (saveTimerBtn) {
    saveTimerBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveHelpTimer();
    });
}

if (saveCountBtn) {
    saveCountBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveQuestionCount();
    });
}

if (saveGradingBtn) {
    saveGradingBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveGradingSettings();
    });
}
function escapeHTML(text) {
    return String(text || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getCurrentProfileId() {
    const fromStorage = localStorage.getItem("activeProfileId");
    return fromStorage || "guest";
}

function getScopedStorageKey(key) {
    return `${key}:${getCurrentProfileId()}`;
}

function getSavedQuestions() {
    const saved = localStorage.getItem(getScopedStorageKey("customQuestions"));

    if (!saved) {
        return [];
    }

    try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
            return parsed;
        }

        if (parsed && Array.isArray(parsed.questions)) {
            return parsed.questions;
        }

        if (parsed && typeof parsed === "object") {
            return Object.values(parsed);
        }

        return [];
    } catch (error) {
        console.warn("Failed to parse customQuestions from localStorage", error);
        return [];
    }
}

function saveQuestions(questions) {
    const toSave = Array.isArray(questions) ? questions : Array.from(questions || []);
    localStorage.setItem(getScopedStorageKey("customQuestions"), JSON.stringify(toSave));
}

function getSavedQuestionGroups() {
    const saved = localStorage.getItem(getScopedStorageKey("questionGroups"));

    if (!saved) {
        return [];
    }

    try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("Failed to parse questionGroups from localStorage", error);
        return [];
    }
}

function saveQuestionGroups(groups) {
    localStorage.setItem(getScopedStorageKey("questionGroups"), JSON.stringify(groups));
}

function getScopedSetting(key, fallback = null) {
    const value = localStorage.getItem(getScopedStorageKey(key));
    return value === null ? fallback : value;
}

function populateQuestionCountSelect() {
    if (!questionCountSelect) {
        return;
    }

    const poolSize = Math.max(getSavedQuestions().length, 15);
    questionCountSelect.setAttribute("min", "3");
    questionCountSelect.setAttribute("step", "1");
    questionCountSelect.removeAttribute("max");

    const savedValue = Number(localStorage.getItem(getScopedStorageKey("selectedQuestionCount")));
    const fallback = Math.min(15, poolSize);
    const selectedValue = Number.isFinite(savedValue) && savedValue >= 3
        ? Math.min(savedValue, poolSize)
        : fallback;

    questionCountSelect.value = String(selectedValue);
}

function setScopedSetting(key, value) {
    localStorage.setItem(getScopedStorageKey(key), String(value));
}

function removeScopedSetting(key) {
    localStorage.removeItem(getScopedStorageKey(key));
}

function getSelectedQuestionCount() {
    const value = Number(questionCountSelect?.value);

    if (!Number.isFinite(value)) {
        return 15;
    }

    return Math.max(3, Math.round(value));
}

function saveQuestionCount() {
    if (!questionCountSelect) {
        return;
    }

    const value = Number(questionCountSelect.value);

    if (!Number.isFinite(value)) {
        messageBox.textContent = "Моля, въведи валиден брой въпроси.";
        return;
    }

    const normalizedValue = Math.max(3, Math.round(value));
    questionCountSelect.value = String(normalizedValue);
    setScopedSetting("selectedQuestionCount", normalizedValue);
    playCustomizeSound("lifeline");
    messageBox.textContent = `Броят въпроси е запазен: ${normalizedValue}.`;
}

function saveGradingSettings() {
    const start = Number(gradingStartInput?.value);
    const end = Number(gradingEndInput?.value);

    if (!Number.isFinite(start) || !Number.isFinite(end)) {
        messageBox.textContent = "Моля, въведи валидни стойности за началната и крайната оценка.";
        return;
    }

    if (start >= end) {
        messageBox.textContent = "Началната оценка трябва да е по-малка от крайната.";
        return;
    }

    if (start < 2 || end > 6) {
        messageBox.textContent = "Оценките трябва да са между 2.00 и 6.00.";
        return;
    }

    setScopedSetting("gradingStart", start.toFixed(2));
    setScopedSetting("gradingEnd", end.toFixed(2));
    playCustomizeSound("lifeline");
    messageBox.textContent = `Оценяването е запазено: ${start.toFixed(2)} - ${end.toFixed(2)}.`;
}

function loadGradingSettings() {
    if (gradingStartInput) {
        const start = Number(localStorage.getItem(getScopedStorageKey("gradingStart")));
        gradingStartInput.value = Number.isFinite(start) ? start.toFixed(2) : "2.00";
    }

    if (gradingEndInput) {
        const end = Number(localStorage.getItem(getScopedStorageKey("gradingEnd")));
        gradingEndInput.value = Number.isFinite(end) ? end.toFixed(2) : "6.00";
    }
}

if (questionCountSelect) {
    questionCountSelect.addEventListener("input", () => {
        saveQuestionCount();
    });

    questionCountSelect.addEventListener("change", () => {
        saveQuestionCount();
    });
}

function addQuestion() {
    const question = questionInput.value.trim();
    const a = answerA.value.trim();
    const b = answerB.value.trim();
    const c = answerC.value.trim();
    const d = answerD.value.trim();
    const hint = teacherHint.value.trim();
    const explanation = explanationInput ? explanationInput.value.trim() : "";

    if (!question || !a || !b || !c || !d) {
        messageBox.textContent = "Моля, попълни въпроса и всички четири отговора.";
        return;
    }

    const newQuestion = {
        question: question,
        answers: [a, b, c, d],
        correct: Number(correctAnswer.value),
        teacher: hint || "Няма добавена подсказка от учител.",
        explanation: explanation || "Няма добавено пояснение за този въпрос."
    };
const questions = getSavedQuestions();
questions.push(newQuestion);
saveQuestions(questions);

playCustomizeSound("lifeline");

setScopedSetting(DEFAULT_QUESTIONS_MODE_KEY, "false");
    const totalQuestions = questions.length;
const neededQuestions = getSelectedQuestionCount();

if (totalQuestions < neededQuestions) {
    messageBox.textContent = `Въпросът е добавен. Трябват ти още ${neededQuestions - totalQuestions} въпроса за тази група.`;
} else {
    messageBox.textContent = `Готово! Имаш минимум ${neededQuestions} въпроса и можеш да ги запазиш като готова група.`;
}

    questionInput.value = "";
    answerA.value = "";
    answerB.value = "";
    answerC.value = "";
    answerD.value = "";
    teacherHint.value = "";

    if (explanationInput) {
        explanationInput.value = "";
    }

    correctAnswer.value = "0";

    renderQuestions();
}

function renderQuestions() {
    const questions = getSavedQuestions();
    populateQuestionCountSelect();

    if (!questionsList) {
        return;
    }

    questionsList.innerHTML = "";

    const count = questions.length;
const neededQuestions = getSelectedQuestionCount();
const remaining = Math.max(neededQuestions - count, 0);

if (questionCounter) {
    if (count < neededQuestions) {
        questionCounter.textContent = `Добавени въпроси: ${count} / ${neededQuestions}. Остават още ${remaining} въпроса.`;
    } else {
        questionCounter.textContent = `Добавени въпроси: ${count}. Готово! Имаш достатъчно въпроси за избраната игра.`;
    }
}

    if (questions.length === 0) {
        questionsList.innerHTML = "<p>Все още няма добавени персонализирани въпроси.</p>";
        return;
    }

    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "saved-question";

        div.innerHTML = `
            <strong>${index + 1}. ${escapeHTML(q.question)}</strong>
            <p>A: ${escapeHTML(q.answers[0])}</p>
            <p>B: ${escapeHTML(q.answers[1])}</p>
            <p>C: ${escapeHTML(q.answers[2])}</p>
            <p>D: ${escapeHTML(q.answers[3])}</p>
            <p><strong>Верен отговор:</strong> ${String.fromCharCode(65 + q.correct)}</p>
            <p><strong>Подсказка от учител:</strong> ${escapeHTML(q.teacher || "Няма добавена подсказка.")}</p>
            <p><strong>Пояснение:</strong> ${escapeHTML(q.explanation || "Няма добавено пояснение.")}</p>
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
    const confirmDelete = confirm("Сигурен ли си, че искаш да изтриеш всички текущи персонализирани въпроси?");

    if (!confirmDelete) {
        return;
    }

    localStorage.removeItem(getScopedStorageKey("customQuestions"));

    messageBox.textContent = "Текущите персонализирани въпроси са изтрити.";

    renderQuestions();
}

function useDefaultQuestions() {
    setScopedSetting(DEFAULT_QUESTIONS_MODE_KEY, "true");
    localStorage.removeItem(getScopedStorageKey(ACTIVE_GROUP_KEY));
    setScopedSetting("activeQuestionGroupName", "Стандартни въпроси");

    messageBox.textContent = "Стандартните въпроси са избрани за игра.";

    renderQuestionGroups();
}

async function getQuestionGroups() {
    if (typeof supabaseClient === "undefined") {
        console.error("Supabase не е зареден.");
        messageBox.textContent = "Supabase не е зареден. Провери supabase-config.js и script таговете в customize.html.";
        return [];
    }

    const { data, error } = await supabaseClient
        .from("question_groups")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Грешка при зареждане на групите:", error);
        messageBox.textContent = "Грешка при зареждане на групите от Supabase.";
        return [];
    }

    return data || [];
}

async function saveCurrentQuestionsAsGroup() {
    const questions = getSavedQuestions();
    const neededQuestions = getSelectedQuestionCount();

    if (!groupNameInput) {
        messageBox.textContent = "Липсва поле за име на групата.";
        return;
    }

    const groupName = groupNameInput.value.trim();

    if (!groupName) {
        messageBox.textContent = "Моля, въведи име на групата.";
        return;
    }

    if (questions.length < neededQuestions) {
        messageBox.textContent = `Трябва да имаш минимум ${neededQuestions} въпроса, за да запазиш тази група.`;
        return;
    }

    if (typeof supabaseClient === "undefined") {
        messageBox.textContent = "Supabase не е зареден. Провери supabase-config.js.";
        return;
    }

    const questionsToSave = questions.slice(0, neededQuestions);

    const { data, error } = await supabaseClient
        .from("question_groups")
        .insert([
            {
                name: groupName,
                questions: questionsToSave
            }
        ])
        .select()
        .single();

    if (error) {
        console.error("Грешка при запис в Supabase:", error);
        messageBox.textContent = "Грешка при запазване на групата в Supabase.";
        return;
    }

    localStorage.setItem(getScopedStorageKey(ACTIVE_GROUP_KEY), data.id);
    localStorage.setItem(getScopedStorageKey("customQuestions"), JSON.stringify(data.questions));
    setScopedSetting(DEFAULT_QUESTIONS_MODE_KEY, "false");
    setScopedSetting("activeQuestionGroupName", data.name);
    setScopedSetting("selectedQuestionCount", neededQuestions);

    groupNameInput.value = "";

    if (typeof playCustomizeSound === "function") {
        playCustomizeSound("lifeline");
    }

    messageBox.textContent = `Групата „${data.name}“ е запазена успешно в Supabase.`;

    await renderQuestionGroups();
}

async function renderQuestionGroups() {
    if (!groupsList) {
        return;
    }

    if (typeof supabaseClient === "undefined") {
        groupsList.innerHTML = "<p>Supabase не е зареден.</p>";
        return;
    }

    const activeGroupId = localStorage.getItem(getScopedStorageKey(ACTIVE_GROUP_KEY));

    groupsList.innerHTML = "";

    if (getScopedSetting(DEFAULT_QUESTIONS_MODE_KEY, "false") === "true") {
        groupsList.innerHTML += `
            <div class="group-item active-group">
                <div class="group-title">Стандартни въпроси — избрани за игра</div>
                <div class="group-info">Играта ще използва вградените стандартни въпроси.</div>
            </div>
        `;
    }

    const { data, error } = await supabaseClient
        .from("question_groups")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Грешка при зареждане от Supabase:", error);
        groupsList.innerHTML += "<p>Грешка при зареждане на групите от Supabase.</p>";
        return;
    }

    const groups = data || [];

    if (groups.length === 0) {
        groupsList.innerHTML += "<p>Все още няма запазени групи въпроси.</p>";
        return;
    }

    groups.forEach(group => {
        const div = document.createElement("div");
        div.className = "group-item";

        if (group.id === activeGroupId) {
            div.classList.add("active-group");
        }

        const createdDate = group.created_at
            ? new Date(group.created_at).toLocaleString("bg-BG")
            : "няма дата";

        div.innerHTML = `
            <div class="group-title">
                ${escapeHTML(group.name)} ${group.id === activeGroupId ? "— избрана за игра" : ""}
            </div>

            <div class="group-info">
                ${Array.isArray(group.questions) ? group.questions.length : 0} въпроса | Създадена: ${createdDate}
            </div>

            <div class="group-actions">
                <button class="use-group-btn" onclick="useQuestionGroup('${group.id}')">
                    Избери за игра
                </button>

                <button class="edit-group-btn" onclick="loadGroupForEditing('${group.id}')">
                    Зареди за редакция
                </button>

                <button class="delete-group-btn" onclick="deleteQuestionGroup('${group.id}')">
                    Изтрий
                </button>
            </div>
        `;

        groupsList.appendChild(div);
    });
}

async function useQuestionGroup(groupId) {
    const { data, error } = await supabaseClient
        .from("question_groups")
        .select("*")
        .eq("id", groupId)
        .single();

    if (error || !data) {
        console.error("Грешка при избор на група:", error);
        messageBox.textContent = "Групата не беше намерена.";
        return;
    }

    localStorage.setItem(getScopedStorageKey(ACTIVE_GROUP_KEY), data.id);
    localStorage.setItem(getScopedStorageKey("customQuestions"), JSON.stringify(data.questions));
    setScopedSetting(DEFAULT_QUESTIONS_MODE_KEY, "false");
    setScopedSetting("activeQuestionGroupName", data.name);
    setScopedSetting("selectedQuestionCount", data.questions.length);

    messageBox.textContent = `Групата „${data.name}“ е избрана за игра.`;

    await renderQuestionGroups();
}

async function loadGroupForEditing(groupId) {
    const { data, error } = await supabaseClient
        .from("question_groups")
        .select("*")
        .eq("id", groupId)
        .single();

    if (error || !data) {
        console.error("Грешка при зареждане за редакция:", error);
        messageBox.textContent = "Групата не беше намерена.";
        return;
    }

    localStorage.setItem(getScopedStorageKey("customQuestions"), JSON.stringify(data.questions));
    localStorage.setItem(getScopedStorageKey(ACTIVE_GROUP_KEY), data.id);
    setScopedSetting(DEFAULT_QUESTIONS_MODE_KEY, "false");
    setScopedSetting("activeQuestionGroupName", data.name);
    setScopedSetting("selectedQuestionCount", data.questions.length);

    if (questionCountSelect) {
        questionCountSelect.value = data.questions.length;
    }

    messageBox.textContent = `Групата „${data.name}“ е заредена за редакция.`;

    renderQuestions();
    await renderQuestionGroups();
}

async function deleteQuestionGroup(groupId) {
    const confirmDelete = confirm("Сигурен ли си, че искаш да изтриеш тази група въпроси от Supabase?");

    if (!confirmDelete) {
        return;
    }

    const { error } = await supabaseClient
        .from("question_groups")
        .delete()
        .eq("id", groupId);

    if (error) {
        console.error("Грешка при изтриване от Supabase:", error);
        messageBox.textContent = "Грешка при изтриване на групата.";
        return;
    }

    const activeGroupId = localStorage.getItem(getScopedStorageKey(ACTIVE_GROUP_KEY));

    if (activeGroupId === groupId) {
        localStorage.removeItem(getScopedStorageKey(ACTIVE_GROUP_KEY));
        localStorage.removeItem(getScopedStorageKey("customQuestions"));
        removeScopedSetting("activeQuestionGroupName");
    }

    messageBox.textContent = "Групата е изтрита от Supabase.";

    await renderQuestionGroups();
}

function loadHelpTimerSetting() {
    if (!helpTimerInput) {
        return;
    }

    const savedTimer = localStorage.getItem(HELP_TIMER_KEY);

    if (savedTimer) {
        helpTimerInput.value = savedTimer;
    } else {
        helpTimerInput.value = "30";
    }
}

function saveHelpTimer() {
    const seconds = Number(helpTimerInput.value);

    if (seconds < 5 || seconds > 120) {
        messageBox.textContent = "Моля, въведи време между 5 и 120 секунди.";
        return;
    }

    localStorage.setItem(HELP_TIMER_KEY, seconds.toString());
    playCustomizeSound("lifeline");
    messageBox.textContent = `Таймерът за помощ е запазен: ${seconds} секунди.`;
}

renderQuestions();
renderQuestionGroups();
loadHelpTimerSetting();
loadGradingSettings();
