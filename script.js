// --- SISTEMA DE ESTRELAS ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for(let i=0; i<5000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const stars = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xffffff, size: 0.8}));
scene.add(stars);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0004;
    renderer.render(scene, camera);
}
animate();

// --- NAVEGAÇÃO E CONTEÚDO ---
function goToModule(id) {
    const iframe = document.getElementById('video-music');
    if (iframe) {
        // Inicia o vídeo e define o volume para 20%
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
    }

    const screen = document.getElementById('module-screen');
    document.getElementById('home-screen').classList.remove('active');
    screen.classList.add('active');

    if(id === 'pre-calculo') {
        screen.innerHTML = `
            <div class="dashboard-wrapper">
                <button class="back-btn" onclick="goHome()">← VOLTAR AO MENU</button>
                
                <div class="header-stats">
                    <h1 style="font-family:Orbitron; color:var(--neon-blue); margin:0;">NÍVEL 1: FUNÇÕES E TRIGONOMETRIA</h1>
                </div>

                <div class="grid-main">
                    <div class="content-block highlight-card">
                        <img src="img/walter_lewin.jfif" style="width:100%; border-radius:5px; margin-bottom:15px; opacity:0.9">
                        <h2 style="color:var(--neon-blue); font-family:Orbitron; font-size:1.1rem;">Roteiro de Elite</h2>
                        <p style="font-size:0.85rem;">Domine as funções para descrever o movimento e a trigonometria para decompor o universo.</p>
                    </div>

                    <div class="content-block">
                        <h3 style="color:var(--neon-green); font-family:Orbitron; border-bottom:1px solid #333; padding-bottom:10px;">Material de Estudo</h3>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.9rem;">
                            <div>
                                <h4 style="color:var(--neon-blue);">1. Funções</h4>
                                <ul style="list-style: none; padding: 0; line-height: 1.6;">
                                    <li>• <b>1º Grau:</b> Gráficos lineares e MU.</li>
                                    <li>• <b>2º Grau:</b> Parábolas e MUV.</li>
                                    <li>• <b>Análise:</b> Raízes e Vértices.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="color:var(--neon-blue);">2. Trigonometria</h4>
                                <ul style="list-style: none; padding: 0; line-height: 1.6;">
                                    <li>• <b>Triângulo:</b> Seno, Cosseno e Tangente.</li>
                                    <li>• <b>Círculo:</b> Graus vs Radianos.</li>
                                    <li>• <b>Vetores:</b> Decomposição em X e Y.</li>
                                </ul>
                            </div>
                        </div>

                        <div class="formula-grid">
                            <div class="formula-item">sen²(θ) + cos²(θ) = 1</div>
                            <div class="formula-item">f(x) = ax + b</div>
                            <div class="formula-item">tg(θ) = sen/cos</div>
                            <div class="formula-item">|V| = √(Vx² + Vy²)</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function goHome() {
    document.getElementById('module-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
