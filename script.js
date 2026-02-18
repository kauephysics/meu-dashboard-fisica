// CONFIGURAÇÃO DOS DADOS
const moduleData = {
    'pre-calculo': {
        title: "PRÉ-CÁLCULO & VETORES",
        concepts: ["Geometria Analítica 3D", "Vetores Unitários (i, j, k)", "Funções Log & Exp", "Círculo Trigonométrico"],
        formulas: ["|V| = √(Vx² + Vy² + Vz²)", "A · B = |A||B|cosθ", "sen²θ + cos²θ = 1"],
        method: "Assista às aulas de Walter Lewin no MIT (8.01) e resolva 20 exercícios de decomposição vetorial."
    },
    'cinematica': {
        title: "CINEMÁTICA (CÁLCULO)",
        concepts: ["Velocidade Instantânea", "Aceleração Variável", "Derivadas de Posição", "Integrais de Trajetória"],
        formulas: ["v(t) = ds/dt", "a(t) = dv/dt", "s(t) = s0 + ∫v(t)dt"],
        method: "Domine a regra da cadeia para derivadas e entenda a área sob o gráfico v vs t como deslocamento."
    }
};

// NAVEGAÇÃO COM EFEITO WARP
let starSpeed = 0.001;

function goToModule(id) {
    const home = document.getElementById('home-screen');
    const module = document.getElementById('module-screen');
    const data = moduleData[id];

    // Warp Drive Effect
    starSpeed = 0.15;
    home.style.filter = "blur(15px) brightness(2)";
    home.style.opacity = "0";

    setTimeout(() => {
        renderModuleContent(data);
        home.classList.remove('active');
        module.classList.add('active');
        module.style.opacity = "1";
        
        // Slow down speed
        const interval = setInterval(() => {
            if (starSpeed > 0.001) starSpeed -= 0.01;
            else { starSpeed = 0.001; clearInterval(interval); }
        }, 50);
    }, 800);
}

function goHome() {
    const home = document.getElementById('home-screen');
    const module = document.getElementById('module-screen');
    
    module.style.opacity = "0";
    setTimeout(() => {
        module.classList.remove('active');
        home.classList.add('active');
        home.style.filter = "none";
        home.style.opacity = "1";
    }, 500);
}

function renderModuleContent(data) {
    const container = document.getElementById('module-content');
    container.innerHTML = `
        <div class="module-layout">
            <h1 class="neon-title">${data.title}</h1>
            <div class="study-grid">
                <div class="box"><h3>🧠 Conceitos</h3><ul>${data.concepts.map(c => `<li>${c}</li>`).join('')}</ul></div>
                <div class="box"><h3>🔢 Fórmulas</h3>${data.formulas.map(f => `<code class="formula-text">${f}</code>`).join('')}</div>
                <div class="box"><h3>📖 Como Estudar</h3><p>${data.method}</p></div>
            </div>
        </div>
    `;
}

// THREE.JS - FUNDO DO UNIVERSO
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for(let i=0; i<8000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({color: 0xffffff, size: 0.7});
const stars = new THREE.Points(geometry, material);
scene.add(stars);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += starSpeed;
    renderer.render(scene, camera);
}
animate();

// API DO YOUTUBE (MÚSICA)
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0',
        videoId: 'UDVtMYqUAyw',
        playerVars: { 'autoplay': 0, 'loop': 1, 'playlist': 'UDVtMYqUAyw' }
    });
}

function toggleMusic() {
    const status = document.getElementById('music-status');
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        status.innerText = "OFF";
        document.body.classList.remove('music-active');
    } else {
        player.playVideo();
        status.innerText = "ON";
        document.body.classList.add('music-active');
    }
}
