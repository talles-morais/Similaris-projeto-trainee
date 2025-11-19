
const cardsData = [
    {
        titulo: "Harry Potter e a Câmara Secreta",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        imagem: ""
    },
    {
        titulo: "O Senhor dos Anéis",
        descricao: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        imagem: ""
    },
    {
        titulo: "Castelo",
        descricao: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        imagem: ""
    },
    {
        titulo: "Castelo de Hogwarts",
        descricao: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        imagem: ""
    },
    {
        titulo: "Matrix Reloaded",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        imagem: ""
    },
    {
        titulo: "Nárnia",
        descricao: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        imagem: ""
    }
];

    const container = document.getElementById("container-cards");

// (Manipulação do DOM)
cardsData.forEach(card => {

    const htmlDoCard = `
      <div class="flex flex-col bg-white w-full rounded-xl p-4 gap-4 drop-shadow-xl hover:scale-105 transition-transform duration-300">
          <div class="h-64 rounded-lg overflow-hidden bg-gray-200 relative">
              <img src="${card.imagem}" alt="${card.titulo}" class="w-full h-full object-cover">
          </div>
          <div>
              <h3 class="text-xl font-bold text-gray-800">${card.titulo}</h3>
              <p class="text-gray-600 mt-2 text-sm leading-relaxed">
                  ${card.descricao}
              </p>
          </div>
      </div>
    `;
    container.innerHTML += htmlDoCard;
});