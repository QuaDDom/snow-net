import React from 'react'
import Bar from './Bar';
import { useNProgress } from '@tanem/react-nprogress'; 

export default function Progress({isAnimating}: {isAnimating: boolean}) {
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating
    }); 
    return <Bar 
            animationDuration={animationDuration} 
            isFinished={isFinished} 
            progress={progress}
            />
}
