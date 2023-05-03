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
import useLoginModal from "@/app/hooks/useLoginModal"
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"
import {PulseLoader} from "react-spinners"

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials',{
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged in')
                router.refresh()
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    } 

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    },[loginModal,registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back to Airbnb!"
            subTitle="Login to your account"
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
            onClick={() => signIn('google')}
            />
            <Button 
            outline
            label="Continue With Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
            />
            <Button 
            outline
            label="Continue With Facebook"
            icon={AiFillFacebook}
            onClick={() => signIn('facebook')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex items-center gap-2">
                    <div>
                        First time using Airbnb ?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline"
                    onClick={toggle}>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        title="Login"
        actionLabel={isLoading ? (<PulseLoader size={24} color="white" />) : 'Login'}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal