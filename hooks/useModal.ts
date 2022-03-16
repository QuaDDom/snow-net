import { useState } from "react";

export const useModal = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);

    return {isOpen, handleClick}
}