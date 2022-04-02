import { useState } from "react";
import Resizer from "react-image-file-resizer";

export const useImageResizer = (file: File)=>(
    new Promise((resolve)=>{
        Resizer.imageFileResizer(
            file,
            650,
            650,
            "JPEG",
            80,
            0,
            (url)=>{
                resolve(url);
            },
            "file"
         );  
    })
)
