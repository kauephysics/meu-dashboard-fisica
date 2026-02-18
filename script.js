// --- CONFIGURAÇÕES BASE (STARS & ATOM) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starVertices = [];
for(let i=0; i<5000; i++) starVertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
const starGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.7}));
scene.add(stars);
camera.position.z = 1;

// Átomo
const atomScene = new THREE.Scene();
const atomCam = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000);
const atomRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
atomRenderer.setSize(340, 220);
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

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0002;
    const time = Date.now() * 0.002;
    orbits.forEach((o, i) => { o.group.rotation.y += 0.015; o.electron.position.x = Math.cos(time + i) * 2.2; o.electron.position.y = Math.sin(time + i) * 1.1; });
    renderer.render(scene, camera);
    atomRenderer.render(atomScene, atomCam);
}
animate();

// --- TRANSIÇÕES ---
function handleCard3D(e) {
    const card = document.getElementById('main-card');
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -15}deg) rotateY(${x * 15}deg)`;
}
function resetCard3D() { document.getElementById('main-card').style.transform = `rotateX(0deg) rotateY(0deg)`; }

function triggerComet(dest) {
    document.getElementById('comet-transition').classList.add('comet-active');
    setTimeout(() => {
        const home = document.getElementById('home-screen');
        const mod = document.getElementById('module-screen');
        if(dest === 'home') { mod.classList.remove('active'); home.classList.add('active'); }
        else { home.classList.remove('active'); mod.classList.add('active'); renderModule(); }
    }, 550);
    setTimeout(() => document.getElementById('comet-transition').classList.remove('comet-active'), 1100);
}

// --- DASHBOARD DE ESTUDO ---
function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main">
            <header style="display:flex; justify-content:space-between; align-items:center;">
                <h2 class="neon-text" style="font-family:'Orbitron'; font-size:1.5rem; margin:0; color:var(--neon-blue);">MAPA DE ESTUDO ATIVO</h2>
                <button class="badge" style="cursor:pointer; border:none;" onclick="triggerComet('home')">← VOLTAR</button>
            </header>

            <div class="study-grid">
                <section>
                    <div class="topic-card">
                        <div class="formula-box" id="f-linear"></div>
                        <p style="font-size:0.8rem; opacity:0.8;">Base para MRU e leitura de gráficos de sensores.</p>
                        <div class="problem-box">
                            <h4>DESAFIO:</h4>
                            <p>Um drone parte de S=10m a 5m/s. Em que instante ele atinge 60m?</p>
                        </div>
                        <div class="video-links">
                            <a href="https://www.youtube.com/watch?v=f2O96m83-pY" target="_blank" class="video-btn">▶ Aula: Função 1º Grau</a>
                        </div>
                    </div>
                    
                    <div class="topic-card">
                        <div class="formula-box" id="f-quad"></div>
                        <p style="font-size:0.8rem; opacity:0.8;">Base para MRUV e Lançamento de Projéteis.</p>
                        <div class="problem-box">
                            <h4>DESAFIO:</h4>
                            <p>Lançamento a 20m/s. Use S = v₀t - 5t². Qual a altura máxima (Vértice)?</p>
                        </div>
                        <div class="video-links">
                            <a href="https://www.youtube.com/watch?v=6P6v6FAnIuA" target="_blank" class="video-btn">▶ Aula: Função Quadrática</a>
                        </div>
                    </div>
                    
                </section>

                <section>
                    <div class="topic-card">
                        <div class="formula-box" id="f-trig"></div>
                        <p style="font-size:0.8rem; opacity:0.8;">Decomposição de forças e Plano Inclinado.</p>
                        <div class="problem-box">
                            <h4>DESAFIO:</h4>
                            <p>Bloco em plano de 30º. Calcule a força paralela: Px = P ⋅ sen(30º).</p>
                        </div>
                        <div class="video-links">
                            <a href="https://www.youtube.com/watch?v=SRE_5B9nI0I" target="_blank" class="video-btn">▶ Aula: Decomposição Vetores</a>
                        </div>
                    </div>
                    
                    <div class="topic-card">
                        <div class="formula-box" id="f-circle"></div>
                        <p style="font-size:0.8rem; opacity:0.8;">Ondas e Movimento Circular.</p>
                        <div class="video-links">
                            <a href="https://www.youtube.com/watch?v=t_Uj1hM_yL0" target="_blank" class="video-btn">▶ Aula: Círculo Unitário</a>
                            <a href="https://www.youtube.com/watch?v=S-k8_S93S9k" target="_blank" class="video-btn">★ Walter Lewin: Aula 01</a>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>`;
    
    // Renderização das Fórmulas
    katex.render("S = S_0 + v \\cdot t", document.getElementById('f-linear'));
    katex.render("S = v_0 t + \\frac{a t^2}{2}", document.getElementById('f-quad'));
    katex.render("\\sin = \\frac{O}{H} \\mid \\cos = \\frac{A}{H}", document.getElementById('f-trig'));
    katex.render("2\\pi \\text{ rad} = 360^\\circ", document.getElementById('f-circle'));
}

window.onload = () => {
    katex.render("E = mc^2", document.getElementById('float-1'));
    katex.render("F = G\\frac{m_1 m_2}{r^2}", document.getElementById('float-2'));
};
