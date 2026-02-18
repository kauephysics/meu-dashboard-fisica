// --- ESTRELAS ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starPos = [];
for(let i=0; i<3000; i++) starPos.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.7}));
scene.add(stars);
camera.position.z = 1;

// --- ÁTOMO 3D ---
const atomScene = new THREE.Scene();
const atomCam = new THREE.PerspectiveCamera(45, 1.6, 0.1, 100);
const atomRenderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
atomRenderer.setSize(350, 220);
document.getElementById('atom-canvas-container').appendChild(atomRenderer.domElement);

const core = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), new THREE.MeshBasicMaterial({color: 0x00d4ff}));
atomScene.add(core);

const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 100);
const ring1 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({color: 0xff00cc}));
const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({color: 0x00d4ff}));
ring2.rotation.x = Math.PI / 2;
atomScene.add(ring1, ring2);
atomCam.position.z = 4;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0002;
    ring1.rotation.y += 0.05; ring1.rotation.x += 0.02;
    ring2.rotation.y -= 0.03; ring2.rotation.z += 0.04;
    atomRenderer.render(atomScene, atomCam);
    renderer.render(scene, camera);
}
animate();

// --- LÓGICA DE TELAS ---
function triggerComet(dest) {
    document.getElementById('comet-transition').classList.add('comet-active');
    setTimeout(() => {
        document.getElementById('home-screen').classList.toggle('active', dest === 'home');
        document.getElementById('module-screen').classList.toggle('active', dest === 'module');
        renderMath();
    }, 400);
    setTimeout(() => document.getElementById('comet-transition').classList.remove('comet-active'), 800);
}

function handleCard3D(e) {
    const card = document.getElementById('main-card');
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -15}deg) rotateY(${x * 15}deg)`;
}

function resetCard3D() { document.getElementById('main-card').style.transform = 'rotateX(0deg) rotateY(0deg)'; }

function renderMath() {
    katex.render("E = mc^2", document.getElementById('float-1'));
    katex.render("F = m \\cdot a", document.getElementById('float-2'));
    if(document.getElementById('p1-math')) {
        katex.render("S = S_0 + v \\cdot t", document.getElementById('p1-math'));
        katex.render("S = v_0 t - 5t^2", document.getElementById('p2-math'));
        katex.render("P_x = P \\cdot \\sin \\theta", document.getElementById('p3-math'));
    }
}
window.onload = renderMath;
