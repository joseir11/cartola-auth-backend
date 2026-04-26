// FUTPÃO - App completo gerado via JavaScript
// Toda a estrutura do HTML é criada aqui

// Estado da aplicação
let quantidadeAtual = 1;
let nomesJogadores = [];
let dataSelecionada = new Date().toLocaleDateString('pt-BR');
let horarioSelecionado = "12h30";
let localSelecionado = "A DEFINIR";

// Chave PIX (pode ser alterada aqui)
const chavePix = "18e978ec-bc4b-43f1-bfdf-3647044be55f";

// Elemento raiz onde tudo será inserido
const app = document.getElementById('app');

// Função para criar a barra superior
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

// Função para criar o card principal
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

// Função para criar o container de badges dos jogadores
function criarContainerBadges() {
    const container = document.createElement('div');
    container.className = 'container-badges';
    container.id = 'containerBadges';
    return container;
}

// Função para copiar chave PIX
async function copiarChavePix() {
    try {
        await navigator.clipboard.writeText(chavePix);
        alert("CHAVE PIX COPIADA! ✅\n" + chavePix);
    } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = chavePix;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert("CHAVE PIX COPIADA! ✅\n" + chavePix);
    }
}

// Função para converter data de DD/MM/YYYY para YYYY-MM-DD
function converterDataParaInput(dataStr) {
    const partes = dataStr.split('/');
    if (partes.length === 3) {
        return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
    }
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

// Função para converter data de YYYY-MM-DD para DD/MM/YYYY
function converterDataParaExibir(dataStr) {
    const partes = dataStr.split('-');
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataStr;
}

// Função para abrir calendário nativo (CORRIGIDA)
function abrirCalendario() {
    // Cria um input date dinâmico
    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.style.position = 'absolute';
    inputDate.style.left = '-9999px';
    inputDate.style.top = '-9999px';
    
    // Converte a data atual para o formato do input
    const dataAtualInput = converterDataParaInput(dataSelecionada);
    inputDate.value = dataAtualInput;
    
    // Adiciona ao body
    document.body.appendChild(inputDate);
    
    // Evento quando a data for alterada
    inputDate.addEventListener('change', (e) => {
        const novaData = e.target.value;
        if (novaData) {
            dataSelecionada = converterDataParaExibir(novaData);
            const badgeData = document.getElementById('badgeData');
            if (badgeData) {
                badgeData.textContent = dataSelecionada;
            }
        }
        // Remove o input do DOM
        document.body.removeChild(inputDate);
    });
    
    // Força a abertura do calendário
    inputDate.showPicker();
    
    // Fallback para navegadores que não suportam showPicker()
    if (!inputDate.showPicker) {
        inputDate.click();
    }
    
    // Remove o input se o usuário cancelar (evento blur)
    inputDate.addEventListener('blur', () => {
        setTimeout(() => {
            if (document.body.contains(inputDate)) {
                document.body.removeChild(inputDate);
            }
        }, 100);
    });
}

// Função para editar horário
function editarHorario() {
    const novoHorario = prompt("Digite o horário (exemplo: 12h30 ou 14h00):", horarioSelecionado);
    
    if (novoHorario !== null && novoHorario.trim() !== '') {
        horarioSelecionado = novoHorario.trim();
        const badgeHorario = document.getElementById('badgeHorario');
        if (badgeHorario) {
            badgeHorario.textContent = horarioSelecionado;
        }
    }
}

// Função para editar local
function editarLocal() {
    const novoLocal = prompt("Digite o local da pelada:", localSelecionado);
    
    if (novoLocal !== null && novoLocal.trim() !== '') {
        localSelecionado = novoLocal.trim().toUpperCase();
        const badgeLocal = document.getElementById('badgeLocal');
        if (badgeLocal) {
            badgeLocal.textContent = localSelecionado;
        }
    }
}

// Função para editar a quantidade manualmente
function editarQuantidadeManual() {
    const novaQtde = prompt(`Digite a quantidade de jogadores (mínimo 1, máximo 99):`, quantidadeAtual);
    
    if (novaQtde !== null && novaQtde.trim() !== '') {
        let qtde = parseInt(novaQtde.trim());
        
        if (isNaN(qtde)) {
            alert('Por favor, digite um número válido!');
            return;
        }
        
        if (qtde < 1) {
            alert('A quantidade mínima é 1 jogador!');
            return;
        }
        
        if (qtde > 99) {
            alert('A quantidade máxima é 99 jogadores!');
            return;
        }
        
        atualizarQuantidade(qtde);
    }
}

// Função para recriar todos os badges
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
        
        badge.addEventListener('click', (event) => {
            event.stopPropagation();
            const indice = parseInt(event.currentTarget.getAttribute('data-indice'));
            editarNomeJogador(indice);
        });
        
        containerBadges.appendChild(badge);
    }
}

// Função para editar o nome do jogador
function editarNomeJogador(indice) {
    const nomeAtual = nomesJogadores[indice];
    const novoNome = prompt(`Digite o nome do jogador ${indice+1}:`, nomeAtual);
    
    if (novoNome !== null && novoNome.trim() !== '') {
        const nomeMaiusculo = novoNome.trim().toUpperCase();
        nomesJogadores[indice] = nomeMaiusculo;
        atualizarBadgesJogadores();
    }
}

// Função para atualizar quantidade + badges
function atualizarQuantidade(novaQtde) {
    if (novaQtde < 1) return;
    
    quantidadeAtual = novaQtde;
    
    const quantidadeSpan = document.getElementById('quantidadeJogadores');
    if (quantidadeSpan) {
        quantidadeSpan.textContent = quantidadeAtual;
    }
    
    if (nomesJogadores.length > quantidadeAtual) {
        nomesJogadores = nomesJogadores.slice(0, quantidadeAtual);
    } else {
        for (let i = nomesJogadores.length; i < quantidadeAtual; i++) {
            nomesJogadores[i] = `JOGADOR ${i+1}`;
        }
    }
    
    atualizarBadgesJogadores();
}

// Função para configurar eventos
function configurarEventos() {
    const btnMenos = document.getElementById('btnMenos');
    const btnMais = document.getElementById('btnMais');
    const quantidadeSpan = document.getElementById('quantidadeJogadores');
    const pixCircle = document.getElementById('pixCircle');
    const badgeData = document.getElementById('badgeData');
    const badgeHorario = document.getElementById('badgeHorario');
    const badgeLocal = document.getElementById('badgeLocal');
    
    if (btnMenos) {
        btnMenos.addEventListener('click', () => {
            atualizarQuantidade(quantidadeAtual - 1);
        });
    }
    
    if (btnMais) {
        btnMais.addEventListener('click', () => {
            atualizarQuantidade(quantidadeAtual + 1);
        });
    }
    
    if (quantidadeSpan) {
        quantidadeSpan.addEventListener('click', editarQuantidadeManual);
    }
    
    if (pixCircle) {
        pixCircle.addEventListener('click', copiarChavePix);
    }
    
    if (badgeData) {
        badgeData.addEventListener('click', abrirCalendario);
    }
    
    if (badgeHorario) {
        badgeHorario.addEventListener('click', editarHorario);
    }
    
    if (badgeLocal) {
        badgeLocal.addEventListener('click', editarLocal);
    }
}

// Função para corrigir fallback das imagens
function corrigirFallbackImagens() {
    const mascoteImg = document.querySelector('.mascote-img');
    if (mascoteImg && mascoteImg.complete && mascoteImg.naturalWidth === 0) {
        mascoteImg.style.display = 'none';
        const fallback = mascoteImg.nextElementSibling;
        if (fallback) fallback.style.display = 'flex';
    }
    
    const pixImg = document.querySelector('.pix-img');
    if (pixImg && pixImg.complete && pixImg.naturalWidth === 0) {
        const pixCircle = document.getElementById('pixCircle');
        if (pixCircle) {
            pixImg.style.display = 'none';
            pixCircle.innerHTML = '💰';
            pixCircle.style.fontSize = '1.8rem';
            pixCircle.style.display = 'flex';
            pixCircle.style.alignItems = 'center';
            pixCircle.style.justifyContent = 'center';
        }
    }
}

// Função principal que monta toda a tela
function renderizarApp() {
    try {
        app.innerHTML = '';
        app.appendChild(criarTopBar());
        app.appendChild(criarCardPrincipal());
        app.appendChild(criarContainerBadges());
        configurarEventos();
        atualizarBadgesJogadores();
        setTimeout(corrigirFallbackImagens, 100);
    } catch (error) {
        console.error('Erro ao renderizar:', error);
        app.innerHTML = '<div style="text-align:center; padding:50px; color:#5c4b3a;">⚠️ Erro ao carregar o app. Verifique o console.</div>';
    }
}

// Inicializa o app
document.addEventListener('DOMContentLoaded', renderizarApp);
