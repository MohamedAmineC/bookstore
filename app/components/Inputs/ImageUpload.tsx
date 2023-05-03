"use client"

import {CldUploadWidget} from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import {TbPhotoPlus} from "react-icons/tb"

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value:string[]) => void;
  value: string[]
}

const ImageUpload:React.FC<ImageUploadProps> = ({
  onChange,value
}) => {
  const handleUpload = useCallback((result:any) => {
    if (result?.event === 'success') {
      const secureUrl = result?.info?.secure_url;
      if (secureUrl) {
        onChange([...value, secureUrl]);
      }
    }
  }, [onChange, value]);
  console.log(value)
  return (
    <CldUploadWidget 
    onUpload={handleUpload}
    uploadPreset="ot7wnv9f"
    options={{
      maxFiles: 30
    }}
    >
      {({open}) => {
        return (
          <div onClick={() => open?.()}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 px-20 py-60 md:p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            {
              value && (
                <div
                className="absolute inset-0 grid w-full h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-auto"
                >
                  {value?.map((image) => (
                    <div key={image} className="col-span-1">
                      <Image 
                      alt="Upload Image"
                      width={500}
                      height={200}
                      style={{objectFit: 'cover'}}
                      src={image}
                      className="col-span-1 h-full"
                      />
                    </div>
                    ))}
                </div>
              )
            }
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload