// --- FUNDO ESTRELADO ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starPos = [];
for(let i=0; i<3000; i++) starPos.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
const starGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.7}));
scene.add(stars);
camera.position.z = 1;

// --- ÁTOMO 3D NO CARD ---
const atomScene = new THREE.Scene();
const atomCam = new THREE.PerspectiveCamera(45, 1.6, 0.1, 100);
const atomRenderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
atomRenderer.setSize(350, 220);
document.getElementById('atom-canvas-container').appendChild(atomRenderer.domElement);
const core = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), new THREE.MeshBasicMaterial({color: 0x00d4ff}));
atomScene.add(core);
const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.02, 16, 100), new THREE.MeshBasicMaterial({color: 0xff00cc}));
atomScene.add(ring);
atomCam.position.z = 4;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0002;
    ring.rotation.y += 0.05; ring.rotation.x += 0.02;
    atomRenderer.render(atomScene, atomCam);
    renderer.render(scene, camera);
}
animate();

// --- SISTEMA DE NAVEGAÇÃO ---
function triggerComet(dest) {
    document.getElementById('comet-transition').classList.add('comet-active');
    setTimeout(() => {
        document.getElementById('home-screen').classList.toggle('active', dest === 'home');
        document.getElementById('module-screen').classList.toggle('active', dest === 'module');
        if(dest === 'module') renderModule();
        else renderHomeMath();
    }, 400);
    setTimeout(() => document.getElementById('comet-transition').classList.remove('comet-active'), 800);
}

function handleCard3D(e) {
    const card = document.getElementById('main-card');
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -15}deg) rotateY(${x * 15}deg)`;
}
function resetCard3D() { document.getElementById('main-card').style.transform = 'rotateX(0deg) rotateY(0deg)'; }

// --- RENDERIZAÇÃO DA AULA E PROBLEMAS ---
function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main" style="max-height: 90vh; overflow-y: auto;">
            <header style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                <h2 style="font-family:'Orbitron'; color:var(--neon-blue); font-size: 1.2rem;">SISTEMA DE AULA ATIVA</h2>
                <button class="back-btn" onclick="triggerComet('home')">← VOLTAR</button>
            </header>
            
            <div class="problem-grid">
                <div class="problem-card">
                    <div id="m1" class="math-box"></div>
                    <p><strong>Drone:</strong> Parte de 10m a 5m/s. Em quanto tempo chega em 60m?</p>
                    <div class="mini-aula">
                        <b style="color:var(--neon-blue)">AULA RÁPIDA:</b><br>
                        1. Identifique os dados: <b>S</b>=60, <b>S₀</b>=10, <b>v</b>=5.<br>
                        2. Monte a equação: 60 = 10 + 5t.<br>
                        3. Isole o tempo: 60 - 10 = 5t → 50 = 5t.<br>
                        4. <b>t = 10 segundos</b>.
                    </div>
                </div>

                <div class="problem-card">
                    <div id="m2" class="math-box"></div>
                    <p><strong>Plano Inclinado:</strong> Bloco de 100N em 30°. Calcule Px.</p>
                    <div class="mini-aula">
                        <b style="color:var(--neon-pink)">AULA RÁPIDA:</b><br>
                        1. <b>P</b> (Peso) é a força total para baixo (100N).<br>
                        2. <b>θ</b> (Ângulo) é a inclinação do plano (30°).<br>
                        3. Use <b>Px = P × sen(30°)</b>.<br>
                        4. Como sen(30°) = 0,5, então <b>Px = 50N</b>.
                    </div>
                </div>
            </div>
        </div>`;
    
    // Renderiza as fórmulas matemáticas nas IDs m1 e m2
    katex.render("S = S_0 + v \\cdot t", document.getElementById('m1'));
    katex.render("P_x = P \\cdot \\sin(\\theta)", document.getElementById('m2'));
}

function renderHomeMath() {
    katex.render("E = mc^2", document.getElementById('float-1'));
    katex.render("F = m \\cdot a", document.getElementById('float-2'));
}
window.onload = renderHomeMath;
