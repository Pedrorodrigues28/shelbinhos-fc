// ======================================
// CADASTRO
// ======================================

const formCadastro =
    document.getElementById(
        "form-cadastro"
    );


if (formCadastro) {

    formCadastro.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const nome =
                document
                    .getElementById("nome")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const senha =
                document
                    .getElementById("senha")
                    .value;


            const confirmarSenha =
                document
                    .getElementById(
                        "confirmar-senha"
                    )
                    .value;


            const mensagem =
                document.getElementById(
                    "mensagem-auth"
                );


            if (
                senha !== confirmarSenha
            ) {

                mensagem.textContent =
                    "As senhas não são iguais.";

                return;

            }


            mensagem.textContent =
                "Criando sua conta...";


            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signUp({

                        email: email,

                        password: senha,

                        options: {

                            data: {
                                nome: nome
                            }

                        }

                    });


            if (error) {

                mensagem.textContent =
                    "Erro: " +
                    error.message;

                return;

            }


            if (data.session) {

                mensagem.textContent =
                    "Conta criada com sucesso! Entrando...";


                formCadastro.reset();


                setTimeout(
                    function () {

                        window.location.href =
                            "perfil.html";

                    },
                    700
                );

            } else {

                mensagem.textContent =
                    "Conta criada com sucesso!";


                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1000
                );

            }

        }
    );

}


// ======================================
// LOGIN
// ======================================

const formLogin =
    document.getElementById(
        "form-login"
    );


if (formLogin) {

    formLogin.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "login-email"
                    )
                    .value
                    .trim();


            const senha =
                document
                    .getElementById(
                        "login-senha"
                    )
                    .value;


            const mensagem =
                document.getElementById(
                    "mensagem-auth"
                );


            mensagem.textContent =
                "Entrando...";


            const {
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email: email,

                        password: senha

                    });


            if (error) {

                mensagem.textContent =
                    "Erro: " +
                    error.message;

                return;

            }


            mensagem.textContent =
                "Login realizado!";


            setTimeout(
                function () {

                    window.location.href =
                        "perfil.html";

                },
                600
            );

        }
    );

}


// ======================================
// PERFIL
// ======================================

async function carregarPerfil() {

    const tituloNome =
        document.getElementById(
            "perfil-nome"
        );


    if (!tituloNome) {
        return;
    }


    const {
        data: { user },
        error: userError
    } =
        await supabaseClient.auth
            .getUser();


    if (
        userError ||
        !user
    ) {

        window.location.href =
            "login.html";

        return;

    }


    const {
        data: perfil,
        error
    } =
        await supabaseClient
            .from("perfis")
            .select(
                "nome, username, jogador_favorito, created_at"
            )
            .eq(
                "id",
                user.id
            )
            .single();


    if (error) {

        console.error(
            "Erro ao carregar perfil:",
            error
        );

    }


    const nome =
        perfil?.nome ||
        user.user_metadata?.nome ||
        "Torcedor";


    tituloNome.textContent =
        "Olá, " +
        nome +
        " 👋";


    const emailElemento =
        document.getElementById(
            "perfil-email"
        );


    if (emailElemento) {

        emailElemento.textContent =
            user.email;

    }


    const dataElemento =
        document.getElementById(
            "perfil-data"
        );


    if (dataElemento) {

        const dataCadastro =
            new Date(
                perfil?.created_at ||
                user.created_at
            );


        dataElemento.textContent =
            dataCadastro
                .toLocaleDateString(
                    "pt-BR"
                );

    }


    const nomeInput =
        document.getElementById(
            "perfil-nome-input"
        );


    if (nomeInput) {

        nomeInput.value =
            nome;

    }


    const usernameInput =
        document.getElementById(
            "perfil-username"
        );


    if (usernameInput) {

        usernameInput.value =
            perfil?.username || "";

    }


    const favoritoInput =
        document.getElementById(
            "perfil-favorito"
        );


    if (favoritoInput) {

        favoritoInput.value =
            perfil?.jogador_favorito || "";


        atualizarJogadorFavoritoVisual(
            perfil?.jogador_favorito || ""
        );

    }

}
// ======================================
// FOTO DO JOGADOR FAVORITO
// ======================================

function atualizarJogadorFavoritoVisual(nome) {

    const foto =
        document.getElementById(
            "perfil-favorito-foto"
        );


    const nomeElemento =
        document.getElementById(
            "perfil-favorito-nome"
        );


    if (!foto || !nomeElemento) {
        return;
    }


    const jogadores = {

        Rodrigues:
            "imagens/jogadores/rodrigues.png",

        Gambeta:
            "imagens/jogadores/gambeta.png",

        Exu:
            "imagens/jogadores/exu.png",

        Bezerra:
            "imagens/jogadores/bezerra.png",

        Collin:
            "imagens/jogadores/collin.png"

    };


    if (
        nome &&
        jogadores[nome]
    ) {

        foto.src =
            jogadores[nome];

        foto.alt =
            nome;

        nomeElemento.textContent =
            nome;

    } else {

        foto.src =
            "imagens/escudo/escudo.png";

        foto.alt =
            "Escudo do Shelbinhos FC";

        nomeElemento.textContent =
            "Nenhum selecionado";

    }

}const selectFavorito =
    document.getElementById(
        "perfil-favorito"
    );


if (selectFavorito) {

    selectFavorito.addEventListener(
        "change",
        function () {

            atualizarJogadorFavoritoVisual(
                selectFavorito.value
            );

        }
    );

}

// ======================================
// SALVAR PERFIL
// ======================================

const botaoSalvarPerfil =
    document.getElementById(
        "btn-salvar-perfil"
    );


if (botaoSalvarPerfil) {

    botaoSalvarPerfil.addEventListener(
        "click",
        async function () {

            const mensagem =
                document.getElementById(
                    "mensagem-perfil"
                );


            mensagem.textContent =
                "Salvando...";


            const {
                data: { user },
                error: userError
            } =
                await supabaseClient.auth
                    .getUser();


            if (
                userError ||
                !user
            ) {

                window.location.href =
                    "login.html";

                return;

            }


            const nome =
                document
                    .getElementById(
                        "perfil-nome-input"
                    )
                    .value
                    .trim();


            const username =
                document
                    .getElementById(
                        "perfil-username"
                    )
                    .value
                    .trim();


            const jogadorFavorito =
                document
                    .getElementById(
                        "perfil-favorito"
                    )
                    .value
                    .trim();


            const { error } =
                await supabaseClient
                    .from("perfis")
                    .update({

                        nome:
                            nome ||
                            "Torcedor",

                        username:
                            username ||
                            null,

                        jogador_favorito:
                            jogadorFavorito ||
                            null

                    })
                    .eq(
                        "id",
                        user.id
                    );


            if (error) {

                mensagem.textContent =
                    "Erro: " +
                    error.message;

                return;

            }


            mensagem.textContent =
                "Perfil atualizado com sucesso!";


            document
                .getElementById(
                    "perfil-nome"
                )
                .textContent =
                    "Olá, " +
                    (
                        nome ||
                        "Torcedor"
                    ) +
                    " 👋";

        }
    );

}


// ======================================
// LOGOUT
// ======================================

const botaoLogout =
    document.getElementById(
        "btn-logout"
    );


if (botaoLogout) {

    botaoLogout.addEventListener(
        "click",
        async function () {

            const { error } =
                await supabaseClient.auth
                    .signOut();


            if (error) {

                alert(
                    "Erro ao sair: " +
                    error.message
                );

                return;

            }


            window.location.href =
                "login.html";

        }
    );

}


// ======================================
// MENU INTELIGENTE
// ======================================

function renderizarMenuAuth(
    session
) {

    const links =
        document.querySelectorAll(
            ".auth-menu-link"
        );


    links.forEach(
        function (link) {

            if (session) {

                link.textContent =
                    "Minha conta";

                link.href =
                    "perfil.html";

            } else {

                link.textContent =
                    "Entrar";

                link.href =
                    "login.html";

            }

        }
    );

}


async function atualizarMenuAuth() {

    const {
        data: { session }
    } =
        await supabaseClient.auth
            .getSession();


    renderizarMenuAuth(
        session
    );

}


supabaseClient.auth
    .onAuthStateChange(

        function (
            evento,
            session
        ) {

            renderizarMenuAuth(
                session
            );

        }

    );


// ======================================
// REDIRECIONAR LOGIN/CADASTRO
// SE JÁ ESTIVER LOGADO
// ======================================

async function verificarPaginaAuth() {

    const estaNoLogin =
        document.getElementById(
            "form-login"
        );


    const estaNoCadastro =
        document.getElementById(
            "form-cadastro"
        );


    if (
        !estaNoLogin &&
        !estaNoCadastro
    ) {
        return;
    }


    const {
        data: { session }
    } =
        await supabaseClient.auth
            .getSession();


    if (session) {

        window.location.href =
            "perfil.html";

    }

}


// ======================================
// INICIALIZAÇÃO
// ======================================

carregarPerfil();

atualizarMenuAuth();

verificarPaginaAuth();