// ... (Mantenha as funções do Átomo e das Estrelas iguais ao anterior) ...

function triggerComet(id) {
    const comet = document.getElementById('comet-transition');
    const effectIframe = document.getElementById('comet-effect');
    comet.classList.add('comet-active');

    if (effectIframe) {
        effectIframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
        effectIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }

    setTimeout(() => {
        const home = document.getElementById('home-screen');
        const mod = document.getElementById('module-screen');
        if(id === 'home') {
            mod.classList.remove('active');
            home.classList.add('active');
        } else {
            home.classList.remove('active');
            mod.classList.add('active');
            renderModule();
            // FORÇA O MATHJAX A RENDERIZAR AS NOVAS FÓRMULAS
            if (window.MathJax) MathJax.typeset();
        }
    }, 600);

    setTimeout(() => comet.classList.remove('comet-active'), 1200);
}

function renderModule() {
    document.getElementById('module-screen').innerHTML = `
        <div class="glass-main">
            <div style="width:100%; display:flex; justify-content:space-between; align-items:center;">
                <h2 style="font-family:'Kalnia Glaze'; font-size:2.5rem; margin:0;">Revisão</h2>
                <button class="badge" style="cursor:pointer; border:none;" onclick="triggerComet('home')">← VOLTAR</button>
            </div>
            <div class="module-content">
                <div class="formula-card">\\( \sin^2 \theta + \cos^2 \theta = 1 \\)</div>
                <div class="formula-card">\\( f(x) = ax + b \\)</div>
                <div class="formula-card">\\( \Delta x \cdot \Delta p \geq \frac{\hbar}{2} \\)</div>
            </div>
        </div>`;
}

// ... (Restante da animação e resize) ...
