import { set_header, subir_nivel } from "../../utils.js";
import pastas from "./pastas.js";
import diretorio from "./setup.js";
import { Pasta, Arquivo } from "../../object.js";
import lista_missoes from "../../lista_missoes.js";

let diretorio_atual = diretorio;
const arquivos_encontrados = new Set()

function set_objetivo() {
	const objetivo = document.getElementById("objetivo");

	objetivo.innerText = lista_missoes[1].objetivo;
}

function ls() {
	return diretorio_atual.ls();
}

function pwd() {
	return diretorio_atual.pwd();
}

function cd(destino) {
	diretorio_atual = diretorio_atual.cd(destino);
	return ""
}

function cat(arquivo) {
	return diretorio_atual.cat(arquivo);
}

function ls_a() {
	return diretorio_atual.ls_a();
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

	let resposta = `<p style="color: red">Comando não reconhecido</p>`;

	if (partes.length == 0){
		resposta = ""
	}
	if (partes.length == 1){
		if (comando == "") {
		} else if (comando == "help"){
			resposta = "Comandos disponíveis: pwd, ls, cd, cat, clear";
		} else if (comando == "ls") {
			resposta = ls();
		} else if (comando == "pwd") {
			resposta = pwd();
		}
	}
	else if (partes.length == 2){
		if (comando == "cd") {
			try {
				resposta = cd(argumento);
			} catch (error) {
				resposta = `<p style="color: red">${error}</p>`;
			}
		}
		else if (comando == "ls" && argumento == "-A"){
			resposta = ls_a()
		}
		else if (comando == "cat") {
			try {
				resposta = cat(argumento);
				if (["relatorio-03.txt", ".eventos.txt"].includes(argumento)){
					arquivos_encontrados.add(argumento)
					document.getElementById("status").textContent=arquivos_encontrados.size
				}
				if (arquivos_encontrados.size == 2) {
					subir_nivel(2);
					setTimeout(() => {
						alert("Muito bem recruta! Os arquivos foram encontrados com sucesso.",
							  "temos uma missão nova disponível")
					}, 2000);
				}
			} catch (error) {
				resposta = `<p style="color: red">${error}</p>`;
			}
		}
	}

	clone.querySelector(".response").innerHTML = resposta;

	const historico = document.getElementById("id_historico");
	historico.appendChild(clone);

	historico.scrollTop = historico.scrollHeight;
}

function main() {
	console.log("4PMW+4H");
	
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
