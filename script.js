// Estrelas de fundo
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starVertices = [];
for (let i = 0; i < 4000; i++) starVertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
const starGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 }));
scene.add(stars);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0003;
    renderer.render(scene, camera);
}
animate();

// Troca de Telas
function toggleScreen() {
    document.getElementById('home-screen').classList.toggle('active');
    document.getElementById('module-screen').classList.toggle('active');
    renderMath();
}

// Renderizar Fórmulas
function renderMath() {
    // Home
    katex.render("E = mc^2", document.getElementById('f-mc2'));
    katex.render("F = m \\cdot a", document.getElementById('f-ma'));
    
    // Problemas
    if(document.getElementById('p1-formula')) {
        katex.render("S = S_0 + v \\cdot t", document.getElementById('p1-formula'));
        katex.render("S = v_0 t - \\frac{g t^2}{2}", document.getElementById('p2-formula'));
        katex.render("\\sin \\theta = \\frac{O}{H}", document.getElementById('p3-formula'));
    }
}

window.onload = renderMath;
