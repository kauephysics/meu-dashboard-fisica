// --- 1. ESTRELAS DE FUNDO ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starVertices = [];
for (let i = 0; i < 5000; i++) starVertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
const starGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 }));
scene.add(stars);
camera.position.z = 1;

// --- 2. ÁTOMO 3D ---
const atomScene = new THREE.Scene();
const atomCam = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000);
const atomRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
atomRenderer.setSize(380, 250);
document.getElementById('atom-canvas-container').appendChild(atomRenderer.domElement);
const core = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshBasicMaterial({ color: 0x00d4ff }));
atomScene.add(core);

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0002;
    atomRenderer.render(atomScene, atomCam);
    renderer.render(scene, camera);
}
animate();
atomCam.position.z = 5;

// --- 3. LOGICA DE INTERFACE ---
function triggerComet(dest) {
    document.getElementById('comet-transition').classList.add('comet-active');
    setTimeout(() => {
        document.getElementById('home-screen').classList.toggle('active', dest === 'home');
        document.getElementById('module-screen').classList.toggle('active', dest === 'module');
        if (dest === 'module') renderModule();
    }, 500);
    setTimeout(() => document.getElementById('comet-transition').classList.remove('comet-active'), 1000);
}

function handleCard3D(e) {
    const card = document.getElementById('main-card');
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -15}deg) rotateY(${x * 15}deg)`;
}

function resetCard3D() {
    document.getElementById('main-card').style.transform = `rotateX(0deg) rotateY(0deg)`;
}

function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main">
            <header style="width:100%; display:flex; justify-content:space-between; align-items:center;">
                <h2 style="font-family:'Orbitron'; color:var(--neon-blue);">REVISÃO ATIVA</h2>
                <button class="badge" style="cursor:pointer; border:none;" onclick="triggerComet('home')">← VOLTAR</button>
            </header>
            <div class="study-grid">
                <div class="topic-card">
                    <div id="f1" class="formula-box"></div>
                    <p>Problema: Drone a 5m/s partindo de 10m. Tempo para 60m?</p>
                    <a href="https://www.youtube.com/watch?v=f2O96m83-pY" target="_blank" class="video-btn">VER AULA</a>
                </div>
                <div class="topic-card">
                    <div id="f2" class="formula-box"></div>
                    <p>Problema: Bloco em 30°. Calcule Px = P ⋅ sen(30°).</p>
                    <a href="https://www.youtube.com/watch?v=SRE_5B9nI0I" target="_blank" class="video-btn">VER AULA</a>
                </div>
            </div>
        </div>`;
    
    // Renderizando fórmulas no módulo
    katex.render("S = S_0 + v \\cdot t", document.getElementById('f1'));
    katex.render("\\sin \\theta = \\frac{O}{H}", document.getElementById('f2'));
}

// Fórmulas iniciais na Home
window.onload = () => {
    katex.render("E = mc^2", document.getElementById('float-1'));
    katex.render("F = m \\cdot a", document.getElementById('float-2'));
};
