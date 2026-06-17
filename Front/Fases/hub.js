import missoes from "./lista_missoes.js";
import { set_header } from "./utils.js";

function missao(nb) {
	if (nb < 10)
		window.location.href = `/protocolo_0${nb}`
	else
		window.location.href = `/protocolo_${nb}`
}

// Abrir painel de detalhes da missão
function abrirPainel(i, nivel){
	const fase = missoes[i];
	console.log("fase:", fase);
	console.log("narrativa:", fase.narrativa);
	const painel = document.getElementById("painel_detalhes");
	const conteudo = document.getElementById("painel_conteudo");
	const btn = document.getElementById("comecar_btn");

	conteudo.innerHTML = `
		<div class="painel_protocol">
			<span class="painel_protocol_txt">&gt;_ SYSTEM PROTOCOL 0${i + 1}</span>
		</div>
		<h2 class="painel_titulo">${fase.titulo}</h2>

		<div class="painel_secao">
			<span class="material-symbols-outlined painel_icone">info</span>
			<h4 class="painel_secao_titulo">BRIEFING DA MISSÃO</h4>
		</div>
		<p class="painel_texto">${fase.narrativa ?? fase.subtitulo}</p>

		<div class="painel_objetivo">
			<h4 class="painel_objetivo_titulo">OBJETIVO PRINCIPAL</h4>
			<p class="painel_texto">${fase.objetivo}</p>
		</div>

		<div class="painel_secao">
			<span class="material-symbols-outlined painel_icone">terminal</span>
			<h4 class="painel_secao_titulo">COMANDOS REQUERIDOS</h4>
		</div>
		<div class="painel_comandos">
			${fase.habilidades.map(h => `<span class="painel_cmd">${h}</span>`).join("")}
		</div>
    `
	btn.onclick = () => {
    	if (i <= nivel) {
        	missao(i + 1)
    	}	 else {
        	alert("Missão indisponível")
    	}
	}
	painel.classList.add("aberto");

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
		clone.querySelector(".btn_missao").addEventListener("click", () => {
    		abrirPainel(i, nivel)
		})
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

async function reset() {
	try {
		const response = await fetch("/reset", {
			method: "PUT"
		})
		if (!response.ok) {
			console.log("Erro ao resetar nível");
			return;
		}
	} catch (error) {
		console.log(error);
	}
}

async function main() {
	const nivel = await set_header();
	criar_missoes(Number(nivel));
	const btn_reset = document.getElementById("reset")
	btn_reset.addEventListener("click", reset)

	document.getElementById("fechar_painel").addEventListener("click", () => {
		document.getElementById("painel_detalhes").classList.remove("aberto");
	});
}

main();
