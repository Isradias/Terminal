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
async function gerarQR () {
    try {
        const res = await fetch('http://localhost:3000/2fa/setup');
        if (!res.ok) throw new Error('Falha ao gerar QR');
        const data = await res.json();
        document.getElementById('qr').src = data.qrcode;
    } catch (err) {
        console.error(err);
    }

}
async function verificar() {
    const token =
    document.getElementById ('codigo').value;
    try {
        const res = await fetch('http://localhost:3000/2fa/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });
        const msg = await res.text();
        alert(msg);
    } catch (err) {
        console.error(err);
        alert('Erro ao verificar código');
    }
}
window.onload = async () => {
  const email = localStorage.getItem("email");

  const res = await fetch("/auth/status-2fa?email=" + email);
  const data = await res.json();

  const toggle = document.getElementById("toggle2fa");

  if (data.twofa_ativo) {
    toggle.checked = true;
    document.getElementById("status2fa").innerText = "Ativado";
  }
};

async function toggle2FA() {
    const toggle = document.getElementById('toggle2fa');
    const statusEl = document.getElementById('status2fa');
    const enable = toggle.checked;
    const email = localStorage.getItem('email');

    // Atualiza imediatamente a interface
    statusEl.innerText = enable ? 'Ativado' : 'Desativado';

    try {
        await fetch('http://localhost:3000/2fa/set', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, enable })
        });
    } catch (err) {
        console.error(err);
        // Reverter toggle em caso de erro
        toggle.checked = !enable;
        statusEl.innerText = !enable ? 'Ativado' : 'Desativado';
        alert('Não foi possível atualizar 2FA');
    }
}
