"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface LogoParams {
  show: boolean
}

const Logo:React.FC<LogoParams> = ({
  show
}) => {
    const router = useRouter();
  return (
    <Image
    src="/images/logo.png"
    alt="Logo"
    className={`sm:block cursor-pointer
    ${show ? 'block' : 'hidden'}`
    }
    height={100}
    width={100}
    onClick={() => router.push('/')}
    />
  )
}

export default Logo