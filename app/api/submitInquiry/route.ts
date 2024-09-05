import trim from 'validator/lib/trim'
import escape from 'validator/lib/escape'
import NodemailerClient from '@/app/api/lib/nodemailerClient'

export async function POST(req: Request) {
    const body = await req.json()
    let { fullName, email, phone_number, message } = body

    if (!fullName || !email || !phone_number || !message) return new Response("Error", { status: 400 })

    fullName = escape(trim(fullName))
    phone_number = escape(trim(phone_number))
    email = escape(trim(email))
    message = escape(trim(message))

    // Fill Nodemailer code here:
    const emailRes: Response = await NodemailerClient.sendMail({
        from: `"${fullName}" <${process.env.EMAIL}>`, // sender address
        to: process.env.EMAIL, // list of receivers
        subject: "mitchellhornsby.com Inquiry", // Subject line
        html: `
        <body style="background-color: #E5EBEB; border-radius: 1rem; padding: 1rem;">
            <h1 styly="font-size: 1.2rem;">New inquiry from <span style="color:#2b67ad;">${fullName}</span></h1>
            <div style="font-size: 1rem;">
                <p><em>"${message}"</em></p>
                <p>Email them back them at ${email}</p> 
                <p>Call them back them at ${phone_number}</p>            
            </div>
        </body>
        `,
    }).then(res => {
        return new Response("success", { status: 200 })
    }).catch(err => {
        return new Response("error", { status: 500 })
    })

    return emailRes
}
