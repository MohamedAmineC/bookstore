"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import qs from "query-string"

interface CategoryBoxProps {
    label: string,
    icon: IconType,
    selected?: boolean
}

const CategoryBox:React.FC<CategoryBoxProps> = ({
    label,selected,icon:Icon
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let query = {};
        if(params){
            query = qs.parse(params.toString())
        }
        const updatedQuery:any = {
            ...query,
            category: label,
        }
        if(params?.get('category') === label){
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        },{
            skipNull:true,
        })

        router.push(url)
    },[params,label,router])
  return (
    <div className={`flex flex-col items-center gap-2 justify-center p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
    onClick={handleClick}
    >
        <Icon size={26} />
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}

export default CategoryBox