// Dados de login
const validCredentials = {
    username: 'Izabel Aquino',
    password: '08012007'
};

// Variáveis globais
let currentMood = null;
let entries = [];
let currentYear = new Date().getFullYear();

// Elementos DOM
const loginScreen = document.getElementById('login-screen');
const diaryScreen = document.getElementById('diary-screen');
const loginForm = document.getElementById('login-form');
const alertContainer = document.getElementById('alert-container');
const moodButtons = document.querySelectorAll('.mood-btn');
const diaryText = document.getElementById('diary-text');
const saveEntryBtn = document.getElementById('save-entry');
const logoutBtn = document.getElementById('logout-btn');
const calendar = document.getElementById('calendar');
const entriesContainer = document.getElementById('entries-container');

// Função para mostrar alertas
function showAlert(message, type) {
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 3000);
}

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validCredentials.username && password === validCredentials.password) {
        showAlert('Login realizado com sucesso! Bem-vinda ao seu diário! ✨', 'success');
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            diaryScreen.classList.remove('hidden');
            initializeDiary();
        }, 1500);
    } else {
        showAlert('Usuário ou senha incorretos. Tente novamente! 😊', 'error');
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    diaryScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});

// Seleção de humor
moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        moodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMood = btn.dataset.mood;
    });
});

// Salvar entrada
saveEntryBtn.addEventListener('click', () => {
    if (!currentMood) {
        showAlert('Por favor, selecione como foi seu dia! 😊', 'error');
        return;
    }

    const text = diaryText.value.trim();
    if (!text) {
        showAlert('Escreva algo sobre seu dia antes de salvar! ✍️', 'error');
        return;
    }

    const entry = {
        id: Date.now(),
        date: new Date().toISOString(),
        mood: currentMood,
        text: text,
        displayDate: new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    };

    entries.unshift(entry);
    
    // Reset form
    diaryText.value = '';
    currentMood = null;
    moodButtons.forEach(b => b.classList.remove('active'));

    updateCalendar();
    updateStats();
    displayEntries();
    
    showAlert('Entrada salva com sucesso! 💜', 'success');
});

// Inicializar diário
function initializeDiary() {
    document.getElementById('current-year').textContent = currentYear;
    updateCalendar();
    updateStats();
    displayEntries();
}

// Atualizar calendário
function updateCalendar() {
    const daysInYear = getDaysInYear(currentYear);
    const today = new Date();
    
    calendar.innerHTML = '';

    // Headers dos dias da semana
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    weekdays.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = day;
        calendar.appendChild(header);
    });

    // Gerar dias do ano (simplificado - apenas dias de hoje em diante)
    for (let i = 1; i <= 31; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;

        // Verificar se é hoje
        if (i === today.getDate()) {
            dayElement.classList.add('today');
        }

        // Verificar se tem entrada para este dia
        const dayEntries = entries.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate.getDate() === i && 
                   entryDate.getMonth() === today.getMonth() &&
                   entryDate.getFullYear() === today.getFullYear();
        });

        if (dayEntries.length > 0) {
            const latestEntry = dayEntries[0];
            dayElement.classList.add(latestEntry.mood);
        }

        calendar.appendChild(dayElement);
    }
}

// Atualizar estatísticas
function updateStats() {
    const stats = {
        good: 0,
        okay: 0,
        bad: 0
    };

    entries.forEach(entry => {
        stats[entry.mood]++;
    });

    document.getElementById('good-days').textContent = stats.good;
    document.getElementById('okay-days').textContent = stats.okay;
    document.getElementById('bad-days').textContent = stats.bad;
}

// Exibir entradas
function displayEntries() {
    if (entries.length === 0) {
        entriesContainer.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Nenhuma entrada ainda. Comece escrevendo sobre seu dia! 😊</p>';
        return;
    }

    const entriesHtml = entries.slice(0, 5).map(entry => {
        const moodEmoji = {
            good: '😊',
            okay: '😐',
            bad: '😔'
        };

        const moodText = {
            good: 'Bom dia',
            okay: 'Dia razoável',
            bad: 'Dia difícil'
        };

        return `
            <div class="entry-item">
                <div class="entry-date">${entry.displayDate}</div>
                <div class="entry-mood ${entry.mood}">
                    ${moodEmoji[entry.mood]} ${moodText[entry.mood]}
                </div>
                <div>${entry.text}</div>
            </div>
        `;
    }).join('');

    entriesContainer.innerHTML = entriesHtml;
}

// Função auxiliar para obter dias no ano
function getDaysInYear(year) {
    return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 366 : 365;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('Diário Digital carregado! 💜');
});
