const cardsData = [
    {
        titulo: "Harry Potter e a Câmara Secreta",
        categoria: "LIVRO",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, aliquam. Molestias temporibus nam error ex quia tempora blanditiis esse quisquam quibusdam modi labore cum nostrum distinctio alias, illo culpa corrupti!Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae ducimus commodi eveniet nam quod similique placeat asperiores in atque veniam odit recusandae cumque suscipit, sapiente quo, aspernatur aliquid quos.",
        imagem: ""
    },
    {
        titulo: "O Senhor dos Anéis",
        categoria: "LIVRO",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, aliquam. Molestias temporibus nam error ex quia tempora blanditiis esse quisquam quibusdam modi labore cum nostrum distinctio alias, illo culpa corrupti!Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae ducimus commodi eveniet nam quod similique placeat asperiores in atque veniam odit recusandae cumque suscipit, sapiente quo, aspernatur aliquid quos.",
        imagem: ""
    },
    {
        titulo: "Vingadores: Ultimato",
        categoria: "FILME",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, aliquam. Molestias temporibus nam error ex quia tempora blanditiis esse quisquam quibusdam modi labore cum nostrum distinctio alias, illo culpa corrupti!Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae ducimus commodi eveniet nam quod similique placeat asperiores in atque veniam odit recusandae cumque suscipit, sapiente quo, aspernatur aliquid quos..",
        imagem: ""
    },
    {
        titulo: "Castelo de Hogwarts",
        categoria: "LUGAR",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, aliquam. Molestias temporibus nam error ex quia tempora blanditiis esse quisquam quibusdam modi labore cum nostrum distinctio alias, illo culpa corrupti!Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae ducimus commodi eveniet nam quod similique placeat asperiores in atque veniam odit recusandae cumque suscipit, sapiente quo, aspernatur aliquid quos.",
        imagem: ""
    },
    {
        titulo: "Matrix Reloaded",
        categoria: "FILME",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, aliquam. Molestias temporibus nam error ex quia tempora blanditiis esse quisquam quibusdam modi labore cum nostrum distinctio alias, illo culpa corrupti!Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae ducimus commodi eveniet nam quod similique placeat asperiores in atque veniam odit recusandae cumque suscipit, sapiente quo, aspernatur aliquid quos..",
        imagem: ""
    },
    {
        titulo: "As Crônicas de Nárnia",
        categoria: "LIVRO",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, aliquam. Molestias temporibus nam error ex quia tempora blanditiis esse quisquam quibusdam modi labore cum nostrum distinctio alias, illo culpa corrupti!Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quae ducimus commodi eveniet nam quod similique placeat asperiores in atque veniam odit recusandae cumque suscipit, sapiente quo, aspernatur aliquid quos.",
        imagem: ""
    }
];

const container = document.getElementById("resultado");

if (container) {
    container.innerHTML = ""; 

    cardsData.forEach(card => {
        
        const htmlDoCard = `
          <div class="group flex flex-col bg-[#1E1E1E] w-full rounded-2xl overflow-hidden border border-gray-800 hover:border-[#F7215A] hover:-translate-y-2 transition-all duration-300 shadow-lg">
              
              <div class="h-64 w-full relative overflow-hidden">
                  <img src="${card.imagem}" alt="${card.titulo}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                  
                    <div class="absolute top-3 right-3 bg-[#F7215A] text-white text-[10px] font-bold px-3 py-1  rounded-full font-secundary tracking-widest shadow-md">
                      ${card.categoria || 'GERAL'}
                  </div>
              </div>
              
              <div class="p-6 flex flex-col gap-3">
                  <h3 class="text-xl font-bold text-white font-main tracking-wider uppercase truncate">
                      ${card.titulo}
                  </h3>
                  
                  <p class="text-gray-400 text-sm leading-relaxed font-secundary line-clamp-3">
                      ${card.descricao}
                  </p>
                  
                  <div class="mt-2 text-[#F7215A] text-xs font-bold uppercase tracking-widest group-hover:underline cursor-pointer font-secundary">
                      Ver detalhes ->
                </div>
                 </div>
                     </div>
                    `;
        container.innerHTML += htmlDoCard;
             });
}