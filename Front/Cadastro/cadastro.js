        async function cadastrar() {
            const nick = document.getElementById("nick").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            const resposta = await fetch("/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nick,
                    email,
                    senha
                })
            });

            const texto = await resposta.text();
            alert(texto);
            if (resposta.ok) {
                window.location.href = "/"
            }
        }