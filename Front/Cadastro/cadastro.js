async function cadastrar() {
    // Captura dos elementos do DOM
    const nick = document.getElementById("nick").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar_senha").value;
    const termos = document.getElementById("termos").checked;

    // --- REGRAS DE VALIDAÇÃO ---

    // 1. Verifica se todos os campos estão preenchidos
    if (!nick || !email || !senha || !confirmarSenha) {
        return alert("ACCESS_DENIED: Preencha todos os campos do terminal.");
    }

    // 2. Validação do Checkbox de Termos
    if (!termos) {
        return alert("ERRO: Você precisa aceitar os termos de segurança para prosseguir.");
    }

    // 3. Verificação de Confirmação de Senha
    if (senha !== confirmarSenha) {
        return alert("ERRO: As senhas digitadas não coincidem.");
    }

    // 4. Validação do Nick (mínimo 3 caracteres)
    if (nick.length < 3) {
        return alert("ERRO: O Nick deve ter pelo menos 3 caracteres.");
    }

    // 5. Validação de E-mail (formato padrão)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return alert("ERRO: Protocolo de e-mail inválido.");
    }

    // 6. Validação de Senha (mínimo 8 caracteres, letra e número)
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!senhaRegex.test(senha)) {
        return alert("ERRO: A senha deve conter no mínimo 8 caracteres, incluindo letras e números.");
    }

    // --- ENVIO DOS DADOS AO TERMINAL CENTRAL ---
    try {
        const response = await fetch("/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nick,
                email,
                senha,
            }),
        });

        const texto = await response.text();

        if (response.ok) {
            alert("CONTA_CRIADA: Acesso autorizado. Redirecionando...");
            window.location.href = "/";
        } else {
            // Exibe erro do servidor (ex: "Email já cadastrado")
            alert("ERRO_SERVIDOR: " + texto);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("CRITICAL_ERROR: Falha na conexão com o servidor.");
    }
}
