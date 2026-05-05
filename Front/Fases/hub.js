import missoes from "./lista_missoes.js";

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

window.logout = async function logout() {
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

function criar_missoes(nivel) {
	const template = document.getElementById("missao_template");
	const mapa = document.getElementById("id_mapa");

	const entradas_encontradas = document.getElementById(
		"entradas_encontradas",
	);
	entradas_encontradas.textContent = `${missoes.length} ENTRADAS ENCONTRADAS`;

	let clone;

	for (let i = 0; i < missoes.length; i++) {
		clone = template.content.cloneNode(true);
		clone.querySelector(".fase").innerHTML =
			`Fase ${i + 1} <span>${missoes[i].dificuldade}</span>`;
		clone.querySelector(".titulo_missao").textContent = missoes[i].titulo;
		clone.querySelector(".subtitulo").textContent = missoes[i].subtitulo;
		if (i < nivel) {
			clone.querySelector(".status").innerHTML = `
			<span class="material-symbols-outlined" style="color: #36e270;">
			check_circle
			</span>
			`;
		} else if (i === nivel) {
			clone.querySelector(".status").innerHTML = `
			<span class="material-symbols-outlined" style="color: #3899FA">
			arrow_forward_ios
			</span>
			`;
		} else {
			clone.querySelector(".btn_missao").style.backgroundColor = "#0F1114";
			clone.querySelector(".btn_missao").style.color = "#7A7A7B";
			clone.querySelector(".status").innerHTML = `
			<span class="material-symbols-outlined">
			lock
			</span>
			`;
		}
		mapa.appendChild(clone);
	}
}

window.subir_nivel = async function subir_nivel() {
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
};

async function main() {
	const user = await get_user();
	const nick = user.nick;
	const nivel = user.nivel;
	carregar_nivel(nivel);
	carregar_nick(nick);
	criar_missoes(Number(nivel));
}

main();
