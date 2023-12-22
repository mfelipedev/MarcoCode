document.addEventListener('DOMContentLoaded', function () {

    var btnRegistrar = document.getElementById('btnRegistrar');

    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', function () {
            registrar();
        });
    }
});

async function registrar() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    if (!username || !password || !email || !phone) {
        document.getElementById('usernot').innerText = 'Preencha todos os campos.';
        document.getElementById('usernot').style.display = 'block';

        setTimeout(function () {
            document.getElementById('usernot').style.display = 'none';
        }, 5000);

        return;
    }

 if (!isValidUsername(username)) {
    document.getElementById('usernot').innerText = 'O usuário não pode conter espaços \n ou caracteres especiais.';
    document.getElementById('usernot').style.display = 'block';
    setTimeout(function () {
        document.getElementById('usernot').style.display = 'none';
    }, 5000);

    return;
}

    if (!isValidPassword(password)) {
        document.getElementById('usernot').innerText = 'A senha deve conter pelo menos 6 caracteres,\n uma letra maiúscula e um caractere especial.';
        document.getElementById('usernot').style.display = 'block';
        setTimeout(function () {
            document.getElementById('usernot').style.display = 'none';
        }, 5000);

        return;
    }

    if (!isValidPhone(phone)) {
        document.getElementById('usernot').innerText = 'O número de telefone deve conter apenas números.';
        document.getElementById('usernot').style.display = 'block';
        setTimeout(function () {
            document.getElementById('usernot').style.display = 'none';
        }, 5000);

        return;
    }

    if (!isValidEmail(email)) {
        document.getElementById('usernot').innerText = 'O e-mail esta incorreto.';
        document.getElementById('usernot').style.display = 'block';
        setTimeout(function () {
            document.getElementById('usernot').style.display = 'none';
        }, 5000);

        return;
    }

    try {
        const response = await fetch("/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email, phone }),
        });

        if (response.ok) {
            //console.log('Usuário registrado com sucesso!');
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


function isValidUsername(username) {
    return /^[a-zA-Z0-9]{4,}$/.test(username);
}


function isValidPassword(password) {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/.test(password);
}

function isValidPhone(phone) {
    return /^\d+$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}