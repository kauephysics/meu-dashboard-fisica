// --- CONFIGURAÇÕES BASE ---
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

// Animação Fundo
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0002;
    renderer.render(scene, camera);
}
animate();

// --- DASHBOARD DE ESTUDO ---
function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main">
            <header style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="font-family:'Orbitron'; font-size:1.5rem; margin:0; color:var(--neon-blue);">MAPA DE ESTUDO ATIVO</h2>
                <button class="badge" style="cursor:pointer; border:none;" onclick="triggerComet('home')">← VOLTAR</button>
            </header>

            <div class="study-grid">
                <section>
                    <div class="topic-card">
                        <div class="formula-box" id="f-linear"></div>
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
                        <div class="video-links">
                            <a href="https://www.youtube.com/watch?v=t_Uj1hM_yL0" target="_blank" class="video-btn">▶ Aula: Trigonometria Base</a>
                            <a href="https://www.youtube.com/watch?v=S-k8_S93S9k" target="_blank" class="video-btn">★ Aula MIT (Lewin)</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>`;
    
    // Renderização KaTeX
    katex.render("S = S_0 + v \\cdot t", document.getElementById('f-linear'));
    katex.render("S = v_0 t + \\frac{a t^2}{2}", document.getElementById('f-quad'));
    katex.render("\\sin \\theta = \\frac{O}{H} \\mid \\cos \\theta = \\frac{A}{H}", document.getElementById('f-trig'));
    katex.render("2\\pi \\text{ rad} = 360^\\circ", document.getElementById('f-circle'));
}

// Funções de controle de tela
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
