import speakeasy from "speakeasy";

export function gerarSegredo() {
    return speakeasy.generateSecret({ name: 'terminal_os'});
}

export function verificarCodigo(secret, token) {
    return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window:1
    });
};
module.exports = {gerarSegredo, verificarCodigo};

