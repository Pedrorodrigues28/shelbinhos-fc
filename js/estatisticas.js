const jogadores = {
    rodrigues: {
        nome: "RODRIGUES",
        id: "@rdxinn",
        posicao: "ATA",
        jogos: 211,
        gols: 217,
        assistencias: 97,
        mvp: 75
    },

    gambeta: {
        nome: "GAMBETA",
        id: "@CezarNS",
        posicao: "ATA",
        jogos: 186,
        gols: 98,
        assistencias: 128,
        mvp: 15
    },

    collin: {
        nome: "COLLIN",
        id: "@FHCGColin93",
        posicao: "ATA",
        jogos: 102,
        gols: 67,
        assistencias: 52,
        mvp: 11
    },

    bezerra: {
        nome: "BEZERRA",
        id: "@Shamps011",
        posicao: "MC",
        jogos: 65,
        gols: 23,
        assistencias: 23,
        mvp: 8
    },

    exu: {
        nome: "EXU",
        id: "@yungxpax",
        posicao: "ATA",
        jogos: 18,
        gols: 1,
        assistencias: 4,
        mvp: 0
    }
};


const cards = document.querySelectorAll(".jogador-card");

const nome = document.getElementById("painel-nome");
const id = document.getElementById("painel-id");
const posicao = document.getElementById("painel-posicao");

const jogos = document.getElementById("stat-jogos");
const gols = document.getElementById("stat-gols");
const assistencias = document.getElementById("stat-assistencias");
const mvp = document.getElementById("stat-mvp");
const participacoes = document.getElementById("stat-participacoes");


cards.forEach(card => {

    card.addEventListener("click", () => {

        const jogadorSelecionado = card.dataset.jogador;

        const jogador = jogadores[jogadorSelecionado];


        // Remove seleção anterior
        cards.forEach(c => {
            c.classList.remove("ativo");
        });


        // Marca o jogador clicado
        card.classList.add("ativo");


        // Troca informações
        nome.textContent = jogador.nome;
        id.textContent = jogador.id;
        posicao.textContent = jogador.posicao;

        jogos.textContent = jogador.jogos;
        gols.textContent = jogador.gols;
        assistencias.textContent = jogador.assistencias;
        mvp.textContent = jogador.mvp;

        participacoes.textContent =
            jogador.gols + jogador.assistencias;

    });

});// ======================================
// RANKING DO ELENCO
// ======================================

const botoesRanking =
    document.querySelectorAll(".ranking-btn");

const rankingLista =
    document.getElementById("ranking-lista");


function criarRanking(categoria) {

    const ranking = Object.values(jogadores)
        .map(jogador => {

            let valor;

            if (categoria === "participacoes") {
                valor =
                    jogador.gols +
                    jogador.assistencias;
            } else {
                valor = jogador[categoria];
            }

            return {
                ...jogador,
                valor: valor
            };

        })
        .sort((a, b) => b.valor - a.valor);


    const maiorValor = ranking[0].valor;


    rankingLista.innerHTML = "";


    ranking.forEach((jogador, index) => {

        const porcentagem =
            maiorValor === 0
                ? 0
                : (jogador.valor / maiorValor) * 100;


        const item =
            document.createElement("div");

        item.classList.add("ranking-item");


        item.innerHTML = `

            <div class="ranking-posicao">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="ranking-nome">
                ${jogador.nome}
            </div>

            <div class="ranking-barra-area">

                <div
                    class="ranking-barra"
                    style="width: ${porcentagem}%">
                </div>

            </div>

            <div class="ranking-valor">
                ${jogador.valor}
            </div>

        `;


        rankingLista.appendChild(item);

    });

}


botoesRanking.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesRanking.forEach(btn => {
            btn.classList.remove("ativo");
        });


        botao.classList.add("ativo");


        criarRanking(
            botao.dataset.ranking
        );

    });

});


// Ranking inicial
criarRanking("gols");