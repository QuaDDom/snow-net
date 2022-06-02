import '../styles/globals.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import type { AppProps } from 'next/app'
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RouteLoader from '../components/RouteLoader';
import Progress from '../components/Progress/Progress';
import { useRouteLoading } from '../hooks/useRouteLoading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      img: any
    }
  }
}


function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const setIsAnimating = useRouteLoading(s=> s.setIsAnimating);
  const isAnimating = useRouteLoading(s=> s.isAnimating);

  useEffect(()=>{
    setTimeout(()=>{
        setIsLoading(false)
    },1200);
  },[]);

  const router = useRouter();

  useEffect(()=>{
    const handleStart = ()=>{
      setIsAnimating(true);
    }
    const handleStop = ()=>{
      setIsAnimating(false);
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);

    return ()=>{
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
    }

  },[router])

  return (
    <>
      <Loader isLoading={isLoading}/>
      <Progress isAnimating={isAnimating}/>
      { isLoading || <Component {...pageProps} />}
    </>
  )
}

export default MyApp
