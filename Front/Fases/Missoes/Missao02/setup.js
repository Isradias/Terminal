import { Pasta } from "../../object.js";

let diretorio = new Pasta("~");
//~
diretorio.mkdir("monitoramento");
diretorio.mkdir("infra");
diretorio.mkdir(".diagnostico");

//infra
diretorio = diretorio.cd("infra")
diretorio.touch("LEIAME.txt")
const leiame = diretorio.filhos.find(
    (x) => x.nome == "LEIAME.txt"
)
leiame.conteudo = `Diagnósticos encontram-se <span style="color: #36e270;">ocultos</span> na pasta raiz.`;
diretorio = diretorio.cd("..")

//monitoramento/
diretorio = diretorio.cd("monitoramento");

diretorio.touch(".eventos.txt");
diretorio.mkdir(".quarentena");

const eventos = diretorio.filhos.find(
    (x) => x.nome == ".eventos.txt",
);

eventos.conteudo = `[RELATÓRIO DE ISOLAMENTO]<br><br>

Data: 1363-02-25<br><br>

Uma sequência de acessos não autorizados
foi detectada neste nó da rede.<br><br>

Os arquivos comprometidos foram movidos
para áreas de quarentena antes que a
contaminação alcançasse outros setores.<br><br>

A origem da atividade permanece
desconhecida.<br><br>

Entre os registros recuperados, uma
referência aparece repetidamente:<br><br>

infraestrutura<br><br>

Prioridade de investigação: ALTA`;

//monitoramento/.quarentena
diretorio = diretorio.cd(".quarentena");

diretorio.touch(".bonus.txt");

const bonus = diretorio.filhos.find(
    (x) => x.nome == ".bonus.txt",
);

bonus.conteudo = `
    2d6e 6c6f 6720 2b20 636f 6469 676f 5e5e<br>
    312f 3220 2b20 5959 5959 202b 2049 4920<br>
    2b20 6669 6228 3130 290d 0a2d 3020 696e<br>
    6963 6961 0d0a 2d6c 6569 6120 6f20 636c<br>
    6f67
`

//Voltando pra raiz
diretorio = diretorio.cd("..");
diretorio = diretorio.cd("..");

//Diagnóstico
diretorio = diretorio.cd(".diagnostico")
diretorio.touch("relatorio-02.txt")
diretorio.touch("relatorio-03.txt")
const relatorio_02 = diretorio.filhos.find(
	(x) => x.nome == "relatorio-02.txt",
);
const relatorio_03 = diretorio.filhos.find(
	(x) => x.nome == "relatorio-03.txt",
);

relatorio_02.conteudo = `Erro ao abrir: <span style="color: #2c2613 ">Arquivo corrompido</span>`
relatorio_03.conteudo = `[DIAGNÓSTICO AUTOMÁTICO]<br><br>
                        Nó: MONITORAMENTO-03<br>
                        Status: INSTÁVEL<br><br>
                        Verificação de integridade concluída.<br><br>
                        Anomalias detectadas:<br>
                        - 17 processos sem identificação.<br>
                        - 4 registros modificados após o bloqueio do sistema.<br>
                        - 1 diretório oculto acessado repetidamente.<br><br>
                        As tentativas de rastreamento falharam.<br>
                        A origem dos acessos permanece desconhecida.<br><br>
                        Última atividade registrada:<br><br>
                        04:12:08 — Conexão estabelecida.<br>
                        04:12:09 — Permissões elevadas.<br>
                        04:12:10 — Acesso autorizado.<br>
                        04:12:11 — Origem mascarada.`

diretorio = diretorio.cd("..");

export default diretorio;