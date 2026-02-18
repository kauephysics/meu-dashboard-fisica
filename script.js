// --- FUNDO ESTRELADO ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starPos = [];
for(let i=0; i<3000; i++) starPos.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
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

// --- CONTROLE DE TRANSIÇÃO ---
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

// --- RENDERIZAÇÃO DOS PROBLEMAS ---
function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main">
            <button class="back-btn" onclick="triggerComet('home')">← VOLTAR</button>
            <div class="problem-grid">
                <div class="problem-card">
                    <div id="m1" class="math-box"></div>
                    <div class="problem-text"><strong>Drone:</strong> Parte de 10m a 5m/s. Em quanto tempo chega em 60m?</div>
                </div>
                <div class="problem-card">
                    <div id="m2" class="math-box"></div>
                    <div class="problem-text"><strong>Queda:</strong> Largado de 20m. Qual a velocidade ao atingir o solo? (g=10)</div>
                </div>
                <div class="problem-card">
                    <div id="m3" class="math-box"></div>
                    <div class="problem-text"><strong>Plano:</strong> Bloco em 30°. Calcule a componente Px (Peso = 100N).</div>
                </div>
            </div>
        </div>`;
    
    // O KaTeX agora renderiza apenas na div 'math-box', mantendo o texto seguro
    katex.render("S = S_0 + v \\cdot t", document.getElementById('m1'));
    katex.render("v^2 = v_0^2 + 2g\\Delta h", document.getElementById('m2'));
    katex.render("P_x = P \\cdot \\sin(30^\\circ)", document.getElementById('m3'));
}

function renderHomeMath() {
    katex.render("E = mc^2", document.getElementById('float-1'));
    katex.render("F = m \\cdot a", document.getElementById('float-2'));
}
window.onload = renderHomeMath;
