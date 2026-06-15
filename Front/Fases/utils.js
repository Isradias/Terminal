function carregar_nivel(nivel) {
	const nivel_titulo = document.getElementById("nivel");
	nivel_titulo.textContent = `NIVEL: ${nivel}`;
}

async function get_user() {
	try {
		const result = await fetch("/get_user");
		const user = await result.json();
		if (!result.ok) {
			console.log("Erro ao buscar usuario");
			return;
		} else {
			return user;
		}
	} catch (err) {
		console.log(err);
	}
}

function carregar_nick(nick) {
	const nick_titulo = document.getElementById("nick");
	nick_titulo.textContent = nick;
}

async function logout() {
	try {
		const response = await fetch("/logout", { method: "POST" });
		if (!response.ok) {
			console.log("Erro no logout");
			return;
		}
		alert("Você saiu da sua conta");
		window.location.href = "/";
	} catch (error) {
		console.log(error);
	}
}

export async function set_header() {
	const user = await get_user();
	const nick = user.nick;
	const nivel = user.nivel;
	carregar_nivel(nivel);
	carregar_nick(nick);
	document.querySelector(".logo").addEventListener("click", () => {
		window.location.href = "/";
	});
	document.querySelector(".logout").addEventListener("click", logout);
	return nivel;
}

export async function subir_nivel(nivel) {
	const user = await get_user();
	if (nivel <= user.nivel) {
		return
	}
	try {
		const response = await fetch("/subir_nivel", {
			method: "PUT",
		});

		if (!response.ok) {
			console.log("Erro ao subir nível");
			return;
		}

		const data = await response.json();
		carregar_nivel(data.nivel);
	} catch (err) {
		console.log(err);
	}
}
