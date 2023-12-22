document.addEventListener('DOMContentLoaded', function () {
    // Aguardar o carregamento completo do DOM antes de atribuir eventos

    // Obter a referência para o botão de registro
    var btnRegistrar = document.getElementById('btnRegistrar');

    // Verificar se o botão foi encontrado
    if (btnRegistrar) {
        // Adicionar um ouvinte de evento de clique ao botão
        btnRegistrar.addEventListener('click', function () {
            registrar();
        });
    }
});

async function registrar() {
    // Obter os valores dos campos de entrada
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Realizar validações do lado do cliente (adapte conforme necessário)
    if (!username || !password || !email || !phone) {
        document.getElementById('usernot').innerText = 'Preencha todos os campos.';
        document.getElementById('usernot').style.display = 'block';

        setTimeout(function () {
            document.getElementById('usernot').style.display = 'none';
        }, 5000);

        return;
    }

 // Validar a senha do lado do cliente
 if (!isValidUsername(username)) {
    document.getElementById('usernot').innerText = 'O usuário não pode conter espaços \n ou caracteres especiais.';
    document.getElementById('usernot').style.display = 'block';

    // Aguarde 5 segundos e, em seguida, oculte a mensagem de erro
    setTimeout(function () {
        document.getElementById('usernot').style.display = 'none';
    }, 5000);

    return;
}

    // Validar a senha do lado do cliente
    if (!isValidPassword(password)) {
        document.getElementById('usernot').innerText = 'A senha deve conter pelo menos 6 caracteres,\n uma letra maiúscula e um caractere especial.';
        document.getElementById('usernot').style.display = 'block';

        // Aguarde 5 segundos e, em seguida, oculte a mensagem de erro
        setTimeout(function () {
            document.getElementById('usernot').style.display = 'none';
        }, 5000);

        return;
    }

    // Validar o telefone para conter apenas números
    if (!isValidPhone(phone)) {
        document.getElementById('usernot').innerText = 'O número de telefone deve conter apenas números.';
        document.getElementById('usernot').style.display = 'block';
        // Aguarde 5 segundos e, em seguida, oculte a mensagem de erro
        setTimeout(function () {
            document.getElementById('usernot').style.display = 'none';
        }, 5000);

        return;
    }

    // Validar o telefone para conter apenas números
    if (!isValidEmail(email)) {
        document.getElementById('usernot').innerText = 'O e-mail esta incorreto.';
        document.getElementById('usernot').style.display = 'block';
        // Aguarde 5 segundos e, em seguida, oculte a mensagem de erro
        setTimeout(function () {
            document.getElementById('usernot').style.display = 'none';
        }, 5000);

        return;
    }

    // Chamar o servidor para registrar
    try {
        const response = await fetch("/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email, phone }),
        });

        if (response.ok) {
            // Registro bem-sucedido, redirecionar para a página concluída.
            console.log('Usuário registrado com sucesso!');
            window.location.href = 'concluido.html';
        } else {
            const data = await response.json();
            document.getElementById('usernot').style.display = 'block';

            setTimeout(function () {
                document.getElementById('usernot').style.display = 'none';
            }, 5000);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Função de validação de usuário
function isValidUsername(username) {
    // Pelo menos 4 caracteres, sem espaço, sem caractere especial
    return /^[a-zA-Z0-9]{4,}$/.test(username);
}

// Função de validação de senha
function isValidPassword(password) {
    // Pelo menos 6 caracteres, uma letra maiúscula e um caractere especial
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/.test(password);
}

// Função de validação de telefone
function isValidPhone(phone) {
    // Apenas números
    return /^\d+$/.test(phone);
}

// Função de validação de email
function isValidEmail(email) {
    // Validar o formato de e-mail
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}