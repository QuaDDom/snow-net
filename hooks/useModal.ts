import { useState } from "react";

export const useModal = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = ()=> isOpen ? setIsOpen(false) : setIsOpen(true);

    return {isOpen, handleOpenModal}
}