// --- SISTEMA 3D DE FUNDO ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starPos = [];
for(let i=0; i<3000; i++) starPos.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
const starGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.7}));
scene.add(stars);
camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// --- LÓGICA DE NAVEGAÇÃO ---
function triggerComet(targetScreen) {
    const comet = document.getElementById('comet-transition');
    comet.classList.add('comet-active');
    
    setTimeout(() => {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(targetScreen + '-screen').classList.add('active');
        if(targetScreen === 'module') showModule();
    }, 400);

    setTimeout(() => {
        comet.classList.remove('comet-active');
    }, 800);
}

// --- CONTEÚDO: FUNÇÕES E TRIGONOMETRIA (MÉDIO -> SUPERIOR) ---
function showModule() {
    const mainContent = document.querySelector('#module-screen .glass-main');
    
    const problemas = [
        { id: "p1", titulo: "Domínio e Restrição", desc: "Determine o domínio de f(x).", aula: "No superior, o domínio é a base. Raiz quadrada exige x-2 ≥ 0 e denominador x-5 ≠ 0.", formula: "f(x) = \\frac{\\sqrt{x-2}}{x-5}" },
        { id: "p2", titulo: "Composição de Funções", desc: "Calcule a composta (f ∘ g)(x).", aula: "Substitua toda a função g no lugar do 'x' da função f. Essencial para a Regra da Cadeia.", formula: "f(x)=x^2+3, \\quad g(x)=\\ln(x)" },
        { id: "p3", titulo: "Função Inversa", desc: "Encontre a inversa f⁻¹(x).", aula: "Troque x por y e isole o novo y. Define a relação entre exponenciais e logaritmos.", formula: "f(x) = \\frac{2x-3}{x+1}" },
        { id: "p4", titulo: "Transformação Linear", desc: "Como o gráfico se move?", aula: "Somar dentro do argumento move horizontalmente (invertido). Somar fora move verticalmente.", formula: "g(x) = f(x-3) + 2" },
        { id: "p5", titulo: "Paridade de Funções", desc: "A função é par ou ímpar?", aula: "Se f(-x) = f(x) é par (simetria no eixo Y). Se f(-x) = -f(x) é ímpar (simetria na origem).", formula: "f(x) = x \\cdot \\cos(x)" },
        { id: "p6", titulo: "Logaritmos Naturais", desc: "Resolva para x.", aula: "Aplique ln (logaritmo natural) em ambos os lados para 'baixar' o expoente x.", formula: "2^{x+1} = 5" },
        { id: "p7", titulo: "Equação Exponencial", desc: "Ache as raízes.", aula: "Dica de Superior: Substitua eˣ por 'u' para transformar em uma equação de 2º grau.", formula: "e^{2x} - 3e^x + 2 = 0" },
        { id: "p8", titulo: "Comportamento Assintótico", desc: "O que ocorre quando x → ∞?", aula: "Base do conceito de Limite. A função aproxima-se de um valor sem nunca tocá-lo.", formula: "f(x) = \\frac{1}{x}" },
        { id: "p9", titulo: "Círculo Trigonométrico", desc: "Converta e localize o cosseno.", aula: "No superior, radianos são padrão. 150° = 5π/6 rad. O cosseno é o eixo X.", formula: "\\cos(150^\\circ)" },
        { id: "p10", titulo: "Identidade Fundamental", desc: "Ache o valor de cos(x).", aula: "Use sen²x + cos²x = 1. Cuidado com o sinal: no 2º quadrante o cosseno é negativo!", formula: "\\text{sen}(x) = \\frac{3}{5}, \\quad x \\in II" },
        { id: "p11", titulo: "Soma de Arcos", desc: "Calcule o valor exato.", aula: "Use a fórmula: cos(a+b) = cos(a)cos(b) - sen(a)sen(b).", formula: "\\cos(75^\\circ) = \\cos(45^\\circ + 30^\\circ)" },
        { id: "p12", titulo: "Arco Duplo", desc: "Simplifique a expressão.", aula: "Muito usado em integrais para reduzir potências de funções trigonométricas.", formula: "\\text{sen}(2x) = 2\\text{sen}(x)\\cos(x)" },
        { id: "p13", titulo: "Tangente e Assíntotas", desc: "Onde a função não existe?", aula: "A tangente é sen/cos. Ela explode (infinito) onde o cos(x) = 0.", formula: "f(x) = \\tan(x)" },
        { id: "p14", titulo: "Secante e Pitágoras", desc: "Simplifique a expressão.", aula: "Lembre-se que sec(x) = 1/cos(x). A relação pitagórica liga sen, cos e sec.", formula: "(1 - \\text{sen}^2 x) \\cdot \\sec^2 x" },
        { id: "p15", titulo: "Período da Onda", desc: "Qual a frequência desta função?", aula: "O número que multiplica o x (k=2) encurta o período: T = 2π/k.", formula: "f(x) = \\text{sen}(2x)" },
        { id: "p16", titulo: "Inversas (Arco)", desc: "Ache o ângulo.", aula: "Função arco-seno: 'Qual o ângulo cujo seno resulta em 1?'.", formula: "y = \\arcsen(1)" },
        { id: "p17", titulo: "Lei dos Cossenos", desc: "Aplicação em vetores.", aula: "Fundamental para somar forças ou vetores em física de nível superior.", formula: "c^2 = a^2 + b^2 - 2ab \\cos(\\theta)" },
        { id: "p18", titulo: "Limites Trigonométricos", desc: "Um limite fundamental.", aula: "Este é o limite mais importante da trigonometria no cálculo inicial.", formula: "\\lim_{x \\to 0} \\frac{\\text{sen}(x)}{x} = 1" },
        { id: "p19", titulo: "Identidade de Euler", desc: "A ponte entre funções.", aula: "A conexão mais bela da matemática: exponenciais complexas e trigonometria.", formula: "e^{i\\theta} = \\cos\\theta + i\\text{sen}\\theta" },
        { id: "p20", titulo: "Deslocamento de Fase", desc: "Ajuste fino da onda.", aula: "O termo +π move a função senoidal horizontalmente no gráfico.", formula: "f(x) = A \\cdot \\text{sen}(wx + \\phi)" }
    ];

    let cardsHTML = problemas.map(p => `
        <div class="problem-card">
            <div id="${p.id}" class="math-box"></div>
            <p><strong>${p.titulo}:</strong> ${p.desc}</p>
            <div class="mini-aula">
                <b style="color:var(--neon-pink)">DICA SUPERIOR:</b><br>
                ${p.aula}
            </div>
        </div>
    `).join('');

    mainContent.innerHTML = `
        <h1 class="neon-title">Revisão Pré-Cálculo</h1>
        <p class="subtitle">20 Tópicos Essenciais: Funções e Trigonometria</p>
        <button class="back-btn" onclick="triggerComet('home')" style="margin-bottom:20px">← VOLTAR AO INÍCIO</button>
        <div class="problem-grid">
            ${cardsHTML}
        </div>
    `;

    // Renderiza as fórmulas após criar o HTML
    problemas.forEach(p => {
        katex.render(p.formula, document.getElementById(p.id), { throwOnError: false });
    });
}
