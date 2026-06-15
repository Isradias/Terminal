import { Pasta, Arquivo } from "../../object.js";

let diretorio = new Pasta("~");

diretorio.mkdir("central");
diretorio.mkdir("arquivos");
diretorio.mkdir("setores");
diretorio.mkdir(".seguranca")

diretorio = diretorio.cd("setores");

diretorio.mkdir("setor-07");
diretorio.mkdir("setor-12");

diretorio = diretorio.cd("setor-07");

diretorio.mkdir("registros");
diretorio.mkdir("manutencao");

diretorio.touch("LEIAME.txt");
const arquivo = diretorio.filhos.find((x) => x.nome == "LEIAME.txt")
arquivo.conteudo = `[LOG DE INICIALIZAÇÃO N°21]<br>
                Conexão estabelecida.<br><br>
                A maioria dos setores não responde.<br><br>
                Os protocolos automáticos de contenção<br>
                foram ativados há 18 dias.<br><br>
                Se você encontrou este terminal,<br>
                talvez ainda exista uma forma de<br>
                restaurar a Central.<br><br>
                Procure pelos registros restantes.<br><br>
                Código: 9604
                `

diretorio = diretorio.cd("..");
diretorio = diretorio.cd("..");

export default diretorio;
