// --- ESTRELAS DE FUNDO ---
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
const stars = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xffffff, size: 0.7}));
scene.add(stars);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// --- LÓGICA DE TRANSIÇÃO COMETA ---
function triggerComet(id) {
    const comet = document.getElementById('comet-transition');
    comet.classList.add('comet-active');

    // Toca a música a 20%
    const iframe = document.getElementById('video-music');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
    }

    // Troca a tela exatamente quando o cometa passa pelo meio (0.6s)
    setTimeout(() => {
        if(id === 'home') goHome();
        else goToModule(id);
    }, 600);

    // Remove a classe para poder usar de novo
    setTimeout(() => {
        comet.classList.remove('comet-active');
    }, 1200);
}

function goToModule(id) {
    document.getElementById('home-screen').classList.remove('active');
    const screen = document.getElementById('module-screen');
    screen.classList.add('active');

    if(id === 'pre-calculo') {
        screen.innerHTML = `
            <div class="dashboard-wrapper">
                <button class="back-btn" onclick="triggerComet('home')">← VOLTAR</button>
                <div class="content-block">
                    <h2 style="color:var(--neon-blue); font-family:Orbitron;">REVISÃO MATEMÁTICA</h2>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px;">
                        <div>
                            <h4 style="color:var(--neon-blue)">Funções</h4>
                            <div class="formula-item">Linear: f(x) = ax + b</div>
                            <div class="formula-item">Quadrática: ax² + bx + c</div>
                            <p style="font-size:0.8rem; margin-top:10px; opacity:0.7">Foque em como o gráfico se comporta perto do zero.</p>
                        </div>
                        <div>
                            <h4 style="color:var(--neon-blue)">Trigonometria</h4>
                            <div class="formula-item">sen²θ + cos²θ = 1</div>
                            <div class="formula-item">tgθ = senθ / cosθ</div>
                            <p style="font-size:0.8rem; margin-top:10px; opacity:0.7">Essencial para decomposição de vetores em física 1.</p>
                        </div>
                    </div>
                </div>
            </div>`;
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
