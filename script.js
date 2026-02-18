// --- 1. SETUP THREE.JS (ESTRELAS) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starVertices = [];
for(let i=0; i<6000; i++) {
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

// --- 3. ANIMAÇÃO ---
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

// --- 4. INTERAÇÃO E TRANSIÇÃO ---
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

function triggerComet(dest) {
    document.getElementById('comet-transition').classList.add('comet-active');
    document.getElementById('comet-effect').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    
    setTimeout(() => {
        const home = document.getElementById('home-screen');
        const mod = document.getElementById('module-screen');
        if(dest === 'home') { mod.classList.remove('active'); home.classList.add('active'); }
        else { home.classList.remove('active'); mod.classList.add('active'); renderModule(); }
    }, 550);
    setTimeout(() => document.getElementById('comet-transition').classList.remove('comet-active'), 1100);
}

// Render Fórmulas Iniciais
window.onload = () => {
    katex.render("E = mc^2", document.getElementById('float-1'));
    katex.render("\\sum F = m \\cdot a", document.getElementById('float-2'));
};

// --- 5. TELA DE REVISÃO (MAPA DE ESTUDO MÉDIO/SUPERIOR) ---
function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main module-container">
            <header class="module-header">
                <div>
                    <h2 class="neon-text">MAPA DE REFERÊNCIA: PRÉ-CÁLCULO</h2>
                    <p style="font-size:0.8rem; opacity:0.6;">Foco: Base de Ensino Médio para Física I</p>
                </div>
                <button class="badge" style="cursor:pointer; border:none;" onclick="triggerComet('home')">← VOLTAR</button>
            </header>

            <div class="study-grid">
                <section>
                    <div class="section-tag">CINEMÁTICA & ÁLGEBRA</div>
                    <div class="topic-card">
                        <div class="formula-box" id="f-linear"></div>
                        <div class="bullet-points">
                            <p><strong>Reta (MRU):</strong> O coeficiente 'a' é a velocidade. No papel, identifique se a reta sobe ou desce.</p>
                            <p><strong>Aplicação:</strong> Cálculo de deslocamento e velocidade constante.</p>
                        </div>
                    </div>
                    
                    <div class="topic-card">
                        <div class="formula-box" id="f-quad"></div>
                        <div class="bullet-points">
                            <p><strong>Parábola (MRUV):</strong> O 'c' é a posição inicial. O vértice é onde o objeto para e inverte o sentido.</p>
                            <p><strong>Aplicação:</strong> Queda livre e lançamento de projéteis.</p>
                        </div>
                    </div>
                    
                </section>

                <section>
                    <div class="section-tag">VETORES & GEOMETRIA</div>
                    <div class="topic-card">
                        <div class="formula-box" id="f-trig"></div>
                        <div class="bullet-points">
                            <p><strong>Triângulo Retângulo:</strong> Essencial para decompor forças em X e Y.</p>
                            <p><strong>Dica:</strong> Seno para o cateto oposto, Cosseno para o cateto adjacente.</p>
                        </div>
                    </div>
                    
                    <div class="topic-card">
                        <div class="formula-box" id="f-circ"></div>
                        <div class="bullet-points">
                            <p><strong>Círculo Trigonométrico:</strong> Entenda a conversão de Graus para Radianos.</p>
                            <p><strong>Aplicação:</strong> Movimento Circular e Ondas (MHS).</p>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>`;
    
    // Renderização das Fórmulas de Consulta
    katex.render("S = S_0 + vt \\quad (y = ax + b)", document.getElementById('f-linear'));
    katex.render("S = S_0 + v_0t + \\frac{at^2}{2}", document.getElementById('f-quad'));
    katex.render("\\sin \\theta = \\frac{O}{H} \\quad \\cos \\theta = \\frac{A}{H}", document.getElementById('f-trig'));
    katex.render("180^\\circ = \\pi \\text{ rad}", document.getElementById('f-circ'));
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
