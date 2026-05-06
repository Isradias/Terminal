import set_header from "../../utils.js";
import lista_missoes from "../../lista_missoes.js"

// TODO: Logout não ta funcionando aqui

function set_objetivo() {
    const objetivo = document.getElementById("objetivo")
    objetivo.innerText = lista_missoes[0].objetivo
}

function main() {
    set_header()
    set_objetivo()
}

main()