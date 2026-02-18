// --- BACKGROUND ESTRELAS ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starVertices = [];
for(let i=0; i<6000; i++) {
    starVertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.8}));
scene.add(stars);
camera.position.z = 1;

// --- ÁTOMO 3D ---
const atomScene = new THREE.Scene();
const atomCam = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
const atomRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.getElementById('atom-canvas-container');
atomRenderer.setSize(400, 300);
container.appendChild(atomRenderer.domElement);

const core = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshBasicMaterial({color: 0x00d4ff}));
atomScene.add(core);

const createOrbit = (rotZ) => {
    const group = new THREE.Group();
    const curve = new THREE.EllipseCurve(0, 0, 2.2, 1.1, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(60);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const orbit = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.2 }));
    const electron = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial({color: 0x00ffcc}));
    group.add(orbit, electron);
    group.rotation.z = rotZ;
    return { group, electron };
};

const orbits = [createOrbit(Math.PI/4), createOrbit(-Math.PI/4), createOrbit(Math.PI/2)];
orbits.forEach(o => atomScene.add(o.group));
atomCam.position.z = 6;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0003;
    const time = Date.now() * 0.002;
    orbits.forEach((o, i) => {
        o.group.rotation.y += 0.015;
        o.electron.position.x = Math.cos(time + i) * 2.2;
        o.electron.position.y = Math.sin(time + i) * 1.1;
    });
    renderer.render(scene, camera);
    atomRenderer.render(atomScene, atomCam);
}
animate();

// --- LÓGICA DE MOVIMENTO E TRANSIÇÃO ---
function handleCard3D(e) {
    const card = document.getElementById('main-card');
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -20}deg) rotateY(${x * 20}deg)`;
}

function resetCard3D() {
    document.getElementById('main-card').style.transform = `rotateX(0deg) rotateY(0deg)`;
}

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
        const home = document.getElementById('home-screen');
        const mod = document.getElementById('module-screen');
        if(id === 'home') { mod.classList.remove('active'); home.classList.add('active'); }
        else { home.classList.remove('active'); mod.classList.add('active'); renderModule(); }
    }, 600);

    setTimeout(() => comet.classList.remove('comet-active'), 1200);
}

function renderModule() {
    document.getElementById('module-screen').innerHTML = `
        <div class="glass-main" style="height: auto; padding: 50px;">
            <button class="badge" style="cursor:pointer; border:none; margin-bottom:20px;" onclick="triggerComet('home')">← VOLTAR</button>
            <h2 style="font-family:'Kalnia Glaze'; font-size:3rem; margin-bottom:30px;">Revisão Pré-Cálculo</h2>
            <div style="width:100%; display:grid; gap:20px;">
                <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:15px; border-left:4px solid var(--neon-blue);">
                    <code style="font-family:'Orbitron'; color:var(--neon-blue); font-size:1.2rem;">sen²θ + cos²θ = 1</code>
                </div>
                <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:15px; border-left:4px solid var(--neon-pink);">
                    <code style="font-family:'Orbitron'; color:var(--neon-pink); font-size:1.2rem;">f(x) = ax + b</code>
                </div>
            </div>
        </div>`;
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
