// --- 1. SETUP THREE.JS (ESTRELAS) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starVertices = [];
for(let i=0; i<5000; i++) {
    starVertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
const starGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.7}));
scene.add(stars);
camera.position.z = 1;

// --- 2. SETUP ÁTOMO 3D ---
const atomScene = new THREE.Scene();
const atomCam = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000);
const atomRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
atomRenderer.setSize(380, 260);
document.getElementById('atom-canvas-container').appendChild(atomRenderer.domElement);

const core = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshBasicMaterial({color: 0x00d4ff}));
atomScene.add(core);

function createOrbit(rotZ) {
    const group = new THREE.Group();
    const curve = new THREE.EllipseCurve(0, 0, 2.2, 1.1, 0, 2 * Math.PI, false, 0);
    const orbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)), new THREE.LineBasicMaterial({ color: 0x00d4ff, opacity: 0.2, transparent: true }));
    const electron = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial({color: 0x00ffcc}));
    group.add(orbit, electron);
    group.rotation.z = rotZ;
    return { group, electron };
}
const orbits = [createOrbit(Math.PI/4), createOrbit(-Math.PI/4), createOrbit(Math.PI/2)];
orbits.forEach(o => atomScene.add(o.group));
atomCam.position.z = 6;

// --- 3. ANIMAÇÃO E RENDERIZAÇÃO ---
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0002;
    const time = Date.now() * 0.002;
    orbits.forEach((o, i) => {
        o.group.rotation.y += 0.015;
        o.electron.position.x = Math.cos(time + i) * 2.2;
        o.electron.position.y = Math.sin(time + i) * 1.1;
    });
    renderer.render(scene, camera);
    atomRenderer.render(atomScene, atomCam);
}
animate();

// --- 4. CARDS E TRANSIÇÕES ---
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

// Renderizar fórmulas iniciais
window.onload = () => {
    katex.render("E = mc^2", document.getElementById('float-1'));
    katex.render("F = G \\frac{m_1 m_2}{r^2}", document.getElementById('float-2'));
    katex.render("\\nabla \\cdot \\mathbf{B} = 0", document.getElementById('float-3'));
};

function triggerComet(id) {
    document.getElementById('comet-transition').classList.add('comet-active');
    document.getElementById('comet-effect').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    
    setTimeout(() => {
        const home = document.getElementById('home-screen');
        const mod = document.getElementById('module-screen');
        if(id === 'home') { mod.classList.remove('active'); home.classList.add('active'); }
        else { home.classList.remove('active'); mod.classList.add('active'); renderModule(); }
    }, 550);
    setTimeout(() => document.getElementById('comet-transition').classList.remove('comet-active'), 1100);
}

// --- 5. TELA DE REVISÃO DINÂMICA ---
function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main" style="max-width:1100px;">
            <div style="width:100%; display:flex; justify-content:space-between; align-items:center;">
                <div class="timer-box">
                    <span id="pomodoro-display">25:00</span>
                    <button class="badge" style="cursor:pointer; background:none; border:1px solid var(--neon-pink); color:white; font-size:0.5rem;" onclick="toggleTimer()">START</button>
                </div>
                <h2 class="neon-title" style="font-size:2rem;">Laboratório Alpha</h2>
                <button class="badge" style="cursor:pointer; border:none;" onclick="triggerComet('home')">← VOLTAR</button>
            </div>
            
            <div class="module-grid">
                <div>
                    <div class="formula-card" onclick="this.classList.toggle('open')">
                        <div id="f-rev-1"></div>
                        <div class="expand-content">A base da trigonometria. Derivada do Teorema de Pitágoras no círculo unitário.</div>
                    </div>
                    <div class="formula-card" onclick="this.classList.toggle('open')">
                        <div id="f-rev-2"></div>
                        <div class="expand-content">Define uma reta. 'a' é a inclinação, 'b' é onde cruza o eixo Y.</div>
                    </div>
                </div>
                
                <div class="widget-card">
                    <h3>Bhaskara Express</h3>
                    <div class="calc-inputs">
                        <input type="number" id="a" placeholder="a">
                        <input type="number" id="b" placeholder="b">
                        <input type="number" id="c" placeholder="c">
                    </div>
                    <button class="calc-btn" onclick="calcBhaskara()">CALCULAR</button>
                    <div id="res" style="margin-top:15px; font-size:0.8rem; color:var(--neon-blue);"></div>
                </div>
            </div>
        </div>`;
    
    katex.render("\\sin^2 \\theta + \\cos^2 \\theta = 1", document.getElementById('f-rev-1'));
    katex.render("f(x) = ax + b", document.getElementById('f-rev-2'));
}

// --- 6. UTILITÁRIOS ---
let timer;
let timeLeft = 1500;
function toggleTimer() {
    if (timer) { clearInterval(timer); timer = null; }
    else { timer = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft/60);
        const s = timeLeft%60;
        document.getElementById('pomodoro-display').innerText = `${m}:${s < 10 ? '0'+s : s}`;
    }, 1000); }
}

function calcBhaskara() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const d = (b*b) - (4*a*c);
    const res = document.getElementById('res');
    if(d < 0) res.innerText = "Delta negativo!";
    else res.innerText = `x1: ${((-b + Math.sqrt(d))/(2*a)).toFixed(2)} | x2: ${((-b - Math.sqrt(d))/(2*a)).toFixed(2)}`;
}
