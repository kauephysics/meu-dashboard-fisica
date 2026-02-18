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

function goToModule(id) {
    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('module-screen').classList.add('active');
    const content = document.getElementById('module-content');
    
    if(id === 'pre-calculo') {
        content.innerHTML = "<h2>Pré-Cálculo</h2><p>Estude Vetores e Funções.</p>";
    } else {
        content.innerHTML = "<h2>Cinemática</h2><p>Estude Derivadas e Integrais.</p>";
    }
}

function goHome() {
    document.getElementById('module-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
}
