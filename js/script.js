const CHAVE_CARRINHO = "shelbinhosCarrinho";


function pegarCarrinho() {

    const salvo =
        localStorage.getItem(
            CHAVE_CARRINHO
        );


    if (!salvo) {
        return [];
    }


    return JSON.parse(salvo);
}


function salvarCarrinho(carrinho) {

    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
    );


    atualizarContador();
}


function adicionarAoCarrinho(
    nome,
    preco,
    imagem
) {

    const carrinho =
        pegarCarrinho();


    const existente =
        carrinho.find(
            produto =>
                produto.nome === nome
        );


    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            imagem: imagem,

            quantidade: 1

        });

    }


    salvarCarrinho(carrinho);

    mostrarToast();
}


function atualizarContador() {

    const carrinho =
        pegarCarrinho();


    let quantidade = 0;


    carrinho.forEach(
        produto => {

            quantidade +=
                produto.quantidade;

        }
    );


    document
        .querySelectorAll(
            ".cart-count"
        )
        .forEach(
            contador => {

                contador.textContent =
                    quantidade;

            }
        );
}


function mostrarToast() {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.classList.add(
        "mostrar"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "mostrar"
            );

        },
        2000
    );
}


function renderizarCarrinho() {

    const container =
        document.getElementById(
            "cart-items"
        );


    const totalElemento =
        document.getElementById(
            "cart-total"
        );


    if (
        !container ||
        !totalElemento
    ) {
        return;
    }


    const carrinho =
        pegarCarrinho();


    if (
        carrinho.length === 0
    ) {

        container.innerHTML = `

            <div class="carrinho-vazio">

                <h2>
                    Seu carrinho está vazio.
                </h2>

                <p>
                    Acesse a loja para escolher
                    um dos uniformes.
                </p>

            </div>

        `;


        totalElemento.textContent =
            "R$ 0,00";


        return;
    }


    let html = "";

    let total = 0;


    carrinho.forEach(
        (produto, index) => {

            const subtotal =
                produto.preco *
                produto.quantidade;


            total += subtotal;


            html += `

                <div class="cart-item">

                    <div
                        class="cart-miniatura"
                        style="
                            background-image:
                            url('${produto.imagem}');
                        "
                    ></div>


                    <div>

                        <h3>
                            ${produto.nome}
                        </h3>

                        <p>
                            R$
                            ${produto.preco
                                .toFixed(2)
                                .replace(".", ",")}
                        </p>

                    </div>


                    <div class="cart-acoes">

                        <button
                            onclick="
                                alterarQuantidade(
                                    ${index},
                                    -1
                                )
                            "
                        >
                            -
                        </button>


                        <span>
                            ${produto.quantidade}
                        </span>


                        <button
                            onclick="
                                alterarQuantidade(
                                    ${index},
                                    1
                                )
                            "
                        >
                            +
                        </button>


                        <button
                            class="remover"
                            onclick="
                                removerProduto(
                                    ${index}
                                )
                            "
                        >
                            X
                        </button>

                    </div>

                </div>

            `;

        }
    );


    container.innerHTML =
        html;


    totalElemento.textContent =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");
}


function alterarQuantidade(
    index,
    quantidade
) {

    const carrinho =
        pegarCarrinho();


    carrinho[index].quantidade +=
        quantidade;


    if (
        carrinho[index].quantidade <= 0
    ) {

        carrinho.splice(
            index,
            1
        );

    }


    salvarCarrinho(
        carrinho
    );


    renderizarCarrinho();
}


function removerProduto(index) {

    const carrinho =
        pegarCarrinho();


    carrinho.splice(
        index,
        1
    );


    salvarCarrinho(
        carrinho
    );


    renderizarCarrinho();
}


function finalizarCompra() {

    const carrinho =
        pegarCarrinho();


    if (
        carrinho.length === 0
    ) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    alert(
        "Checkout fictício do Shelbinhos FC!\n\n" +
        "Mais pra frente vamos colocar PIX ou cartão aqui."
    );
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        atualizarContador();

        renderizarCarrinho();

    }
)