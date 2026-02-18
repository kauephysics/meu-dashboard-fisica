// Configuração do Fundo de Estrelas (Three.js)
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
    stars.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Navegação entre Módulos
function goToModule(id) {
    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('module-screen').classList.add('active');
    const content = document.getElementById('module-content');
    
    if(id === 'pre-calculo') {
        content.innerHTML = `
            <h2 style="color: #00d4ff">Módulo 01: Pré-Cálculo</h2>
            <p>Foco: Decomposição de Vetores e Trigonometria.</p>
            <div style="background: rgba(0,212,255,0.1); padding: 15px; border-left: 5px solid #00d4ff;">
                <code>V_x = V * cos(θ)</code><br>
                <code>V_y = V * sen(θ)</code>
            </div>
        `;
    } else if(id === 'cinematica') {
        content.innerHTML = `
            <h2 style="color: #00d4ff">Módulo 02: Cinemática</h2>
            <p>Foco: Derivadas de Posição e Velocidade.</p>
            <div style="background: rgba(0,212,255,0.1); padding: 15px; border-left: 5px solid #00d4ff;">
                <code>v(t) = ds/dt</code><br>
                <code>a(t) = dv/dt</code>
            </div>
        `;
    }
}

function goHome() {
    document.getElementById('module-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
}

// Ajuste de janela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
