import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { emojis } from '../data/emojis.data';

export const useEmojiPicker = ()=>{
    const [currentCategory, setCurrentCategory] = useState<string>('people');
    
    const activityList = emojis.filter((emoji) => emoji.category === "Activity"),
    peopleList = emojis.filter((emoji) => emoji.category === "Smileys & People"),
    natureList = emojis.filter((emoji) => emoji.category === "Animals & Nature"),
    symbolList = emojis.filter((emoji) => emoji.category === "Symbols"),
    foodList = emojis.filter((emoji) => emoji.category === "Food & Drink"),
    objectList = emojis.filter((emoji) => emoji.category === "Objects"),
    travelList = emojis.filter((emoji) => emoji.category === "Travel & Places");
    
    const handleCategory = (category: string) =>{
        if(category === "activity") setCurrentCategory("activity");
        else if(category === "people") setCurrentCategory("people");
        else if(category === "symbols") setCurrentCategory("symbols");
        else if(category === "animals") setCurrentCategory("animals");
        else if(category === "food") setCurrentCategory("food");
        else if(category === "objects") setCurrentCategory("objects");
        else setCurrentCategory("travel");
    }

    

    return {
        activityList,
        peopleList,
        natureList,
        symbolList,
        foodList,
        objectList,
        travelList,
        currentCategory,
        handleCategory
    };
}