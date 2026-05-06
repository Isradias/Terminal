import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function enviarEmail(destino, token) {
    await transporter.sendMail({
        from: '"Terminal_os" <terminal_online_saga@gmail.com>',
        to: destino,
        subject: "[Terminal_os] Autenticação necessária",
        html: `
            <h2>🖥️ Terminal_os</h2>
            <p>> Usuário detectado, mas não autenticado.</p>

            <p>Para continuar, confirme sua identidade:</p>

            <a href="http://localhost:3000/verificar?email=${destino}&token=${token}" style="
                background:black;
                color:#00ff00;
                padding:10px;
                text-decoration:none;
                font-family:monospace;
            ">
                VERIFICAR ACESSO
            </a>

            <p>Se você não reconhece esta tentativa, ignore este email.</p>
        `
    });
}
