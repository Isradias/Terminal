import set_header from "../../utils.js";
import pastas from "./pastas.js";
import diretorio, { Pasta, Arquivo } from "./class_pastas.js";
import lista_missoes from "../../lista_missoes.js";

let diretorio_atual = diretorio;

async function subir_nivel() {
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

function set_objetivo() {
	const objetivo = document.getElementById("objetivo");

	objetivo.innerText = lista_missoes[0].objetivo;
}

function ls() {
	return diretorio_atual.ls();
}

function pwd() {
	return diretorio_atual.pwd();
}

function cd(destino) {
	diretorio_atual = diretorio_atual.cd(destino);
}

function mkdir(nova_pasta) {
	diretorio_atual.mkdir(nova_pasta);
}

function cat(arquivo) {
	return diretorio_atual.cat(arquivo);
}

async function use_command(line) {
	const template = document.getElementById("template");

	const clone = template.content.cloneNode(true);

	if (line == "clear") {
		document.getElementById("id_historico").innerHTML = "";
		return;
	}

	clone.querySelector(".command").innerText = `> ${line}`;

	const partes = line.split(" ");

	const comando = partes[0];
	const argumento = partes[1];

	let resposta = "";

	if (comando == "") {
    } else if (comando == "help"){
        resposta = "Comandos disponíveis: pwd, ls, cd, cat, clear";
	} else if (comando == "ls") {
		resposta = ls();
	} else if (comando == "pwd") {
		resposta = pwd();
	} else if (comando == "cd") {
		try {
			cd(argumento);
		} catch (error) {
			resposta = `<p style="color: red">${error}</p>`;
		}
	} else if (comando == "mkdir") {
		try {
			mkdir(argumento);
		} catch (error) {
			resposta = `<p style="color: red">${error}</p>`;
		}
	} else if (comando == "cat") {
		try {
			resposta = cat(argumento);
			// TODO: Tirar isso, é só pra brincadeira
			subir_nivel();
            setTimeout(() => {
                alert("Parabéns, você passou de nível")
            }, 3000)
			setTimeout(() => {
				window.location.href = "/fases";
			}, 8000);
		} catch (error) {
			resposta = `<p style="color: red">${error}</p>`;
		}
	} else {
		resposta = `<p style="color: red">Comando não reconhecido</p>`;
	}

	clone.querySelector(".response").innerHTML = resposta;

	const historico = document.getElementById("id_historico");
	historico.appendChild(clone);

	historico.scrollTop = historico.scrollHeight;
}

function main() {
	set_header();

	set_objetivo();

	const command_line = document.getElementById("command_line");

	command_line.focus();

	document
		.getElementById("id_container_terminal")
		.addEventListener("click", () => {
			command_line.focus();
		});

	command_line.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			use_command(command_line.value);

			command_line.value = "";
		}
	});
}

main();
