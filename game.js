const SOUND_MUTED_KEY = "soundMuted";

function isSoundMuted() {
    return localStorage.getItem(SOUND_MUTED_KEY) === "true";
}

function updateSoundToggleButton() {
    const soundToggleBtn = document.getElementById("soundToggleBtn");

    if (!soundToggleBtn) {
        return;
    }

    if (isSoundMuted()) {
        soundToggleBtn.textContent = "🔇 Изключен";
        soundToggleBtn.title = "Звукът е изключен";
        soundToggleBtn.classList.add("sound-off");
    } else {
        soundToggleBtn.textContent = "🔊 Включен";
        soundToggleBtn.title = "Звукът е включен";
        soundToggleBtn.classList.remove("sound-off");
    }
}

function setupSoundToggle() {
    const soundToggleBtn = document.getElementById("soundToggleBtn");

    if (!soundToggleBtn) {
        return;
    }

    updateSoundToggleButton();

    soundToggleBtn.addEventListener("click", function () {
        const newValue = !isSoundMuted();

        localStorage.setItem(SOUND_MUTED_KEY, String(newValue));
        updateSoundToggleButton();
    });
}
const sounds = {
    correct: new Audio("sounds/correct.mp3"),
    wrong: new Audio("sounds/wrong.mp3"),
    win: new Audio("sounds/win.mp3"),
    lose: new Audio("sounds/lose.mp3"),
    lifeline: new Audio("sounds/lifeline.mp3")
};

function playSound(name) {
    if (isSoundMuted()) {
        return;
    }

    const sound = sounds[name];

    if (!sound) {
        return;
    }

    sound.currentTime = 0;
    sound.play().catch(() => {});
}

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
    },
   {
    question: "Кой договор променя решенията на Санстефанския мирен договор от 1878 г.?",
    answers: ["Ньойският договор", "Берлинският договор", "Букурещкият договор", "Лондонският договор"],
    correct: 1,
    teacher: "Помисли кой международен договор разделя териториите, предвидени в Санстефанския договор.",
    explanation: "Берлинският договор от 1878 г. променя решенията на Санстефанския мирен договор и разделя българските земи на няколко части."
},
{
    question: "Кое твърдение най-точно описва фотосинтезата?",
    answers: [
        "Процес, при който растенията отделят само въглероден диоксид",
        "Процес, при който растенията превръщат светлинната енергия в химична",
        "Процес, при който животните произвеждат кислород",
        "Процес, при който водата се превръща в сол"
    ],
    correct: 1,
    teacher: "Фотосинтезата е свързана със светлина, въглероден диоксид и производство на хранителни вещества.",
    explanation: "При фотосинтезата растенията използват светлинна енергия, вода и въглероден диоксид, за да образуват хранителни вещества и да отделят кислород."
},
{
    question: "Кой е автор на романа „Железният светилник“?",
    answers: ["Елин Пелин", "Йордан Йовков", "Димитър Талев", "Алеко Константинов"],
    correct: 2,
    teacher: "Романът е част от тетралогия, свързана с българското Възраждане.",
    explanation: "„Железният светилник“ е роман от Димитър Талев. Той представя живота на българите в Македония през Възраждането."
},
{
    question: "Ако число първо се увеличи с 20%, а после новата стойност се намали с 20%, какво ще стане с първоначалното число?",
    answers: ["Ще остане същото", "Ще се увеличи с 4%", "Ще се намали с 4%", "Ще се намали с 20%"],
    correct: 2,
    teacher: "Пробвай с число 100: първо става 120, после 20% от 120 е 24.",
    explanation: "Ако 100 се увеличи с 20%, става 120. Ако 120 се намали с 20%, получаваме 96. Това е с 4% по-малко от началното число."
},
{
    question: "Кой пролив свързва Черно море с Мраморно море?",
    answers: ["Дарданели", "Босфор", "Гибралтар", "Ла Манш"],
    correct: 1,
    teacher: "Този пролив минава през Истанбул.",
    explanation: "Босфорът свързва Черно море с Мраморно море и разделя европейската и азиатската част на Истанбул."
},
{
    question: "Кой органел в клетката е основно свързан с производството на енергия?",
    answers: ["Ядро", "Митохондрия", "Вакуола", "Клетъчна стена"],
    correct: 1,
    teacher: "Този органел често се нарича „енергийната централа“ на клетката.",
    explanation: "Митохондриите участват в клетъчното дишане и производството на енергия под формата на ATP."
},
{
    question: "Кое от изброените е пример за сложна дума?",
    answers: ["Училище", "Водопад", "Чета", "Красив"],
    correct: 1,
    teacher: "Сложната дума е образувана от две основи.",
    explanation: "„Водопад“ е сложна дума, защото е образувана от две основи: „вода“ и „падам/пад“."
},
{
    question: "Какъв е резултатът от уравнението 3x - 7 = 14?",
    answers: ["x = 5", "x = 6", "x = 7", "x = 8"],
    correct: 2,
    teacher: "Първо прибави 7 към двете страни на уравнението.",
    explanation: "3x - 7 = 14. Прибавяме 7 и получаваме 3x = 21. Делим на 3 и получаваме x = 7."
},
{
    question: "Кой учен формулира основните закони на класическата механика?",
    answers: ["Алберт Айнщайн", "Исак Нютон", "Галилео Галилей", "Никола Тесла"],
    correct: 1,
    teacher: "Законите за движението най-често се свързват с този учен.",
    explanation: "Исак Нютон формулира трите закона на движението, които са основа на класическата механика."
},
{
    question: "Коя планинска верига в България е важен вододел между Северна и Южна България?",
    answers: ["Родопите", "Стара планина", "Рила", "Пирин"],
    correct: 1,
    teacher: "Тази планина пресича България от запад на изток.",
    explanation: "Стара планина е важен вододел и естествена граница между Северна и Южна България."
},
{
    question: "Коя атмосферна обвивка е най-близо до земната повърхност и в нея се образува времето?",
    answers: ["Стратосфера", "Мезосфера", "Тропосфера", "Термосфера"],
    correct: 2,
    teacher: "В тази част на атмосферата се образуват облаци, дъжд и вятър.",
    explanation: "Тропосферата е най-ниският слой на атмосферата. В нея протичат основните метеорологични явления."
},
{
    question: "Кое събитие е свързано с приемането на Търновската конституция?",
    answers: [
        "Освобождението на България",
        "Учредителното събрание във Велико Търново",
        "Съединението на България",
        "Обявяването на независимостта"
    ],
    correct: 1,
    teacher: "Конституцията е приета след Освобождението от специално събрание.",
    explanation: "Търновската конституция е приета през 1879 г. от Учредителното събрание във Велико Търново."
},
{
    question: "Коя е вероятността при хвърляне на зар да се падне число, което се дели на 3?",
    answers: ["1/6", "1/3", "1/2", "2/3"],
    correct: 1,
    teacher: "На стандартен зар числата са от 1 до 6. Кои от тях се делят на 3?",
    explanation: "Числата, които се делят на 3, са 3 и 6. Това са 2 възможности от общо 6, тоест 2/6 = 1/3."
},
{
    question: "Кое литературно направление се свързва най-силно с идеализиране на чувствата, свободата и природата?",
    answers: ["Романтизъм", "Реализъм", "Символизъм", "Класицизъм"],
    correct: 0,
    teacher: "Това направление поставя силен акцент върху личността, емоцията и свободата.",
    explanation: "Романтизмът идеализира чувствата, въображението, свободата, природата и силната личност."
},
{
    question: "Кое твърдение за демокрацията е най-точно?",
    answers: [
        "Властта принадлежи само на един владетел",
        "Гражданите участват пряко или чрез избрани представители в управлението",
        "Решенията се вземат само от армията",
        "Законите не важат за управляващите"
    ],
    correct: 1,
    teacher: "Демокрацията е свързана с участие на гражданите и изборност.",
    explanation: "При демокрацията гражданите участват в управлението пряко или чрез избрани представители, а властта е ограничена от закони."
},
{
    question: "Кое събитие поставя началото на Съединението на Княжество България и Източна Румелия?",
    answers: ["Априлското въстание", "Превратът в Пловдив на 6 септември 1885 г.", "Обявяването на независимостта", "Берлинският конгрес"],
    correct: 1,
    teacher: "Събитието се случва в Пловдив през 1885 г.",
    explanation: "Съединението започва с преврата в Пловдив на 6 септември 1885 г., когато Източна Румелия се присъединява към Княжество България."
},
{
    question: "Кое твърдение за клетъчното дишане е вярно?",
    answers: [
        "Протича само при растенията",
        "При него се разграждат хранителни вещества и се освобождава енергия",
        "При него се образува само кислород",
        "Протича само през деня"
    ],
    correct: 1,
    teacher: "Клетъчното дишане е свързано с освобождаване на енергия.",
    explanation: "При клетъчното дишане клетките разграждат хранителни вещества, най-често глюкоза, и освобождават енергия, необходима за жизнените процеси."
},
{
    question: "Кой художествен образ е централен в поемата „Опълченците на Шипка“?",
    answers: ["Българският книжовник", "Българският войник защитник", "Селският труженик", "Чуждият пътешественик"],
    correct: 1,
    teacher: "Творбата възпява героизма при защитата на Шипка.",
    explanation: "В „Опълченците на Шипка“ Иван Вазов възвеличава образа на българския войник защитник, който се бори за свободата на България."
},
{
    question: "Ако 3/5 от едно число са 24, кое е числото?",
    answers: ["30", "36", "40", "45"],
    correct: 2,
    teacher: "Ако 3 части са 24, намери колко е една част и после пет части.",
    explanation: "3/5 от числото са 24. Една пета е 24 : 3 = 8. Цялото число е 8 × 5 = 40."
},
{
    question: "Кое явление е резултат от въртенето на Земята около оста ѝ?",
    answers: ["Смяната на сезоните", "Денят и нощта", "Приливите и отливите", "Смяната на годините"],
    correct: 1,
    teacher: "Помисли какво се случва, когато различни части на Земята са осветени от Слънцето.",
    explanation: "Денят и нощта се дължат на въртенето на Земята около собствената ѝ ос. Когато дадена част е обърната към Слънцето, там е ден."
},
{
    question: "Кое от изброените е възобновяем източник на енергия?",
    answers: ["Въглища", "Природен газ", "Слънчева енергия", "Нефт"],
    correct: 2,
    teacher: "Възобновяемите източници се възстановяват естествено.",
    explanation: "Слънчевата енергия е възобновяем източник, защото идва от Слънцето и не се изчерпва при използване по начина, по който се изчерпват въглищата, нефтът и природният газ."
},
{
    question: "Кое е основното послание на разказа „По жицата“ от Йордан Йовков?",
    answers: [
        "Силата на богатството",
        "Вярата, надеждата и човешкото състрадание",
        "Победата във войната",
        "Значението на търговията"
    ],
    correct: 1,
    teacher: "Разказът е свързан с търсенето на надежда в труден момент.",
    explanation: "„По жицата“ поставя акцент върху надеждата, човешката болка и състраданието. Белият лястовичен образ символизира вярата в спасението."
},
{
    question: "Кой е резултатът от израза 2² + 3² + 4²?",
    answers: ["20", "25", "29", "32"],
    correct: 2,
    teacher: "Пресметни квадратите на 2, 3 и 4 и ги събери.",
    explanation: "2² = 4, 3² = 9, а 4² = 16. Сборът е 4 + 9 + 16 = 29."
},
{
    question: "Коя е столицата на Византийската империя?",
    answers: ["Рим", "Атина", "Константинопол", "Александрия"],
    correct: 2,
    teacher: "Градът по-късно става известен като Истанбул.",
    explanation: "Константинопол е столицата на Византийската империя. Градът има огромно политическо, културно и религиозно значение през Средновековието."
},
{
    question: "Кое твърдение за електрическия ток е вярно?",
    answers: [
        "Той е движение на електрически заряди",
        "Той е движение само на въздух",
        "Той съществува само във вода",
        "Той няма връзка с електроните"
    ],
    correct: 0,
    teacher: "Електрическият ток е свързан с подредено движение на заредени частици.",
    explanation: "Електрическият ток представлява насочено движение на електрически заряди, например електрони в метален проводник."
},
{
    question: "Кое е правилното твърдение за сложното изречение?",
    answers: [
        "Съдържа само една дума",
        "Съдържа поне две прости изречения",
        "Няма сказуемо",
        "Винаги е въпросително"
    ],
    correct: 1,
    teacher: "Сложното изречение има повече от една граматична основа.",
    explanation: "Сложното изречение съдържа две или повече прости изречения, свързани по смисъл и граматически."
},
{
    question: "Каква е ролята на Конституцията в една държава?",
    answers: [
        "Определя основните правила за устройството и управлението на държавата",
        "Регулира само училищните ваканции",
        "Отнася се само за спорта",
        "Служи само за исторически документ"
    ],
    correct: 0,
    teacher: "Конституцията е основният закон на държавата.",
    explanation: "Конституцията определя основните права и задължения на гражданите, устройството на държавата и принципите на управление."
},
{
    question: "Коя от следните думи е наречие?",
    answers: ["Бързо", "Бърз", "Бързина", "Бързам"],
    correct: 0,
    teacher: "Наречието често пояснява глагола и отговаря на въпроса как?",
    explanation: "„Бързо“ е наречие, защото пояснява начина на извършване на действие. Например: Той тича бързо."
},
{
    question: "Кое е вярно за равнобедрения триъгълник?",
    answers: [
        "Има три различни страни",
        "Има две равни страни",
        "Винаги има прав ъгъл",
        "Няма ъгли"
    ],
    correct: 1,
    teacher: "Името подсказва, че две от страните са равни.",
    explanation: "Равнобедреният триъгълник има две равни страни, които се наричат бедра, и основа."
},
{
    question: "Кое е основното значение на Кирило-Методиевото дело?",
    answers: [
        "Създаване на нова военна система",
        "Разпространение на славянската писменост и култура",
        "Основаване на Римската империя",
        "Откриване на Америка"
    ],
    correct: 1,
    teacher: "Делото е свързано с писменост, книжнина и християнска просвета.",
    explanation: "Кирило-Методиевото дело има огромно значение за развитието на славянската писменост, книжнина и културна идентичност."
},
{
    question: "Какво представлява инфлацията?",
    answers: [
        "Общо повишаване на цените и намаляване на покупателната способност на парите",
        "Намаляване на населението",
        "Увеличаване на площта на държавата",
        "Вид природно бедствие"
    ],
    correct: 0,
    teacher: "Инфлацията е икономическо явление, свързано с цените.",
    explanation: "Инфлацията означава общо покачване на цените. Когато цените растат, със същата сума пари могат да се купят по-малко стоки и услуги."
},
{
    question: "Коя част от окото регулира количеството светлина, което навлиза в него?",
    answers: ["Ретина", "Ирис", "Зрителен нерв", "Роговица"],
    correct: 1,
    teacher: "Тази част определя цвета на очите.",
    explanation: "Ирисът регулира размера на зеницата и така контролира количеството светлина, което навлиза в окото."
},
{
    question: "Кое твърдение за Европейския съюз е вярно?",
    answers: [
        "Всички държави в Европа са негови членове",
        "Това е съюз между европейски държави с общи политики и институции",
        "Това е само военен съюз",
        "Съществува от Античността"
    ],
    correct: 1,
    teacher: "ЕС има общи институции, политики и правила между държавите членки.",
    explanation: "Европейският съюз е политически и икономически съюз между европейски държави, които работят заедно чрез общи институции и политики."
},
{
    question: "Кой процес води до образуването на облаци?",
    answers: ["Кондензация", "Горене", "Разтваряне", "Магнетизъм"],
    correct: 0,
    teacher: "Облаците се образуват, когато водните пари се охлаждат.",
    explanation: "Облаците се образуват чрез кондензация — водните пари във въздуха се охлаждат и се превръщат в малки водни капчици или ледени кристали."
},
{
    question: "Кое твърдение най-добре описва понятието „алегория“?",
    answers: [
        "Пряко описание без скрит смисъл",
        "Изразяване на идея чрез образ с преносно значение",
        "Повторение на един и същ звук",
        "Научно доказателство"
    ],
    correct: 1,
    teacher: "Алегорията използва образ, зад който стои по-дълбок смисъл.",
    explanation: "Алегорията е художествен похват, при който чрез конкретен образ се изразява по-обща идея или морално послание."
}
,
{
    question: "Коя е най-голямата държава в света по площ?",
    answers: ["Канада", "Китай", "Русия", "САЩ"],
    correct: 2,
    teacher: "Помисли коя държава се простира в Европа и Азия.",
    explanation: "Русия е най-голямата държава в света по площ и се простира на два континента — Европа и Азия."
},
{
    question: "Кой е най-големият континент на Земята?",
    answers: ["Африка", "Азия", "Европа", "Австралия"],
    correct: 1,
    teacher: "Там се намират държави като Китай, Индия и Япония.",
    explanation: "Азия е най-големият континент както по площ, така и по население."
},
{
    question: "Коя е столицата на Япония?",
    answers: ["Пекин", "Сеул", "Токио", "Банкок"],
    correct: 2,
    teacher: "Това е един от най-големите градове в света.",
    explanation: "Токио е столицата на Япония и е важен икономически, културен и технологичен център."
},
{
    question: "Кой океан е най-голям?",
    answers: ["Атлантически", "Индийски", "Тих", "Северен ледовит"],
    correct: 2,
    teacher: "Името му звучи спокойно, но той е огромен.",
    explanation: "Тихият океан е най-големият океан на Земята."
},
{
    question: "Коя планета е известна като Червената планета?",
    answers: ["Венера", "Марс", "Юпитер", "Сатурн"],
    correct: 1,
    teacher: "Цветът ѝ се дължи на железни оксиди по повърхността.",
    explanation: "Марс е известен като Червената планета заради червеникавия си цвят."
},
{
    question: "Кой е написал пиесата „Ромео и Жулиета“?",
    answers: ["Уилям Шекспир", "Чарлз Дикенс", "Марк Твен", "Виктор Юго"],
    correct: 0,
    teacher: "Авторът е един от най-известните английски драматурзи.",
    explanation: "„Ромео и Жулиета“ е трагедия от Уилям Шекспир."
},
{
    question: "Кой е нарисувал „Мона Лиза“?",
    answers: ["Пабло Пикасо", "Леонардо да Винчи", "Винсент ван Гог", "Микеланджело"],
    correct: 1,
    teacher: "Художникът е бил и учен, изобретател и анатом.",
    explanation: "„Мона Лиза“ е нарисувана от Леонардо да Винчи и е една от най-известните картини в света."
},
{
    question: "Кой град е известен като Вечният град?",
    answers: ["Париж", "Рим", "Атина", "Истанбул"],
    correct: 1,
    teacher: "Този град е бил център на голяма древна империя.",
    explanation: "Рим е известен като Вечният град заради дългата си история и огромното си културно значение."
},
{
    question: "Коя е официалната валута на Япония?",
    answers: ["Юан", "Йена", "Вон", "Долар"],
    correct: 1,
    teacher: "Името ѝ започва с буквата Й.",
    explanation: "Официалната валута на Япония е йената."
},
{
    question: "Коя е най-високата планина в света?",
    answers: ["Алпи", "Хималаи", "Анди", "Кавказ"],
    correct: 1,
    teacher: "В тази планинска система се намира връх Еверест.",
    explanation: "Хималаите са най-високата планинска система в света, а там се намира и връх Еверест."
},
{
    question: "Кой е най-високият връх в света?",
    answers: ["Килиманджаро", "Монблан", "Еверест", "Аконкагуа"],
    correct: 2,
    teacher: "Той се намира в Хималаите.",
    explanation: "Еверест е най-високият връх в света с височина над 8848 метра."
},
{
    question: "Коя държава е известна със статуята на свободата?",
    answers: ["Франция", "САЩ", "Италия", "Канада"],
    correct: 1,
    teacher: "Статуята се намира в Ню Йорк.",
    explanation: "Статуята на свободата се намира в Ню Йорк, САЩ, и е един от най-разпознаваемите символи на страната."
},
{
    question: "Коя държава е подарила Статуята на свободата на САЩ?",
    answers: ["Италия", "Франция", "Германия", "Испания"],
    correct: 1,
    teacher: "Това е европейска държава, чиято столица е Париж.",
    explanation: "Франция подарява Статуята на свободата на САЩ през XIX век като символ на приятелството между двете страни."
},
{
    question: "Коя е столицата на Австралия?",
    answers: ["Сидни", "Мелбърн", "Канбера", "Пърт"],
    correct: 2,
    teacher: "Не е нито Сидни, нито Мелбърн.",
    explanation: "Канбера е столицата на Австралия, въпреки че Сидни и Мелбърн са по-известни градове."
},
{
    question: "Кой е най-бързият сухоземен бозайник?",
    answers: ["Лъв", "Гепард", "Антилопа", "Кон"],
    correct: 1,
    teacher: "Това животно е известно с изключително високата си скорост при кратко бягане.",
    explanation: "Гепардът е най-бързият сухоземен бозайник."
},
{
    question: "Коя е най-голямата пустиня в света?",
    answers: ["Сахара", "Гоби", "Антарктическата пустиня", "Калахари"],
    correct: 2,
    teacher: "Пустинята не винаги е гореща — може да бъде и ледена.",
    explanation: "Антарктическата пустиня е най-голямата пустиня в света, защото получава изключително малко валежи."
},
{
    question: "Коя е най-голямата гореща пустиня в света?",
    answers: ["Сахара", "Гоби", "Атакама", "Калахари"],
    correct: 0,
    teacher: "Тя се намира в Северна Африка.",
    explanation: "Сахара е най-голямата гореща пустиня в света."
},
{
    question: "Кой е основателят на компанията Microsoft заедно с Пол Алън?",
    answers: ["Стив Джобс", "Бил Гейтс", "Марк Зукърбърг", "Илон Мъск"],
    correct: 1,
    teacher: "Името му често се свързва с Windows.",
    explanation: "Бил Гейтс основава Microsoft заедно с Пол Алън през 1975 г."
},
{
    question: "Коя социална мрежа първоначално е създадена от Марк Зукърбърг?",
    answers: ["Instagram", "Facebook", "TikTok", "Twitter"],
    correct: 1,
    teacher: "Първоначално е била създадена за студенти.",
    explanation: "Facebook е създадена от Марк Зукърбърг и негови колеги като социална мрежа за студенти."
},
{
    question: "Коя е най-голямата държава в Южна Америка?",
    answers: ["Аржентина", "Бразилия", "Чили", "Перу"],
    correct: 1,
    teacher: "В тази държава се говори португалски.",
    explanation: "Бразилия е най-голямата държава в Южна Америка по площ и население."
},
{
    question: "Коя е официалната валута на Европейския съюз, използвана от много негови държави?",
    answers: ["Долар", "Евро", "Франк", "Лира"],
    correct: 1,
    teacher: "Тази валута се използва и в много държави от еврозоната.",
    explanation: "Еврото е официалната валута на еврозоната и се използва от много държави членки на Европейския съюз."
},
{
    question: "Коя държава е известна с пирамидите в Гиза?",
    answers: ["Гърция", "Египет", "Мексико", "Индия"],
    correct: 1,
    teacher: "Пирамидите се намират близо до Кайро.",
    explanation: "Пирамидите в Гиза се намират в Египет и са едни от най-известните древни паметници в света."
},
{
    question: "Кой е първият човек, стъпил на Луната?",
    answers: ["Юрий Гагарин", "Нийл Армстронг", "Бъз Олдрин", "Джон Глен"],
    correct: 1,
    teacher: "Това се случва по време на мисията „Аполо 11“.",
    explanation: "Нийл Армстронг е първият човек, стъпил на Луната през 1969 г."
},
{
    question: "Кой е първият човек, летял в Космоса?",
    answers: ["Нийл Армстронг", "Юрий Гагарин", "Бъз Олдрин", "Алексей Леонов"],
    correct: 1,
    teacher: "Той е съветски космонавт.",
    explanation: "Юрий Гагарин става първият човек в Космоса през 1961 г."
},
{
    question: "Кое е най-дългото животно сред изброените?",
    answers: ["Син кит", "Африкански слон", "Жираф", "Крокодил"],
    correct: 0,
    teacher: "То живее в океана.",
    explanation: "Синият кит е най-голямото и най-дълго животно на Земята."
},
{
    question: "Коя държава е известна с Айфеловата кула?",
    answers: ["Италия", "Франция", "Испания", "Германия"],
    correct: 1,
    teacher: "Кулата се намира в Париж.",
    explanation: "Айфеловата кула се намира в Париж, Франция, и е един от най-известните символи на страната."
},
{
    question: "Кой град е известен с Колизеума?",
    answers: ["Рим", "Атина", "Париж", "Лондон"],
    correct: 0,
    teacher: "Колизеумът е древноримски амфитеатър.",
    explanation: "Колизеумът се намира в Рим и е един от най-известните паметници от Древен Рим."
},
{
    question: "Коя държава е известна с Тадж Махал?",
    answers: ["Индия", "Китай", "Иран", "Турция"],
    correct: 0,
    teacher: "Тадж Махал се намира в град Агра.",
    explanation: "Тадж Махал се намира в Индия и е един от най-известните архитектурни паметници в света."
},
{
    question: "Кой е най-големият остров в света?",
    answers: ["Мадагаскар", "Гренландия", "Исландия", "Великобритания"],
    correct: 1,
    teacher: "Този остров се намира между Северния Атлантически и Северния ледовит океан.",
    explanation: "Гренландия е най-големият остров в света."
},
{
    question: "Коя държава е известна с кенгурата?",
    answers: ["Нова Зеландия", "Австралия", "Канада", "ЮАР"],
    correct: 1,
    teacher: "Кенгуруто е един от символите на тази държава.",
    explanation: "Австралия е известна с кенгурата и много други уникални животински видове."
}
];
let questions = loadSavedQuestions();
const GAME_QUESTION_COUNT = 15;
const QUESTION_COUNT_SETTING_KEY = "selectedQuestionCount";
const GRADING_START_KEY = "gradingStart";
const GRADING_END_KEY = "gradingEnd";

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

            if (activeGroup && Array.isArray(activeGroup.questions) && activeGroup.questions.length > 0) {
                return activeGroup.questions;
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

        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
            return parsedQuestions;
        }

        console.warn("Няма персонализирани въпроси. Зареждат се стандартните въпроси.");

setScopedSetting(DEFAULT_QUESTIONS_MODE_KEY, "true");
localStorage.removeItem(getScopedStorageKey(ACTIVE_GROUP_KEY));
setScopedSetting("activeQuestionGroupName", "Стандартни въпроси");
        return defaultQuestions;

    } catch (error) {
        console.error("Грешка при зареждане на персонализираните въпроси:", error);
        return defaultQuestions;
    }
}

let levels = [];

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
const questionCountSelect = document.getElementById("questionCountSelect");

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

function getSelectedQuestionCount(poolSize = defaultQuestions.length) {
    const savedValue = Number(localStorage.getItem(getScopedStorageKey(QUESTION_COUNT_SETTING_KEY)));
    const maxAllowed = Math.max(poolSize, GAME_QUESTION_COUNT);
    const fallback = Math.min(GAME_QUESTION_COUNT, maxAllowed);

    if (!Number.isFinite(savedValue) || savedValue < 3) {
        return fallback;
    }

    return Math.min(Math.max(Math.round(savedValue), 3), maxAllowed);
}

function getSelectedGradeRange() {
    const savedStart = Number(localStorage.getItem(getScopedStorageKey(GRADING_START_KEY)));
    const savedEnd = Number(localStorage.getItem(getScopedStorageKey(GRADING_END_KEY)));

    const start = Number.isFinite(savedStart) && savedStart >= 2 && savedStart <= 6 ? savedStart : 2;
    const end = Number.isFinite(savedEnd) && savedEnd >= 2 && savedEnd <= 6 ? savedEnd : 6;

    return {
        start: Math.min(start, end),
        end: Math.max(start, end)
    };
}

function getLevelsForCount(count) {
    const { start, end } = getSelectedGradeRange();

    if (count <= 1) {
        return [end.toFixed(2)];
    }

    const step = (end - start) / (count - 1);

    return Array.from({ length: count }, (_, index) => {
        const value = start + step * index;
        return value.toFixed(2);
    });
}

function populateQuestionCountSelect(poolSize = defaultQuestions.length) {
    if (!questionCountSelect) {
        return;
    }

    questionCountSelect.innerHTML = "";
    questionCountSelect.setAttribute("min", "3");
    questionCountSelect.setAttribute("step", "1");
    questionCountSelect.removeAttribute("max");
    questionCountSelect.value = String(getSelectedQuestionCount(poolSize));
}

function buildGameQuestions(baseQuestions, count = GAME_QUESTION_COUNT) {
    const pool = Array.isArray(baseQuestions) ? baseQuestions : [];
    const shuffledPool = shuffleQuestions(pool);
    const selectedQuestions = shuffledPool.slice(0, Math.min(count, pool.length));

    return selectedQuestions.map(shuffleAnswers);
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

if (questionCountSelect) {
    questionCountSelect.addEventListener("input", () => {
        const value = Number(questionCountSelect.value);

        if (Number.isFinite(value)) {
            const normalizedValue = Math.max(3, Math.round(value));
            questionCountSelect.value = String(normalizedValue);
            localStorage.setItem(getScopedStorageKey(QUESTION_COUNT_SETTING_KEY), String(normalizedValue));
        }
    });
}

function startGame() {
    clearHelpTimer();

    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    currentQuestion = 0;
    const baseQuestions = loadSavedQuestions();
    const selectedCount = getSelectedQuestionCount(baseQuestions.length);
    questions = buildGameQuestions(baseQuestions, selectedCount);
    levels = getLevelsForCount(selectedCount);
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

populateQuestionCountSelect(loadSavedQuestions().length);

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
    nextBtn.dataset.mode = "next";
    nextBtn.textContent = "Следващ въпрос";
    messageBox.textContent = "Избери верен отговор.";

    const q = questions[currentQuestion];

   questionNumber.textContent = `${currentQuestion + 1}/${questions.length}`;
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
        playSound("correct");
        answerButtons[index].classList.add("correct");

        const explanation = q.explanation || q.teacher || "Няма добавено пояснение за този въпрос.";

        messageBox.innerHTML = `
            <strong>Браво! Това е верният отговор.</strong><br>
            ${explanation}
        `;

        if (currentQuestion === questions.length - 1) {
            nextBtn.dataset.mode = "restart";
            nextBtn.textContent = "Играй отново";
            nextBtn.style.display = "inline-block";
        } else {
            nextBtn.dataset.mode = "next";
            nextBtn.textContent = "Следващ въпрос";
            nextBtn.style.display = "inline-block";
        }
    } else {
        playSound("wrong");
        answerButtons[index].classList.add("wrong");
        answerButtons[correctIndex].classList.add("correct");

        const explanation = q.explanation || q.teacher || "Няма добавено пояснение за този въпрос.";

        messageBox.innerHTML = `
            <strong>Грешен отговор.</strong><br>
            Верният отговор е: <strong>${q.answers[correctIndex]}</strong>.<br>
            ${explanation}
        `;

        nextBtn.dataset.mode = "restart";
        nextBtn.textContent = "Играй отново";
        nextBtn.style.display = "inline-block";
    }
}

function nextQuestion() {
    clearHelpTimer();

    if (nextBtn.dataset.mode === "restart") {
        restartGame();
        return;
    }

    currentQuestion++;
    loadQuestion();
}

function useFiftyFifty() {
    playSound("lifeline");
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
    playSound("lifeline");
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
    playSound("lifeline");
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
        playSound("win");
        finalGrade.textContent = "Отличен 6.00!";
        finalMessage.textContent = "Поздравления! Ти стана отличник!";
        showConfetti();
    } else {
        playSound("lose");
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
setupSoundToggle();