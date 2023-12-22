//console.log("Script usuario.js carregado.");

document.addEventListener("DOMContentLoaded", function () {
    //console.log("DOM carregado!");

    // Obter o nome de usuário da URL (por exemplo, /login.html?username=NomeUsuario)
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    //console.log("Nome de usuário da URL:", username);

    // Verificar se o elemento com o ID "username" existe antes de tentar atualizá-lo
    const usernameElement = document.getElementById("username");
    if (usernameElement) {
        // Atualizar a mensagem de boas-vindas
        usernameElement.textContent = username;
        //console.log("Elemento 'username' encontrado e atualizado com sucesso.");
    } else {
        //console.log("Elemento 'username' não encontrado!");
    }

    // Verificar se o elemento com o ID "logoutButton" existe antes de adicionar o ouvinte de evento
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        // Adicionar um ouvinte de evento para o botão de sair
        logoutButton.addEventListener("click", function () {
            // Adicione aqui a lógica para realizar o logout, como redirecionar para a página de login
            window.location.href = "index.html"; // Redirecionar para index.html
        });
        //console.log("Elemento 'logoutButton' encontrado e listener adicionado com sucesso.");
    } else {
        //console.log("Elemento 'logoutButton' não encontrado!");
    }
});
