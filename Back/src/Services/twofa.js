const speakeasy = require('speakeasy');

exports.gerarSegredo= () =>{
    return speakeasy.generateSecret({ name: 'terminal_os'});
};
exports.verificarCodigo = (secret, token) => {
    return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window:1
    });
};