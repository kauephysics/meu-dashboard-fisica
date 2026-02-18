// Configuração Three.js (Estrelas de fundo)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starPositions = [];
for(let i=0; i<3000; i++) starPositions.push(THREE.MathUtils.randFloatSpread(1000), THREE.MathUtils.randFloatSpread(1000), THREE.MathUtils.randFloatSpread(1000));
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0x888888, size: 0.5}));
scene.add(stars);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0003;
    renderer.render(scene, camera);
}
animate();

// Transições e Dashboard
function triggerComet(dest) {
    document.getElementById('comet-transition').classList.add('comet-active');
    setTimeout(() => {
        document.getElementById('home-screen').classList.toggle('active', dest === 'home');
        document.getElementById('module-screen').classList.toggle('active', dest === 'module');
        if(dest === 'module') renderModule();
    }, 400);
    setTimeout(() => document.getElementById('comet-transition').classList.remove('comet-active'), 800);
}

function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main">
            <header style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
                <h2 style="font-family:'Orbitron'; font-size:1.2rem; margin:0; color:var(--neon-blue);">REVISÃO ATIVA</h2>
                <button class="badge" style="cursor:pointer; border:none;" onclick="triggerComet('home')">← VOLTAR</button>
            </header>

            <div class="study-grid">
                <section>
                    <div class="topic-card">
                        <div class="formula-box" id="f-linear"></div>
                        <div class="problem-box">
                            <h4>PROBLEMA:</h4>
                            <p>Um drone parte de S=10m a 5m/s. Em que instante ele atinge 60m?</p>
                        </div>
                        <div class="video-links">
                            <a href="https://www.youtube.com/watch?v=f2O96m83-pY" target="_blank" class="video-btn">▶ Ver Aula</a>
                        </div>
                    </div>
                    <div class="topic-card">
                        <div class="formula-box" id="f-quad"></div>
                        <div class="problem-box">
                            <h4>PROBLEMA:</h4>
                            <p>Lançamento a 20m/s. Use S = v₀t - 5t². Qual a altura máxima?</p>
                        </div>
                        <div class="video-links">
                            <a href="https://www.youtube.com/watch?v=6P6v6FAnIuA" target="_blank" class="video-btn">▶ Ver Aula</a>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="topic-card">
                        <div class="formula-box" id="f-trig"></div>
                        <div class="problem-box">
                            <h4>PROBLEMA:</h4>
                            <p>Bloco em plano de 30º. Calcule a força paralela: Px = P ⋅ sen(30º).</p>
                        </div>
                        <div class="video-links">
                            <a href="https://www.youtube.com/watch?v=SRE_5B9nI0I" target="_blank" class="video-btn">▶ Ver Aula</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>`;
    
    // Renderização KaTeX com IDs fixos
    setTimeout(() => {
        katex.render("S = S_0 + v \\cdot t", document.getElementById('f-linear'));
        katex.render("S = v_0 t + \\frac{a t^2}{2}", document.getElementById('f-quad'));
        katex.render("\\sin \\theta = \\frac{O}{H}", document.getElementById('f-trig'));
    }, 50);
}
