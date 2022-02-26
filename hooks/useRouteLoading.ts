import Router from "next/router";
import { useState } from "react";
import create from 'zustand';

export const useRouteLoading = create((set: any)=>({
    isAnimating: false,
    setIsAnimating: (isAnimating: any)=> set(()=> ({isAnimating}))
}))