import { useEffect, useState } from "react";

export const useDragDrop = ({setFile, containerRef}: any)=>{
    const [isOver, setIsOver] = useState(false);

    containerRef.current?.addEventListener('dragover', (e: any)=>{
        setIsOver(true)
    });

    ["dragleave", "dragend"].forEach(type=>{
        containerRef.current?.addEventListener(type, ()=>{
            setIsOver(false);
        });
    });

    containerRef.current?.addEventListener('drop', (e: any)=>{
        e.preventDefault();
        setFile(e.dataTransfer.files[0])
        setIsOver(false);
    });

    return {
        isOver
    }
}