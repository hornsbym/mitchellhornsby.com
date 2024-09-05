import NodemailerClient from '@/app/api/lib/nodemailerClient'

export async function POST(req: Request) {
    console.log(req)

    // Fill Nodemailer code here:
    const emailRes: Response = await NodemailerClient.sendMail({
        from: `"Website Automation" <${process.env.EMAIL}>`,
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
