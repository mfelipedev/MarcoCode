//console.log("Script usuario.js carregado.");

document.addEventListener("DOMContentLoaded", function () {
    //console.log("DOM carregado!");

    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    //console.log("Nome de usuário da URL:", username);

    const usernameElement = document.getElementById("username");
    if (usernameElement) {

        usernameElement.textContent = username;
        //console.log("Elemento 'username' encontrado e atualizado com sucesso.");
    } else {
        //console.log("Elemento 'username' não encontrado!");
    }

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
        //console.log("Elemento 'logoutButton' encontrado e listener adicionado com sucesso.");
    } else {
        //console.log("Elemento 'logoutButton' não encontrado!");
    }
});
