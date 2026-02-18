// O script permanece igual ao anterior (com o átomo e o movimento do card), 
// apenas garanta que a função goToModule limpe o "glass-container" para mostrar as fórmulas.

function handleCard3D(e) {
    const card = document.getElementById('main-card');
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetCard3D() {
    document.getElementById('main-card').style.transform = `rotateX(0) rotateY(0)`;
}

// ... (Inclua aqui as funções de Átomo, Estrelas e Som enviadas anteriormente)
