"use client"
import {AiOutlineMenu} from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState,useEffect, useRef } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { User } from "@prisma/client"
import {signOut} from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useRentModal from "@/app/hooks/useRentModal"

interface UserMenuProps{
    currentUser?: User | null
}

const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen,setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const rentModal = useRentModal();
    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    },[])
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen()
        }
        rentModal.onOpen();
    },[currentUser,loginModal,rentModal])

    // add event listener on mount
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
  return (
    <div className="relative" ref={menuRef}>
        <div className="flex items-center gap-3">
            <div
            onClick={onRent}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
                Airbnb your home
            </div>
            <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            onClick={toggleOpen}>
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image} />
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                    <>
                        <MenuItem onClick={() => {}} label="My Profile" />
                        <hr />
                        <MenuItem onClick={() => router.push('/trips')} label="My Trips" />
                        <MenuItem onClick={() => router.push('/favorites')} label="My favorites" />
                        <MenuItem onClick={() => router.push('/reservations')} label="My reservations" />
                        <MenuItem onClick={() => router.push('/properties')} label="My properties" />
                        <MenuItem onClick={() => rentModal.onOpen()} label="Airbnb my home" />
                        <hr />
                        <MenuItem onClick={() => signOut()} label="Logout" />
                    </>
                    ) : (
                    <>
                        <MenuItem onClick={loginModal.onOpen} label="Login" />
                        <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                        <hr />
                        <MenuItem onClick={() => router.push('https://community.withairbnb.com/t5/Community-Center/ct-p/community-center')} label="Community Center" />
                        <MenuItem onClick={() => router.push('https://www.airbnb.fr/help/?audience=guest')} label="Help" />

                    </>
                    )}
                    
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu