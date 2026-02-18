// --- BACKGROUND ESTRELAS ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starGeo = new THREE.BufferGeometry();
const starVertices = [];
for(let i=0; i<4000; i++) {
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
atomRenderer.setSize(340, 240);
document.getElementById('atom-canvas-container').appendChild(atomRenderer.domElement);

const core = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshBasicMaterial({color: 0x00d4ff}));
atomScene.add(core);

const createOrbit = (rotZ) => {
    const group = new THREE.Group();
    const curve = new THREE.EllipseCurve(0, 0, 2.2, 1.1, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(50);
    const orbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.2 }));
    const electron = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial({color: 0x00ffcc}));
    group.add(orbit, electron);
    group.rotation.z = rotZ;
    return { group, electron };
};

const orbits = [createOrbit(Math.PI/4), createOrbit(-Math.PI/4), createOrbit(Math.PI/2)];
orbits.forEach(o => atomScene.add(o.group));
atomCam.position.z = 6;

// --- RENDERIZAÇÃO DE FÓRMULAS (KATEX) ---
function renderFormulas() {
    try {
        katex.render("E = mc^2", document.getElementById('float-1'));
        katex.render("F = G \\frac{m_1 m_2}{r^2}", document.getElementById('float-2'));
        katex.render("\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0}", document.getElementById('float-3'));
    } catch(e) {}
}
renderFormulas();

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

// --- LOGICA DE MOVIMENTO ---
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

// --- TRANSIÇÃO ---
function triggerComet(id) {
    const comet = document.getElementById('comet-transition');
    const effectIframe = document.getElementById('comet-effect');
    comet.classList.add('comet-active');
    
    if (effectIframe) {
        effectIframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
        effectIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }

    setTimeout(() => {
        const home = document.getElementById('home-screen');
        const mod = document.getElementById('module-screen');
        if(id === 'home') { mod.classList.remove('active'); home.classList.add('active'); }
        else { home.classList.remove('active'); mod.classList.add('active'); renderModule(); }
    }, 550);

    setTimeout(() => comet.classList.remove('comet-active'), 1100);
}

function renderModule() {
    const mod = document.getElementById('module-screen');
    mod.innerHTML = `
        <div class="glass-main">
            <div style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 style="font-family:'Kalnia Glaze'; font-size:2.2rem; margin:0;">Revisão</h2>
                <button class="badge" style="cursor:pointer; border:none; padding:8px 15px;" onclick="triggerComet('home')">← VOLTAR</button>
            </div>
            <div class="module-content">
                <div class="formula-card" id="form-1"></div>
                <div class="formula-card" id="form-2"></div>
                <div class="formula-card" id="form-3"></div>
            </div>
        </div>`;
    
    // Renderiza as fórmulas dentro dos novos cards
    katex.render("\\sin^2 \\theta + \\cos^2 \\theta = 1", document.getElementById('form-1'));
    katex.render("f(x) = ax + b", document.getElementById('form-2'));
    katex.render("\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}", document.getElementById('form-3'));
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
