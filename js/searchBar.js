const API_KEY = '1062637-Similarr-FB7B0863';
const PROXY_URL = 'https://corsproxy.io/?';

async function buscarRecomendacoes(busca, tipo, limite) {
    try {
        const query = `${tipo}:${busca}`;
        const url = `${PROXY_URL}${encodeURIComponent(`https://tastedive.com/api/similar?q=${encodeURIComponent(query)}&type=${tipo}&k=${API_KEY}&limit=${limite}&info=1`)}`;
        
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

document.getElementById('btnBuscar').addEventListener('click', async () => {
    const busca = document.getElementById('inputBusca').value;
    const tipo = document.getElementById('selectTipo').value;
    const limite = document.getElementById('inputLimite').value || 6;
    
    // console.log('Buscando:', busca, '| Tipo:', tipo, '| Limite:', limite);
    
    const resultados = await buscarRecomendacoes(busca, tipo, limite);
    // console.log('Resultados encontrados:', resultados);
    // console.log('Quantidade:', resultados.length);
    
    const resultado = document.getElementById('resultado');
    
    if (!resultados || resultados.length === 0) {
        resultado.innerHTML = '<p>Nenhuma recomendação encontrada!</p>';
        return;
    }
    
    // HTML dos cards - altere as tags (h3, p, etc) e classes conforme achar melhor.
    resultado.innerHTML = resultados.map(r => `
        <div class="filme-card">
            <h3>${r.Name || r.name}</h3>
            ${r.yID ? `<iframe src="https://www.youtube.com/embed/${r.yID}" allowfullscreen></iframe>` : ''}
            <p class="descricao">${r.description || 'Sem descrição disponível'}</p>
            <p class="tipo">${r.Type || r.type || tipo}</p>
        </div>
    `).join('');
});