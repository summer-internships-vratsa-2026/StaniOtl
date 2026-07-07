const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const signOutBtn = document.getElementById('signOutBtn');
const loginMessage = document.getElementById('loginMessage');

signInBtn.addEventListener('click', signIn);
signUpBtn.addEventListener('click', signUp);
signOutBtn.addEventListener('click', signOut);

togglePasswordBtn.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePasswordBtn.textContent = isHidden ? '🙈' : '👁';
    togglePasswordBtn.setAttribute('aria-label', isHidden ? 'Скрий паролата' : 'Покажи паролата');
});

function showMessage(text, isError = false) {
    loginMessage.textContent = text;
    loginMessage.style.borderLeft = isError ? '4px solid #ff4055' : '4px solid #f5c542';
}

async function signIn() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showMessage('Моля, въведи имейл и парола.', true);
        return;
    }

    showMessage('Влизане...');

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

        if (error) {
            showMessage('Грешка: ' + error.message, true);
            return;
        }

        if (data && data.user) {
            localStorage.setItem('activeProfileId', data.user.id);
        }

        showMessage('Успешен вход. Пренасочване...');
        setTimeout(() => { window.location.href = 'index.html'; }, 800);
    } catch (err) {
        showMessage('Грешка при връзката: ' + String(err), true);
    }
}

async function signUp() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showMessage('Моля, въведи имейл и парола за регистрация.', true);
        return;
    }

    showMessage('Регистрация...');

    try {
        const { data, error } = await supabaseClient.auth.signUp({ email, password });

        if (error) {
            showMessage('Грешка: ' + error.message, true);
            return;
        }

        if (data && data.user) {
            localStorage.setItem('activeProfileId', data.user.id);
        }

        showMessage('Успешна регистрация. Провери имейла за потвърждение.');
    } catch (err) {
        showMessage('Грешка при връзката: ' + String(err), true);
    }
}

async function signOut() {
    try {
        await supabaseClient.auth.signOut();
        localStorage.removeItem('activeProfileId');
        showMessage('Излязохте от профила.');
        signOutBtn.style.display = 'none';
    } catch (err) {
        showMessage('Грешка при изход: ' + String(err), true);
    }
}

(async function init() {
    if (typeof supabaseClient === 'undefined') {
        showMessage('Supabase не е зареден. Провери supabase-config.js.', true);
        signInBtn.disabled = true;
        signUpBtn.disabled = true;
        return;
    }

    try {
        const { data } = await supabaseClient.auth.getSession();
        if (data && data.session) {
            const userId = data.session.user?.id;
            if (userId) {
                localStorage.setItem('activeProfileId', userId);
            }
            showMessage('Вече сте влезли. Пренасочване...');
            signOutBtn.style.display = 'inline-block';
            setTimeout(() => { window.location.href = 'index.html'; }, 700);
        }
    } catch (err) {
        console.warn('auth.getSession error', err);
    }
})();
