import set_header from "../../utils.js";
import lista_missoes from "../../lista_missoes.js"

// TODO: Logout não ta funcionando aqui

function set_objetivo() {
    const objetivo = document.getElementById("objetivo")
    objetivo.innerText = lista_missoes[0].objetivo
}

function use_command(line) {
    const template = document.getElementById("template");
    const clone = template.content.cloneNode(true);

    if (line == "clear") {
        document.getElementById("id_historico").innerHTML = "";
        return;
    }

    clone.querySelector(".command").innerText = `> ${line}`;

    if (line == "ls") {
        clone.querySelector(".response").innerText = "Back/ Front/";
    } else if (line == "pwd") {
            clone.querySelector(".response").innerText = "/c/Users/israe/OneDrive/Área de Trabalho/Terminal";
    } else {
        clone.querySelector(".response").innerHTML = `<p style="color: red">Comando não reconhecido</p>`;
    }

    document.getElementById("id_historico").appendChild(clone);
}

function main() {
    set_header()
    set_objetivo()
    const command_line = document.getElementById("command_line")
    command_line.focus();
    command_line.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            use_command(command_line.value)
            command_line.value = ""
        }
    })
}

main()
