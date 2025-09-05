document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const calendarContainer = document.getElementById('calendar-container');
    const alertMessage = document.getElementById('alert');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const goodDayBtn = document.getElementById('good-day');
    const neutralDayBtn = document.getElementById('neutral-day');
    const badDayBtn = document.getElementById('bad-day');
    const summary = document.getElementById('summary');

    // Data de aniversário de Zabel
    const validUsername = 'Zabel Aquino';
    const validPassword = '08/01/2007';  // No formato dd/mm/aaaa

    // Controle do login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = usernameField.value;
        const password = passwordField.value;

        if (username === validUsername && password === validPassword) {
            loginContainer.style.display = 'none';
            calendarContainer.style.display = 'block';
        } else {
            alertMessage.textContent = 'Usuário ou senha incorretos.';
        }
    });

    // Função para registrar o status do dia
    let days = {
        good: 0,
        neutral: 0,
        bad: 0
    };

    goodDayBtn.addEventListener('click', () => {
        days.good++;
        updateSummary();
    });

    neutralDayBtn.addEventListener('click', () => {
        days.neutral++;
        updateSummary();
    });

    badDayBtn.addEventListener('click', () => {
        days.bad++;
        updateSummary();
    });

    // Atualizar o resumo
    function updateSummary() {
        summary.textContent = `Este ano, você registrou ${days.good} dias bons, ${days.neutral} dias razoáveis e ${days.bad} dias ruins.`;
    }
});
