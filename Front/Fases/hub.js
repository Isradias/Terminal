import missoes from "./lista_missoes.js";
import { set_header } from "./utils.js";

function missao(nb) {
	if (nb < 10)
		window.location.href = `/protocolo_0${nb}`
	else
		window.location.href = `/protocolo_${nb}`
}

// Abrir painel de detalhes da missão
function abrirPainel(i){
	const fase = missoes[i];
	const painel = document.getElementById("painel_detalhes");
	const conteudo = document.getElementById("painel_conteudo");
	const btn = document.getElementById("comecar_btn");

	conteudo.innerHTML = `
		<h4>FASE ${i + 1} — ${fase.dificuldade}</h4>
        <h2>${fase.titulo}</h2>
        <p>${fase.subtitulo}</p>
        <p>${fase.objetivo}</p>
        <div>${fase.habilidades.join(", ")}</div>
    `

	btn.onclick = () => missao(i + 1);
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
			// abrirPainel(i)
			if (nivel < i) {
				alert("Missão indisponível")
			} else {
				missao(i + 1)
			}
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
