async function cadastrar() {
	const nick = document.getElementById("nick").value;
	const email = document.getElementById("email").value;
	const senha = document.getElementById("senha").value;

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
	alert(texto);
	if (response.ok) {
		window.location.href = "/";
	}
}
