import { set_header, subir_nivel } from "../../utils.js";
import pastas from "./pastas.js";
import diretorio from "./setup.js";
import { Pasta, Arquivo } from "../../object.js";
import lista_missoes from "../../lista_missoes.js";

let diretorio_atual = diretorio;

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

	console.log(partes.length);
	
	if (partes.length == 1){
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
		}
	}
	else if (comando == "cat") {
	try {
		resposta = cat(argumento);
		
		subir_nivel(1);
		setTimeout(() => {
			alert("Parabéns recruta, já sabe o básico para navegar entre pastas, temos uma missão nova disponível")
		}, 2000);
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

	document
		.getElementById("sair")
		.addEventListener("click", () => {
			window.location.href = "/fases"
		})
}

main();
