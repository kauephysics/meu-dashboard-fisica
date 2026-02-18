// --- FUNDO DE ESTRELAS ---
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
const stars = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xffffff, size: 0.7}));
scene.add(stars);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// --- SISTEMA DE TRANSIÇÃO (COMETA + SONS) ---
function triggerComet(id) {
    const comet = document.getElementById('comet-transition');
    const effectIframe = document.getElementById('comet-effect');
    const musicIframe = document.getElementById('video-music');

    // Ativa efeito visual
    comet.classList.add('comet-active');

    // Som da transição (YouTube)
    if (effectIframe) {
        effectIframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
        effectIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }

    // Música de fundo a 20%
    if (musicIframe) {
        musicIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        musicIframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
    }

    // Troca conteúdo no ápice do cometa
    setTimeout(() => {
        if(id === 'home') goHome();
        else goToModule(id);
    }, 600);

    // Reset da animação
    setTimeout(() => {
        comet.classList.remove('comet-active');
        effectIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }, 1200);
}

function goToModule(id) {
    document.getElementById('home-screen').classList.remove('active');
    const screen = document.getElementById('module-screen');
    screen.classList.add('active');

    if(id === 'pre-calculo') {
        screen.innerHTML = `
            <div class="dashboard-wrapper">
                <button class="back-btn" onclick="triggerComet('home')">← VOLTAR</button>
                <div class="content-block">
                    <h2 style="color:var(--neon-blue); font-family:'Kalnia Glaze';">Material de Revisão</h2>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px;">
                        <div>
                            <h4 style="color:var(--neon-blue)">Funções</h4>
                            <div class="formula-item">Linear: f(x) = ax + b</div>
                            <div class="formula-item">Quadrática: ax² + bx + c</div>
                        </div>
                        <div>
                            <h4 style="color:var(--neon-blue)">Trigonometria</h4>
                            <div class="formula-item">sen²θ + cos²θ = 1</div>
                            <div class="formula-item">tgθ = senθ / cosθ</div>
                        </div>
                    </div>
                </div>
            </div>`;
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
