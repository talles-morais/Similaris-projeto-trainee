// ATENÇÃO: Se for commitar este arquivo, APAGUE ou TROQUE o valor de API_KEY para 'INSIRA-A-API-AQUI'!
// Exemplo seguro:
// const API_KEY = 'INSIRA-A-API-AQUI';
const PROXY_URL = 'https://corsproxy.io/?';
const API_KEY = '1062637-Similarr-FB7B0863';


async function buscarRecomendacoes(busca) {
    try {
        const tipo = "movie"
        const query = `${tipo}:${busca}`;
        const url = `${PROXY_URL}${encodeURIComponent(`https://tastedive.com/api/similar?q=${encodeURIComponent(query)}&type=${tipo}&k=${API_KEY}&info=1`)}`;
        
        console.log('URL completa:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Resposta da API:', data);
        console.log('Primeiro resultado completo:', data.Similar?.Results?.[0] || data.similar?.results?.[0]);
        return data.Similar?.Results || data.similar?.results || [];
        
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

let resultadosGlobais = [];
let indiceAtual = 0;
let CARDS_VISIVEIS = getCardsVisiveis();

function getCardsVisiveis() {
    // 1024px é o breakpoint padrão do Tailwind para 'lg'
    return window.matchMedia('(min-width: 1024px)').matches ? 3 : 1;
}

window.addEventListener('resize', () => {
    const novoValor = getCardsVisiveis();
    if (novoValor !== CARDS_VISIVEIS) {
        CARDS_VISIVEIS = novoValor;
        indiceAtual = 0;
        renderizarCarrossel();
    }
});

function renderizarCarrossel() {
    const container = document.getElementById('container-cards');
    if (!resultadosGlobais || resultadosGlobais.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-lg">Nenhuma recomendação encontrada!</p>';
        document.getElementById('btnAnterior').disabled = true;
        document.getElementById('btnProximo').disabled = true;
        return;
    }
    const visiveis = resultadosGlobais.slice(indiceAtual, indiceAtual + CARDS_VISIVEIS);
    container.innerHTML = visiveis.map(r => `
        <div class="p-2 border border-gray-300 rounded-lg w-full min-w-[200px] text-center box-border flex flex-col items-center bg-white shadow">
            <h3 class="font-semibold text-lg mb-2">${r.Name || r.name}</h3>
            ${r.yID ? `<iframe class="w-full aspect-video mb-2" src="https://www.youtube.com/embed/${r.yID}" allowfullscreen></iframe>` : ''}
            <p class="descricao mb-1">${r.description || 'Sem descrição disponível'}</p>
            <p class="tipo text-sm text-gray-500">${r.Type || r.type || ''}</p>
        </div>
    `).join('');
    // Atualiza botões
    document.getElementById('btnAnterior').disabled = indiceAtual === 0;
    document.getElementById('btnProximo').disabled = (indiceAtual + CARDS_VISIVEIS) >= resultadosGlobais.length;
}

document.getElementById('btnBuscar').addEventListener('click', async () => {
    const busca = document.getElementById('inputBusca').value;
    const tipo = document.getElementById('selectTipo').value;
    resultadosGlobais = await buscarRecomendacoes(busca, tipo);
    indiceAtual = 0;
    renderizarCarrossel();
});

document.getElementById('btnAnterior').addEventListener('click', () => {
    if (indiceAtual > 0) {
        indiceAtual -= 1;
        if (indiceAtual < 0) indiceAtual = 0;
        renderizarCarrossel();
    }
});

document.getElementById('btnProximo').addEventListener('click', () => {
    if (resultadosGlobais && (indiceAtual + CARDS_VISIVEIS) < resultadosGlobais.length) {
        indiceAtual += 1;
        renderizarCarrossel();
    }
});