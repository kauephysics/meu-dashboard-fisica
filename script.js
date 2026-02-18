// --- BACKGROUND ESTRELAS ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starVertices = [];
for(let i=0; i<5000; i++) {
    starVertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.7}));
scene.add(stars);
camera.position.z = 1;

// --- SISTEMA DO ÁTOMO 3D (DENTRO DO CARD) ---
const atomScene = new THREE.Scene();
const atomCam = new THREE.PerspectiveCamera(45, 320/300, 0.1, 1000);
const atomRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
atomRenderer.setSize(320, 300);
document.getElementById('atom-canvas-container').appendChild(atomRenderer.domElement);

// Núcleo
const core = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), new THREE.MeshBasicMaterial({color: 0x00d4ff}));
atomScene.add(core);

// Órbitas e Elétrons
const createOrbit = (rotationZ) => {
    const group = new THREE.Group();
    const curve = new THREE.EllipseCurve(0, 0, 2, 1, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.3 });
    const orbit = new THREE.Line(geometry, material);
    
    const electron = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshBasicMaterial({color: 0x00ffcc}));
    group.add(orbit);
    group.add(electron);
    group.rotation.z = rotationZ;
    return { group, electron };
};

const orbits = [createOrbit(Math.PI/4), createOrbit(-Math.PI/4), createOrbit(Math.PI/2)];
orbits.forEach(o => atomScene.add(o.group));
atomCam.position.z = 6;

// --- ANIMAÇÃO GERAL ---
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    
    // Animando o átomo
    const time = Date.now() * 0.002;
    orbits.forEach((o, i) => {
        o.group.rotation.y += 0.02;
        o.electron.position.x = Math.cos(time + i) * 2;
        o.electron.position.y = Math.sin(time + i) * 1;
    });
    
    renderer.render(scene, camera);
    atomRenderer.render(atomScene, atomCam);
}
animate();

// --- LOGICA DE MOVIMENTO 3D DO CARD ---
function handleCard3D(e) {
    const card = document.getElementById('main-card');
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 212, 255, 0.3)`;
}

function resetCard3D() {
    const card = document.getElementById('main-card');
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
}

// --- TRANSIÇÃO COMETA ---
function triggerComet(id) {
    const comet = document.getElementById('comet-transition');
    const effectIframe = document.getElementById('comet-effect');
    const musicIframe = document.getElementById('video-music');

    comet.classList.add('comet-active');

    if (effectIframe) {
        effectIframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
        effectIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    if (musicIframe) {
        musicIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        musicIframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
    }

    setTimeout(() => {
        if(id === 'home') goHome();
        else goToModule(id);
    }, 600);

    setTimeout(() => comet.classList.remove('comet-active'), 1200);
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
                    <h2 style="color:var(--neon-blue); font-family:'Kalnia Glaze';">Revisão Pré-Cálculo</h2>
                    <div class="formula-item">sen²θ + cos²θ = 1</div>
                    <div class="formula-item">f(x) = ax + b</div>
                </div>
            </div>`;
    }
}

function goHome() {
    document.getElementById('module-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
}
