// --- SISTEMA DE ESTRELAS ---
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
const stars = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xffffff, size: 0.8}));
scene.add(stars);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0004;
    renderer.render(scene, camera);
}
animate();

// --- NAVEGAÇÃO E CONTEÚDO ---
function goToModule(id) {
    const music = document.getElementById('bg-music');
    if(music) { music.play().catch(() => console.log("Clique para ativar o som")); }

    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('module-screen').classList.add('active');
    
    const content = document.getElementById('module-content');
    
    if(id === 'pre-calculo') {
        content.innerHTML = `
            <div class="dashboard-wrapper">
                <div class="header-stats">
                    <div>
                        <small>CONTAGEM REGRESSIVA</small>
                        <div class="timer-box"><span>00:23</span></div>
                    </div>
                    <h1 style="font-family:Orbitron; font-size: 1.5rem; margin:0;">NÍVEIS DE FÍSICA</h1>
                </div>

                <div class="atom-container">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Stylised_Lithium_Atom.svg" class="atom-svg">
                </div>

                <div class="grid-main">
                    <div class="content-block highlight-card">
                        <img src="imagem/walter_lewin.jfif" style="width:100%; border-radius:5px; margin-bottom:15px; opacity:0.8">
                        <h2 style="color:var(--neon-blue); font-family:Orbitron; font-size:1rem;">Nível 1: Pré-Cálculo</h2>
                        <p style="font-size:0.9rem; opacity:0.8">"A Física funciona! Vamos explorar as bases matemáticas."</p>
                    </div>

                    <div class="content-block">
                        <h3 style="border-bottom:1px solid #333; padding-bottom:10px; margin-top:0;">Conceitos e Fórmulas</h3>
                        <div class="formula-grid">
                            <div class="formula-item">Vx = V · cos(θ)</div>
                            <div class="formula-item">Vy = V · sen(θ)</div>
                            <div class="formula-item">tan(θ) = Vy / Vx</div>
                            <div class="formula-item">|V| = √(Vx² + Vy²)</div>
                        </div>

                        <div style="margin-top:20px; font-size:0.9rem; line-height:1.6">
                            <p>• O Plano Cartesiano (x, y, z)</p>
                            <p>• Ciclo Trigonométrico</p>
                            <p>• Funções Potência e Logaritmos</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
