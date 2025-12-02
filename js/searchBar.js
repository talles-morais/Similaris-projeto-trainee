// ATENÇÃO: Se for commitar este arquivo, APAGUE ou TROQUE o valor de API_KEY para 'INSIRA-A-API-AQUI'!
const PROXY_URL = 'https://corsproxy.io/?';
// Mantive a chave que estava no seu código (cuidado ao expor isso publicamente)
const API_KEY = '1062637-Similarr-FB7B0863';

async function buscarRecomendacoes(busca) {
    try {
        const tipo = document.getElementById('selectTipo') ? document.getElementById('selectTipo').value : "movie";
        const query = `${tipo}:${busca}`;
        
        // Ajustei para pegar o tipo dinâmico se existir o select, senão usa 'movie'
        const url = `${PROXY_URL}${encodeURIComponent(`https://tastedive.com/api/similar?q=${encodeURIComponent(query)}&type=${tipo}&k=${API_KEY}&info=1`)}`;
        
        console.log('URL completa:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        return data.Similar?.Results || data.similar?.results || [];
        
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

// LÓGICA DO CARROSSEL THALES
let resultadosGlobais = [];
let indiceAtual = 0;
let CARDS_VISIVEIS = getCardsVisiveis();

function getCardsVisiveis() {
    
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
        container.innerHTML = '<p class="col-span-full text-center text-xl text-white font-secundary">Nenhuma recomendação encontrada!</p>';
        const btnAnt = document.getElementById('btnAnterior');
        const btnProx = document.getElementById('btnProximo');
        if(btnAnt) btnAnt.disabled = true;
        if(btnProx) btnProx.disabled = true;
        return;
    }
    

    const visiveis = resultadosGlobais.slice(indiceAtual, indiceAtual + CARDS_VISIVEIS);
    
    //  ESTILIZAÇÃO
    
    container.innerHTML = visiveis.map(r => `
        <div class="group flex flex-col bg-[#1E1E1E] w-full rounded-2xl overflow-hidden border border-gray-800 hover:border-[#F7215A] hover:-translate-y-2 transition-all duration-300 shadow-lg min-h-[400px]">
            
            <div class="h-52 w-full relative bg-black">
                 ${r.yID ? 
                    `<iframe class="w-full h-full object-cover" src="https://www.youtube.com/embed/${r.yID}" frameborder="0" allowfullscreen></iframe>` 
                    : 
                    `<div class="w-full h-full flex items-center justify-center text-gray-500 font-secundary">Sem Vídeo</div>`
                }
            </div>
            
            <div class="p-6 flex flex-col gap-3 h-full justify-between">
                <div>
                    <h3 class="text-xl font-bold text-white font-main tracking-wider uppercase truncate">
                        ${r.Name || r.name}
                    </h3>
                    
                    <p class="text-gray-400 text-sm leading-relaxed font-secundary line-clamp-3 mt-2">
                        ${r.description || 'Sem descrição disponível.'}
                    </p>
                </div>
                
                 <div class="self-end bg-[#F7215A] text-white text-[10px] font-bold px-3 py-1 rounded-full font-secundary tracking-widest shadow-md mt-2">
                      ${r.Type || r.type || 'GERAL'}
                  </div>
            </div>
        </div>
    `).join('');
    
    // LÓGICA THALES
    const btnAnt = document.getElementById('btnAnterior');
    const btnProx = document.getElementById('btnProximo');
    
    if(btnAnt) btnAnt.disabled = indiceAtual === 0;
    if(btnProx) btnProx.disabled = (indiceAtual + CARDS_VISIVEIS) >= resultadosGlobais.length;
}

// (Botões)
const btnBuscar = document.getElementById('btnBuscar');
if(btnBuscar) {
    btnBuscar.addEventListener('click', async () => {
        const busca = document.getElementById('inputBusca').value;
        resultadosGlobais = await buscarRecomendacoes(busca);
        indiceAtual = 0;
        renderizarCarrossel();
    });
}


const btnBuscarMobile = document.getElementById('btnBuscarMobile');
if(btnBuscarMobile) {
    btnBuscarMobile.addEventListener('click', async () => {
        const busca = document.getElementById('inputBuscaMobile').value;
        resultadosGlobais = await buscarRecomendacoes(busca);
        indiceAtual = 0;
        renderizarCarrossel();
    });
}

const btnAnterior = document.getElementById('btnAnterior');
if(btnAnterior) {
    btnAnterior.addEventListener('click', () => {
        if (indiceAtual > 0) {
            indiceAtual -= 1;
            if (indiceAtual < 0) indiceAtual = 0;
            renderizarCarrossel();
        }
    });
}

const btnProximo = document.getElementById('btnProximo');
if(btnProximo) {
    btnProximo.addEventListener('click', () => {
        if (resultadosGlobais && (indiceAtual + CARDS_VISIVEIS) < resultadosGlobais.length) {
            indiceAtual += 1;
            renderizarCarrossel();
        }
    });
}