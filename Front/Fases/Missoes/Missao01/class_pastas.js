export class Arquivo {
	constructor(nome, pai) {
		this.nome = nome;
		this.pai = pai;
		this.conteudo = "";
	}
}

export class Pasta {
	constructor(nome, pai = null) {
		this.nome = nome;
		this.pai = pai;
		this.filhos = [];
	}

	arquivo_existente(novo, tipo) {
		const nomes_filhos = this.filhos.map((x) => x.nome);
		if (nomes_filhos.includes(novo)) {
			if (tipo == "arquivo")
				throw new Error("Um arquivo com esse nome já existe");
			if (tipo == "pasta")
				throw new Error("Uma pasta com esse nome já existe");
		}
	}

	mkdir(nova_pasta) {
		this.arquivo_existente(nova_pasta, "pasta");
		const novo_filho = new Pasta(nova_pasta, this);
		this.filhos.push(novo_filho);
	}

	touch(novo_arquivo) {
		this.arquivo_existente(novo_arquivo, "arquivo");
		const arquivo = new Arquivo(novo_arquivo, this);
		this.filhos.push(arquivo);
	}

	ls() {
		return this.filhos

			.sort((a, b) => a.nome.localeCompare(b.nome))

			.map((filho) =>
				filho instanceof Pasta ? "/" + filho.nome : filho.nome,
			)

			.join(" ");
	}

	cd(destino) {
		const filho = this.filhos.find((x) => x.nome == destino);

		if (destino == "..") {
			return this.pai || this;
		}

		if (!destino) {
			throw new Error("Informe um diretório");
		}

		if (!filho) {
			throw new Error("Diretório não existe");
		}

		if (!(filho instanceof Pasta)) {
			throw new Error(`'${destino}' não é um diretório`);
		}

		return filho;
	}

	pwd() {
		if (!this.pai) {
			return "~";
		}

		return this.pai.pwd() + "/" + this.nome;
	}

    cat(arquivo) {
        const filho = this.filhos.find((x) => x.nome == arquivo);
        if (!arquivo){
			throw new Error("Informe um arquivo");
		}

		if (!filho) {
            throw new Error(`'${arquivo}' não existe`);
        }

        if (!(filho instanceof Arquivo)) {
            throw new Error(`'${arquivo}' não é um arquivo`);
        }

        return filho.conteudo
    }

	mv(alvo, destino) {
    const item = this.filhos.find((x) => x.nome == alvo);
    
    if (item == undefined) {
        throw new Error("Item não encontrado");
    }
    
    this.filhos = this.filhos.filter((x) => x.nome != alvo);
    destino.filhos.push(item);
    item.pai = destino;
	}
}

let diretorio = new Pasta("~");

diretorio.mkdir("central");
diretorio.mkdir("arquivos");
diretorio.mkdir("setores");

diretorio = diretorio.cd("setores");

diretorio.mkdir("setor-07");
diretorio.mkdir("setor-12");

diretorio = diretorio.cd("setor-07");

diretorio.mkdir("registros");
diretorio.mkdir("manutencao");

diretorio.touch("LEIAME.txt");
const arquivo = diretorio.filhos.find((x) => x.nome == "LEIAME.txt")
arquivo.conteudo = `[LOG DE INICIALIZAÇÃO]<br>
                Conexão estabelecida.<br><br>
                A maioria dos setores não responde.<br><br>
                Os protocolos automáticos de contenção<br>
                foram ativados há 18 dias.<br><br>
                Se você encontrou este terminal,<br>
                talvez ainda exista uma forma de<br>
                restaurar a Central.<br><br>
                Procure pelos registros restantes.<br><br>
                2198
                `

diretorio = diretorio.cd("..");
diretorio = diretorio.cd("..");

export default diretorio;
