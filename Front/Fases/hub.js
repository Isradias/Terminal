async function get_nivel() {
	try {
		const result = await fetch("/nivel");
		const data = await result.json();
		if (!result.ok) {
			console.log("Erro ao buscar nível");
			return;
		} else {
			return data.nivel;
		}
	} catch (err) {
		console.log(err);
	}
}

async function carregar_nivel(nivel) {
	const nivel_titulo = document.getElementById("nivel");
	nivel_titulo.textContent = `NIVEL: ${nivel}`;
}

async function subir_nivel() {
	try {
		const response = await fetch("/subir_nivel", {
            method: "PUT"
        })

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

async function main() {
	const nivel = await get_nivel();
	carregar_nivel(nivel);
}

main();
