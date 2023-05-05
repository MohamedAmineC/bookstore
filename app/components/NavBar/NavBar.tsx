"use client"

import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { User} from "@prisma/client"
import Categories from "./Categories"
import { usePathname } from "next/navigation"

interface NavBarI{
  currentUser?: User | null 
}

const NavBar:React.FC<NavBarI> = ({
  currentUser
}) => {
  const pathname = usePathname();
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className="flex items-center justify-between gap-3 md:gap-0">
                    <Logo show={pathname !== '/'} />
                    <Search />
                    <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default NavBar