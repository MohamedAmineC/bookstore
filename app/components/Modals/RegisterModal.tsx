"use client"

import Modal from "./Modal"
import axios from "axios"
import { AiFillGithub,AiFillFacebook } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import {useCallback,useState} from "react"
import {FieldValues,useForm,SubmitHandler} from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Heading from "../Heading"
import Input from "../Inputs/Input"
import {toast} from "react-hot-toast"
import Button from "../Button"

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading,setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register',data)
        .then(() => {
            registerModal.onClose
        }).catch((error) => {
            toast.error(error.message)
        }).finally(() => {
            setIsLoading(false)
        })
    } 

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb"
            subTitle="Create an account"
            />
            <Input
            id="email"
            label="Email"
            type="email"
            disabled={isLoading}
            errors={errors}
            required
            register={register}
            />
            <Input
            id="name"
            label="Name"
            disabled={isLoading}
            errors={errors}
            required
            register={register}
            />
            <Input
            id="password"
            label="password"
            type="password"
            disabled={isLoading}
            errors={errors}
            required
            register={register}
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
            outline
            label="Continue With Google"
            icon={FcGoogle}
            onClick={() => {}}
            />
            <Button 
            outline
            label="Continue With Github"
            icon={AiFillGithub}
            onClick={() => {}}
            />
            <Button 
            outline
            label="Continue With Facebook"
            icon={AiFillFacebook}
            onClick={() => {}}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex items-center gap-2">
                    <div>
                        Already have an account ?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline"
                    onClick={registerModal.onClose}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        title="Register"
        actionLabel="Continue"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal