import dns from "node:dns";
import nodemailer from "nodemailer";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function enviarEmail(destino, token) {
    try {
        await transporter.sendMail({
            from: `"Terminal_os" <${process.env.EMAIL_USER}>`,
            to: destino,
            subject: "[Terminal_os] Autenticação necessária",
            html: `<p>Teste</p>`
        });

        console.log("Email enviado");
    } catch (err) {
        console.error(err);
    }
}
