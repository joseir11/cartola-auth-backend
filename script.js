// FUTPÃO - App completo gerado via JavaScript
// Toda a estrutura do HTML é criada aqui

// Estado da aplicação
let quantidadeAtual = 1;
let nomesJogadores = [];
let dataSelecionada = "";
let horarioSelecionado = "12h30";
let localSelecionado = "A DEFINIR";

// Chave PIX
const chavePix = "18e978ec-bc4b-43f1-bfdf-3647044be55f";

// Elemento raiz
const app = document.getElementById('app');

// ========== FUNÇÕES DE SALVAMENTO ==========
function salvarDados() {
    const dados = {
        quantidadeAtual,
        nomesJogadores,
        dataSelecionada,
        horarioSelecionado,
        localSelecionado
    };
    localStorage.setItem('futpao_dados', JSON.stringify(dados));
    console.log('Dados salvos!');
}

function carregarDados() {
    const dadosSalvos = localStorage.getItem('futpao_dados');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        quantidadeAtual = dados.quantidadeAtual || 1;
        nomesJogadores = dados.nomesJogadores || [];
        dataSelecionada = dados.dataSelecionada || "";
        horarioSelecionado = dados.horarioSelecionado || "12h30";
        localSelecionado = dados.localSelecionado || "A DEFINIR";
    }
    
    // Se não tem data salva, usa a data atual
    if (!dataSelecionada) {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        dataSelecionada = `${dia}/${mes}/${ano}`;
    }
}

// ========== SELETOR DE DATA PERSONALIZADO ==========
function abrirSeletorData() {
    // Cria um modal simples
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
    
    const painel = document.createElement('div');
    painel.style.backgroundColor = '#f5f3ef';
    painel.style.padding = '25px';
    painel.style.borderRadius = '28px';
    painel.style.textAlign = 'center';
    painel.style.width = '280px';
    painel.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    
    painel.innerHTML = `
        <h3 style="color:#5c4b3a; margin-bottom:20px;">Selecione a Data</h3>
        <div style="display:flex; gap:10px; justify-content:center; margin-bottom:20px;">
            <select id="selectDia" style="padding:10px; border-radius:12px; border:1px solid #d0c4b6; background:#fff;"></select>
            <select id="selectMes" style="padding:10px; border-radius:12px; border:1px solid #d0c4b6; background:#fff;"></select>
            <select id="selectAno" style="padding:10px; border-radius:12px; border:1px solid #d0c4b6; background:#fff;"></select>
        </div>
        <div style="display:flex; gap:15px;">
            <button id="btnConfirmarData" style="flex:1; padding:12px; background:#c7b9a8; color:white; border:none; border-radius:40px; cursor:pointer;">Confirmar</button>
            <button id="btnCancelarData" style="flex:1; padding:12px; background:#d9d0c4; color:#5c4b3a; border:none; border-radius:40px; cursor:pointer;">Cancelar</button>
        </div>
    `;
    
    modal.appendChild(painel);
    document.body.appendChild(modal);
    
    // Preencher dias (1-31)
    const selectDia = painel.querySelector('#selectDia');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = String(i).padStart(2, '0');
        selectDia.appendChild(option);
    }
    
    // Preencher meses
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const selectMes = painel.querySelector('#selectMes');
    meses.forEach((mes, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = mes;
        selectMes.appendChild(option);
    });
    
    // Preencher anos (2020 a 2030)
    const selectAno = painel.querySelector('#selectAno');
    for (let i = 2020; i <= 2030; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectAno.appendChild(option);
    }
    
    // Carregar data atual
    const partes = dataSelecionada.split('/');
    if (partes.length === 3) {
        selectDia.value = parseInt(partes[0]);
        selectMes.value = parseInt(partes[1]);
        selectAno.value = parseInt(partes[2]);
    }
    
    // Eventos
    painel.querySelector('#btnConfirmarData').addEventListener('click', () => {
        const dia = String(selectDia.value).padStart(2, '0');
        const mes = String(selectMes.value).padStart(2, '0');
        const ano = selectAno.value;
        dataSelecionada = `${dia}/${mes}/${ano}`;
        
        const badgeData = document.getElementById('badgeData');
        if (badgeData) badgeData.textContent = dataSelecionada;
        
        salvarDados();
        document.body.removeChild(modal);
    });
    
    painel.querySelector('#btnCancelarData').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// ========== CRIAÇÃO DOS COMPONENTES ==========
function criarTopBar() {
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.innerHTML = `
        <span class="icon-emoji">⚽</span>
        <h1>FUTPÃO</h1>
        <span class="icon-emoji">🍞</span>
    `;
    return topBar;
}

function criarCardPrincipal() {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-header">
            <h2>JOGADORES</h2>
            <div class="mascote-container">
                <img src="wr.png" alt="mascote" class="mascote-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span class="mascote-fallback" style="display:none; font-size:2rem;">🐺</span>
                <div class="pix-circle" id="pixCircle">
                    <img src="pix.png" alt="PIX" class="pix-img" onerror="this.style.display='none'; this.parentElement.innerHTML='💰';">
                </div>
            </div>
        </div>
        
        <div class="controle-quantidade">
            <button class="btn-menos" id="btnMenos">–</button>
            <span class="badge badge-quantidade" id="quantidadeJogadores">${quantidadeAtual}</span>
            <button class="btn-mais" id="btnMais">+</button>
        </div>
        
        <div class="info-container">
            <div class="info-row">
                <span class="info-label">DATA:</span>
                <span class="badge-info" id="badgeData">${dataSelecionada}</span>
            </div>
            <div class="info-row">
                <span class="info-label">HORÁRIO:</span>
                <span class="badge-info" id="badgeHorario">${horarioSelecionado}</span>
            </div>
            <div class="info-row">
                <span class="info-label">LOCAL:</span>
                <span class="badge-info badge-editavel" id="badgeLocal">${localSelecionado}</span>
            </div>
        </div>
    `;
    return card;
}

function criarContainerBadges() {
    const container = document.createElement('div');
    container.className = 'container-badges';
    container.id = 'containerBadges';
    return container;
}

// ========== FUNÇÕES PRINCIPAIS ==========
function copiarChavePix() {
    navigator.clipboard.writeText(chavePix);
    alert("CHAVE PIX COPIADA! ✅\n" + chavePix);
}

function editarHorario() {
    const novoHorario = prompt("Digite o horário (exemplo: 12h30 ou 14h00):", horarioSelecionado);
    if (novoHorario !== null && novoHorario.trim() !== '') {
        horarioSelecionado = novoHorario.trim();
        const badgeHorario = document.getElementById('badgeHorario');
        if (badgeHorario) badgeHorario.textContent = horarioSelecionado;
        salvarDados();
    }
}

function editarLocal() {
    const novoLocal = prompt("Digite o local da pelada:", localSelecionado);
    if (novoLocal !== null && novoLocal.trim() !== '') {
        localSelecionado = novoLocal.trim().toUpperCase();
        const badgeLocal = document.getElementById('badgeLocal');
        if (badgeLocal) badgeLocal.textContent = localSelecionado;
        salvarDados();
    }
}

function editarQuantidadeManual() {
    const novaQtde = prompt(`Quantidade de jogadores:`, quantidadeAtual);
    if (novaQtde !== null && novaQtde.trim() !== '') {
        let qtde = parseInt(novaQtde.trim());
        if (isNaN(qtde) || qtde < 1) qtde = 1;
        if (qtde > 99) qtde = 99;
        atualizarQuantidade(qtde);
    }
}

function atualizarBadgesJogadores() {
    const containerBadges = document.getElementById('containerBadges');
    if (!containerBadges) return;
    containerBadges.innerHTML = '';
    
    for (let i = 0; i < quantidadeAtual; i++) {
        if (nomesJogadores[i] === undefined) {
            nomesJogadores[i] = `JOGADOR ${i+1}`;
        }
        const badge = document.createElement('div');
        badge.classList.add('badge-jogador');
        badge.textContent = nomesJogadores[i];
        badge.setAttribute('data-indice', i);
        badge.addEventListener('click', () => editarNomeJogador(parseInt(badge.getAttribute('data-indice'))));
        containerBadges.appendChild(badge);
    }
    salvarDados();
}

function editarNomeJogador(indice) {
    const novoNome = prompt(`Nome do jogador ${indice+1}:`, nomesJogadores[indice]);
    if (novoNome !== null && novoNome.trim() !== '') {
        nomesJogadores[indice] = novoNome.trim().toUpperCase();
        atualizarBadgesJogadores();
    }
}

function atualizarQuantidade(novaQtde) {
    if (novaQtde < 1) return;
    quantidadeAtual = novaQtde;
    const quantidadeSpan = document.getElementById('quantidadeJogadores');
    if (quantidadeSpan) quantidadeSpan.textContent = quantidadeAtual;
    
    if (nomesJogadores.length > quantidadeAtual) {
        nomesJogadores = nomesJogadores.slice(0, quantidadeAtual);
    } else {
        for (let i = nomesJogadores.length; i < quantidadeAtual; i++) {
            nomesJogadores[i] = `JOGADOR ${i+1}`;
        }
    }
    atualizarBadgesJogadores();
}

function configurarEventos() {
    document.getElementById('btnMenos')?.addEventListener('click', () => atualizarQuantidade(quantidadeAtual - 1));
    document.getElementById('btnMais')?.addEventListener('click', () => atualizarQuantidade(quantidadeAtual + 1));
    document.getElementById('quantidadeJogadores')?.addEventListener('click', editarQuantidadeManual);
    document.getElementById('pixCircle')?.addEventListener('click', copiarChavePix);
    document.getElementById('badgeData')?.addEventListener('click', abrirSeletorData);
    document.getElementById('badgeHorario')?.addEventListener('click', editarHorario);
    document.getElementById('badgeLocal')?.addEventListener('click', editarLocal);
}

function renderizarApp() {
    carregarDados();
    app.innerHTML = '';
    app.appendChild(criarTopBar());
    app.appendChild(criarCardPrincipal());
    app.appendChild(criarContainerBadges());
    configurarEventos();
    atualizarBadgesJogadores();
}

document.addEventListener('DOMContentLoaded', renderizarApp);
