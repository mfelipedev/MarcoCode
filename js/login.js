async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            body: new URLSearchParams({ username, password }),
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            console.error('Erro ao fazer login:', response.statusText);
            document.getElementById('usernot').style.display = 'block';
            setTimeout(function () {
                document.getElementById('usernot').style.display = 'none';
            }, 5000);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}
