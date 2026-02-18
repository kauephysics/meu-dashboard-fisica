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
    // Tenta dar play na música do YouTube
    const iframe = document.getElementById('video-music');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }

    const screen = document.getElementById('module-screen');
    document.getElementById('home-screen').classList.remove('active');
    screen.classList.add('active');

    if(id === 'pre-calculo') {
        screen.innerHTML = `
            <div class="module-container">
                <button class="back-btn" onclick="goHome()">← VOLTAR</button>
                <div class="grid-main">
                    <div class="highlight-card">
                        <img src="img/walter_lewin.jfif" style="width:100%; border-radius:10px;">
                        <h2 style="color:var(--neon-blue)">Módulo 01</h2>
                        <p style="font-size:0.9rem; opacity:0.8">"A Física funciona! Vamos explorar as bases matemáticas."</p>
                    </div>

                    <div class="content-block">
                        <h3 style="border-bottom:1px solid #333; padding-bottom:10px; margin-top:0;">Conceitos e Fórmulas</h3>
                        <div class="formula-grid">
                            <div class="formula-item">Vx = V · cos(θ)</div>
                            <div class="formula-item">Vy = V · sen(θ)</div>
                            <div class="formula-item">tan(θ) = Vy / Vx</div>
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
