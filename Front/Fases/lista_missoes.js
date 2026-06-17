const missoes = [
	{
		titulo: "Reconhecimento do Sistema",
		subtitulo: "Mapeie o ambiente e descubra onde está.",
		narrativa:
			"O arquivo LEIAME.txt foi a única resposta encontrada em um sistema praticamente abandonado. Nenhum remetente. Nenhuma assinatura. Apenas uma mensagem deixada por alguém que presenciou o início da queda. Se ainda existe uma chance de restaurar a Central, ela está escondida nos arquivos que sobreviveram aos últimos dezoito dias. Descubra onde você está, investigue os diretórios disponíveis e siga os rastros deixados pelos operadores desaparecidos. A verdade sobre o incidente ainda está armazenada em algum lugar da rede.",
		dificuldade: "Easy",
		objetivo:
			"Descobrir o diretório atual, listar arquivos e identificar pastas relevantes.",
		habilidades: ["pwd", "ls", "cd"],
	},
	{
		titulo: "Arquivo Suspeito",
		subtitulo: "Encontre evidências escondidas no sistema.",
		narrativa:
			"Uma inconsistência foi detectada nos registros da Central. A contagem de arquivos armazenados não corresponde aos itens visíveis no diretório atual. Os invasores costumavam esconder informações críticas para dificultar a investigação e atrasar as equipes de resposta. Há indícios de que uma pista importante ainda permanece neste setor, mas ela não será encontrada por uma inspeção superficial. Examine o ambiente com atenção e localize tudo o que estiver presente no diretório.",
		dificuldade: "Easy",
		objetivo:
    		"Localizar informações ocultas no diretório e analisar os registros encontrados.",
		habilidades: ["pwd", "ls", "cd"],
	},
	{
		titulo: "Limpeza de Rastros",
		subtitulo: "Remova evidências sem deixar pistas.",
		dificuldade: "Easy",
		objetivo:
			"Deletar arquivos e diretórios específicos sem afetar outros dados.",
		habilidades: ["rm", "rmdir"],
	},
	{
		titulo: "Manipulação de Arquivos",
		subtitulo: "Reorganize dados para confundir o sistema.",
		dificuldade: "Easy",
		objetivo:
			"Copiar, mover e renomear arquivos para locais estratégicos.",
		habilidades: ["cp", "mv"],
	},
	{
		titulo: "Análise de Logs",
		subtitulo: "Extraia informações úteis de grandes arquivos.",
		dificuldade: "Medium",
		objetivo:
			"Filtrar linhas específicas e identificar padrões em logs.",
		habilidades: ["grep", "head", "less"],
	},
	{
		titulo: "Permissões Críticas",
		subtitulo: "Ganhe acesso a áreas restritas.",
		dificuldade: "Medium",
		objetivo:
			"Alterar permissões de arquivos para permitir leitura/escrita.",
		habilidades: ["chmod"],
	},
	{
		titulo: "Processos Sob Controle",
		subtitulo: "Investigue o que está rodando no sistema.",
		dificuldade: "Medium",
		objetivo:
			"Listar processos ativos e identificar um processo suspeito.",
		habilidades: ["ps"],
	},
	{
		titulo: "Operação Fantasma",
		subtitulo: "Crie e esconda arquivos sem ser detectado.",
		dificuldade: "Medium",
		objetivo:
			"Criar arquivos ocultos e garantir que não apareçam em listagens comuns.",
		habilidades: ["touch", "ls -a"],
	},
	{
		titulo: "Busca Avançada",
		subtitulo: "Encontre dados específicos em meio ao caos.",
		dificuldade: "Medium",
		objetivo:
			"Combinar busca de arquivos com filtragem de conteúdo.",
		habilidades: ["find", "grep"],
	},
	{
		titulo: "Invasão Completa",
		subtitulo: "Execute uma operação completa no sistema.",
		dificuldade: "Hard",
		objetivo:
			"Navegar pelo sistema, encontrar um arquivo, alterar permissões e extrair informação específica.",
		habilidades: ["cd", "find", "chmod", "grep", "cat"],
	},
];

export default missoes
