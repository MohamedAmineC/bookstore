"use client"

import {PuffLoader} from "react-spinners"

const PageLoader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
        <PuffLoader 
        size={100}
        color="red"
        />
    </div>
  )
}

export default PageLoader