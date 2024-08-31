'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";

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
            className="flex flex-col gap-4 items-center w-full aspect-square sm:aspect-[7/5] lg:aspect-[7/4] xl:aspect-[16/7] justify-center"
            id="contact"
        >
            <h2 className="text-3xl h-[5rem] font-body text-center w-3/4 sm:w-1/2 lg:w-1/4">Say hello!</h2>

            <div className={`bg-gray-300 p-4`}>
                {formRes && formRes.ok ? (<div>
                    {`Thanks, I've got your message! I'll contact you shortly.`}
                </div>) : (
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" id="fullName" {...register("fullName", { required: true })} />
                            <p className="text-red-500 italic">{errors.fullName ? errors.fullName.message : ''}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="email">Email address</label>
                                <input type="email" id="email" {...register("email", { required: true })} />
                                <p className="text-red-500 italic">{errors.email ? errors.email.message : ''}</p>
                            </div>
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="phone_number">Phone Number</label>
                                <input type="tel" id="phone_number" {...register("phone_number", { required: true })} />
                                <p className="text-red-500 italic">{errors.phone_number ? errors.phone_number.message : ''}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" {...register("message", { required: true })} />
                            <p className="text-red-500 italic">{errors.message ? errors.message.message : ''}</p>
                        </div>
                        <button
                            type="submit"
                            className="flex flex-row items-center justify-center p-2 bg-white"
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
        </section>
    );
}