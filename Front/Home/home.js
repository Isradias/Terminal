async function validate_login() {
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    const response = await fetch("/validate_login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            senha
        })
    })

    const mensagem_erro = document.getElementById("erro");

    if (response.ok) {
        window.location.href = "/fases";
    } else {
        const texto = await response.text();
        mensagem_erro.innerText = texto;
    }
}