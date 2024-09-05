'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

type Inputs = {
    fullName: string
    email: string
    phone_number: string
    message: string
}

const validationSchema = yup
    .object()
    .shape({
        fullName: yup.string().required(),
        email: yup.string().email().required(),
        phone_number: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
        message: yup.string().required()
    })
    .required()


export default function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    })
    const [formRes, setFormRes] = useState<Response | null>(null)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const response = await fetch('/api/submitInquiry', {
            method: 'POST',
            body: JSON.stringify(data)
        })

        setFormRes(response)
    }

    return (
        <section
            className={`
                flex
                flex-col
                gap-4
                items-center
                w-full
                justify-center
                pt-32
                pb-16
            `}
            id="contact"
        >
            <SectionContainer className={{
                inner: `bg-sky-200 p-4 rounded-lg drop-shadow-light dark:drop-shadow-dark`,
            }}>
                <h2 className="text-3xl h-[5rem] font-header">Say Hello!</h2>
                <div className={`flex flex-col w-5/6 md:w-3/4 self-center min-h-36 items-stretch justify-center`}>
                    {formRes && formRes.ok ? (<div className="self-center">
                        {`Thanks, I've got your message! I'll contact you shortly.`}
                    </div>) : (
                        <form
                            className="flex flex-1 flex-col gap-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" id="fullName" className="rounded-lg p-2" {...register("fullName", { required: true })} />
                                <p className="text-red-500 italic">{errors.fullName ? errors.fullName.message : ''}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex flex-1 flex-col">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" id="email" className="rounded-lg p-2" {...register("email", { required: true })} />
                                    <p className="text-red-500 italic">{errors.email ? errors.email.message : ''}</p>
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <label htmlFor="phone_number">Phone Number</label>
                                    <input type="tel" id="phone_number" className="rounded-lg p-2" {...register("phone_number", { required: true })} />
                                    <p className="text-red-500 italic">{errors.phone_number ? errors.phone_number.message : ''}</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" className="rounded-lg p-2" {...register("message", { required: true })} />
                                <p className="text-red-500 italic">{errors.message ? errors.message.message : ''}</p>
                            </div>
                            <button
                                type="submit"
                                className="flex flex-row items-center justify-center py-2 px-6 bg-yellow-400 w-fit self-center rounded-lg"
                            >
                                {!isSubmitting ? "Send Message" : <RiLoader5Fill className="text-xl animate-spin" />}
                            </button>
                            {(formRes && !formRes.ok) ? (
                                <p className="text-red-500 italic">{`Sorry, something went wrong. Try again in a little while.`}</p>
                            ) : (
                                <p></p>
                            )}
                        </form>
                    )}
                </div>
            </SectionContainer>
        </section>
    );
}
