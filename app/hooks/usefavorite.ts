import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback,useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";

interface IUseFavorite {
    listingId: string,
    currentUser?: User | null
}

const useFavorite = ({
    listingId,
    currentUser
}:IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId)
    },[currentUser,listingId])

    const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if(!currentUser){
            return loginModal.onOpen();
        }
        try{
            let req = {}
            if(hasFavorited){
                req = axios.delete(`/api/favorites/${listingId}`)
            } else {
                req = axios.post(`/api/favorites/${listingId}`)
            }
            await req;
            router.refresh();
            toast.success('Success');
        } catch(err){
            toast.error('Something went wrong!')
        }
    },[router,currentUser,hasFavorited,listingId,loginModal])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;