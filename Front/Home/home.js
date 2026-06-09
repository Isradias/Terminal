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
}async function gerar QR () {
    const res = await fetch ('http://localhost:3000/2fa/setup');
    const data= await res.json();
    document.getElementbyID('qr').src = data.qrcode;

}
async function verificar() {
    const token =
    document.getElementById ('codigo').value;
    const res = await fetch (
        'http://localhost3000/2fa/verify',
{
    method : 'POST',
    handers:{
        'content-type': 'application/json'
    },
    body : json.stringify({token})
}
    );
    const msg = await res.text();
    alert(msg);
}
