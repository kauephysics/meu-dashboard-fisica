// --- BACKGROUND DE ESTRELAS (THREE.JS) ---
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

// --- LÓGICA DO DASHBOARD ---
function goToModule(id) {
    const iframe = document.getElementById('video-music');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
    }

    const screen = document.getElementById('module-screen');
    document.getElementById('home-screen').classList.remove('active');
    screen.classList.add('active');

    if(id === 'pre-calculo') {
        screen.innerHTML = `
            <div class="dashboard-wrapper">
                <button class="back-btn" onclick="goHome()">← VOLTAR AO MENU</button>
                
                <h1 style="font-family:Orbitron; color:var(--neon-blue); margin-bottom:20px;">ROTEIRO DE REVISÃO PRÉ-CÁLCULO</h1>

                <div class="grid-main">
                    <div class="content-block">
                        <h3 style="color:var(--neon-blue); font-family:Orbitron;">1. Funções (Essencial)</h3>
                        <p>Dominar como as variáveis se comportam:</p>
                        <ul style="line-height:1.6; font-size:0.9rem;">
                            <li>• <b>Linear (1º Grau):</b> $f(x) = ax + b$ (Velocidade Constante)</li>
                            <li>• <b>Quadrática (2º Grau):</b> $f(x) = ax^2 + bx + c$ (Aceleração)</li>
                            <li>• <b>Exponencial:</b> Decaimento e crescimento.</li>
                        </ul>
                        
                        <h3 style="color:var(--neon-blue); font-family:Orbitron; margin-top:20px;">2. Trigonometria</h3>
                        <p>A base para vetores e ondas:</p>
                        <ul style="line-height:1.6; font-size:0.9rem;">
                            <li>• Ciclo Trigonométrico (Radianos)</li>
                            <li>• Seno e Cosseno na decomposição de forças.</li>
                            <li>• Identidade: $sen^2(x) + cos^2(x) = 1$</li>
                        </ul>
                    </div>

                    <div class="content-block">
                        <h3 style="color:var(--neon-green); font-family:Orbitron;">Fórmulas para Memorizar</h3>
                        <div class="formula-grid">
                            <div class="formula-item">sen(θ) = Oposto/Hip</div>
                            <div class="formula-item">cos(θ) = Adj/Hip</div>
                            <div class="formula-item">y - y0 = m(x - x0)</div>
                            <div class="formula-item">x = [-b ± √Δ] / 2a</div>
                        </div>

                        <div style="margin-top:30px; padding:15px; background:rgba(0,212,255,0.1); border-radius:10px;">
                            <h4 style="margin:0; color:var(--neon-blue);">Dica do Físico:</h4>
                            <p style="font-size:0.9rem; margin-top:10px;">Foque em entender **gráficos**. Na faculdade de Física, você raramente fará contas apenas com números; você descreverá fenômenos através de curvas e inclinações.</p>
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
