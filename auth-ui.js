function escapeHTML(text) {
    return String(text || "").replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

async function initAccountWidget() {
    const container = document.getElementById('accountWidget');
    if (!container) return;

    if (typeof supabaseClient === 'undefined') {
        container.innerHTML = '<a href="login.html" class="customize-btn">Вход</a>';
        return;
    }

    try {
        const { data } = await supabaseClient.auth.getUser();
        const user = data && data.user ? data.user : null;

        if (user) {
            const email = user.email || 'Потребител';
            const initials = email ? email.trim().charAt(0).toUpperCase() : '?';

            container.innerHTML = `
                <div class="account">
                    <div class="avatar">${escapeHTML(initials)}</div>
                    <div class="acct-name">${escapeHTML(email)}</div>
                </div>
            `;

            const outBtn = document.createElement('button');
            outBtn.className = 'menu-btn';
            outBtn.textContent = 'Изход';
            outBtn.style.marginLeft = '8px';
            outBtn.addEventListener('click', async () => {
                await supabaseClient.auth.signOut();
                location.replace('login.html');
            });

            container.appendChild(outBtn);
        } else {
            container.innerHTML = '<a href="login.html" class="customize-btn">Вход</a>';
        }
    } catch (err) {
        console.warn('initAccountWidget error', err);
        container.innerHTML = '<a href="login.html" class="customize-btn">Вход</a>';
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initAccountWidget);
