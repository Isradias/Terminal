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
            .filter((filho) => !filho.nome.startsWith("."))
            .sort((a, b) => a.nome.localeCompare(b.nome))
            .map((filho) =>
                filho instanceof Pasta ? filho.nome + "/" : filho.nome
            )
            .join(" ");
    }

	ls_a() {
		return this.filhos
			.sort((a, b) => a.nome.localeCompare(b.nome))
			.map((filho) =>
				filho instanceof Pasta ? filho.nome + "/" : filho.nome
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