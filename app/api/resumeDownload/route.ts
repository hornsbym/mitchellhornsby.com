const nodemailer = require('nodemailer')

const emailClient = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export async function GET(req: Request) {
    console.log(req)

    // Fill Nodemailer code here:
    const emailRes: Response = await emailClient.sendMail({
        from: `"mitchellhornsby.com" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: "Resume Download", // Subject line
        html: `
        <body style="background-color: #E5EBEB; border-radius: 1rem; padding: 1rem;">
            <h1 styly="font-size: 1.2rem;">Someone Downloaded my <span style="color:#2b67ad;">Resume </span></h1>
        </body>
        `,
    }).then(res => {
        return new Response("success", { status: 200 })
    }).catch(err => {
        return new Response(err.message, { status: 500, })
    })

    return emailRes
}
