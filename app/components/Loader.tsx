"use client"

import {PropagateLoader} from "react-spinners"

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-4">
        <PropagateLoader 
        size={24}
        color="white"
        />
    </div>
  )
}

export default Loader