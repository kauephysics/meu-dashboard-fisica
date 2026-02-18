// --- SISTEMA DE ESTRELAS ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starPos = [];
for(let i=0; i<4000; i++) starPos.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.8}));
scene.add(stars);
camera.position.z = 1;

// --- ÁTOMO 3D NO CARD ---
const atomScene = new THREE.Scene();
const atomCam = new THREE.PerspectiveCamera(45, 1.5, 0.1, 100);
const atomRenderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
atomRenderer.setSize(360, 230);
document.getElementById('atom-canvas-container').appendChild(atomRenderer.domElement);

const core = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), new THREE.MeshBasicMaterial({color: 0x00d4ff}));
atomScene.add(core);

const createRing = (color, rx, ry) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.03, 16, 100), new THREE.MeshBasicMaterial({color}));
    ring.rotation.x = rx; ring.rotation.y = ry;
    return ring;
};
const r1 = createRing(0xff00cc, Math.PI/3, 0);
const r2 = createRing(0x00d4ff, -Math.PI/3, Math.PI/4);
atomScene.add(r1, r2);
atomCam.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0003;
    r1.rotation.z += 0.04; r2.rotation.z -= 0.04;
    atomRenderer.render(atomScene, atomCam);
    renderer.render(scene, camera);
}
animate();

// --- CONTROLE DE INTERFACE ---
function triggerComet(dest) {
    const comet = document.getElementById('comet-transition');
    comet.classList.add('comet-active');
    setTimeout(() => {
        document.getElementById('home-screen').classList.toggle('active', dest === 'home');
        document.getElementById('module-screen').classList.toggle('active', dest === 'module');
        renderMath();
    }, 400);
    setTimeout(() => comet.classList.remove('comet-active'), 800);
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
    katex.render("\\vec{F} = m \\cdot \\vec{a}", document.getElementById('float-2'));
    if(document.getElementById('p1-math')) {
        katex.render("S = S_0 + v \\cdot t", document.getElementById('p1-math'));
        katex.render("y = v_0 t - 5t^2", document.getElementById('p2-math'));
        katex.render("P_x = P \\cdot \\sin(\\theta)", document.getElementById('p3-math'));
    }
}
window.onload = renderMath;
