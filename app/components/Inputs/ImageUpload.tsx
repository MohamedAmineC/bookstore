"use client"

import {CldUploadWidget} from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { IoMdClose } from "react-icons/io"
import {TbPhotoPlus} from "react-icons/tb"
import { MouseEvent } from "react"

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
  const handleRemoveImage = useCallback((e:MouseEvent<HTMLDivElement, globalThis.MouseEvent>,image:string) => {
    e.stopPropagation();
    onChange(value.filter(item => item !== image))
  },[onChange,value])
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
                className={`absolute inset-0 grid w-full h-full grid-cols-1 gap-4 overflow-auto
                ${value.length == 1 ? 'sm:grid-cols-1' : 'sm:grid-cols-2'}
                ${value.length == 1 ? 'md:grid-cols-1' : (value.length == 2 ? 'md:grid-cols-2' : 'md:grid-cols-3')}`}
                >
                  {value?.map((image) => (
                    <div key={image} className="relative col-span-1">
                      <Image 
                      alt="Upload Image"
                      fill
                      style={{objectFit: 'cover'}}
                      src={image}
                      className="col-span-1"
                      />
                      <div className="absolute top-2 right-1 bg-red-600/30 z-10 w-10 h-10 rounded-full text-white grid place-items-center"
                      onClick={(e) => handleRemoveImage(e,image)}>
                        <IoMdClose />
                      </div>
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