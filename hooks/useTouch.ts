import { useState } from "react";

export const useTouch = ()=>{
    const [touch, setTouch] = useState('');

    let startingX: number, startingY: number, movingX: number, movingY: number;

    const handleTouchStart = (e: any)=>{
        startingX = e.touches[0].clientX;
        startingY = e.touches[0].clientY;
    }
    const handleTouchMove = (e: any)=>{
        movingX = e.touches[0].clientX;
        movingY = e.touches[0].clientY;
    }
    const handleTouchEnd = (e: any)=>{
        if(startingX + 100 < movingX){
            setTouch('right')
            console.log('right')
        } else if(startingX - 100 > movingX){
            setTouch('left')
            console.log('left')
        }
    }

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        touch
    };
}