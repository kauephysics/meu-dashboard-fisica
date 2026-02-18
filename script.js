// --- ESTRELAS ---
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

// --- LÓGICA ---
function goToModule(id) {
    const iframe = document.getElementById('video-music');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
    }

    document.getElementById('home-screen').classList.remove('active');
    const screen = document.getElementById('module-screen');
    screen.classList.add('active');

    if(id === 'pre-calculo') {
        screen.innerHTML = `
            <div class="dashboard-wrapper">
                <button class="back-btn" onclick="goHome()">← VOLTAR</button>
                <div class="content-block">
                    <h2 style="color:var(--neon-blue); font-family:Orbitron;">REVISÃO MATEMÁTICA</h2>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        <div>
                            <h4>Funções</h4>
                            <div class="formula-item">Linear: f(x) = ax + b</div>
                            <div class="formula-item">Quadrática: ax² + bx + c</div>
                        </div>
                        <div>
                            <h4>Trigonometria</h4>
                            <div class="formula-item">sen²θ + cos²θ = 1</div>
                            <div class="formula-item">tgθ = senθ / cosθ</div>
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
