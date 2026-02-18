// Contagem Regressiva
const targetDate = new Date("March 13, 2026 08:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    document.getElementById("countdown").innerHTML = `${days}d ${hours}h restantes`;
}

setInterval(updateCountdown, 1000);

// Efeito Sonoro
function playSound() {
    const audio = document.getElementById("click-sound");
    audio.currentTime = 0;
    audio.play();
}

// Barra de Progresso
function updateProgress() {
    const totalTasks = document.querySelectorAll('.task').length;
    const completedTasks = document.querySelectorAll('.task:checked').length;
    const percentage = (completedTasks / totalTasks) * 100;
    
    document.getElementById("main-progress").style.width = percentage + "%";
}