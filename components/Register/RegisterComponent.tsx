import React, { useContext, useEffect, useState } from 'react'
import Input from '../Input'
import styles from '../../styles/register.module.scss';
import AuthContext from '../../context/AuthContext';
import TextArea from '../TextArea';
import Button from '../Button';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../validations/RegisterValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import PageFour from './PageFour';
import PageDots from './PageDots';


export default function RegisterInputs() {
  const [page, setPage] = useState(1);
  const { handleChange, handleSubmit, values, loggedUser } = useContext<any>(AuthContext);

  const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    reValidateMode: "onChange",
    mode: "onChange"
  });
    
  useEffect(()=>{
    if(loggedUser){
        Router.push('/')
    }
  },[loggedUser])

  return (
    <div className={styles.registerContainer}>
    <div className={styles.containerAll}>
      <div className={styles.registerContent}>
        <div className={styles.registerBackground}>
          <img src="welcome-snow.svg" alt="" />
        </div>
        <div className={styles.register}>
            <div className={styles.registerText}>
              <h2>Get Started!</h2>
            </div>
            <PageDots page={page}/>
            <div className={styles.formContainer}>
              <form onSubmit={handleFormSubmit(handleSubmit)}>
                  <div className={styles.inputsCont}>
                        {page === 1 && <PageOne 
                        register={register} 
                        errors={errors} 
                        handleChange={handleChange}
                        values={values}
                        />}
                        {page === 2 && <PageTwo
                        register={register} 
                        errors={errors} 
                        handleChange={handleChange}
                        values={values}
                        />}
                        {page === 3 && <PageThree
                        register={register} 
                        errors={errors} 
                        handleChange={handleChange}
                        values={values}
                        />}
                  </div>
                  <div className={styles.buttons}>
                      { page >=2 && <button 
                      onClick={()=> setPage(page - 1)} 
                      type="button"
                      className={styles.back}
                      >
                        <IoIosArrowBack/>
                      </button>}
                      { page <=3 && <button 
                      onClick={()=> setPage(page + 1)} 
                      type="button"
                      className={styles.forward}
                      >
                        <IoIosArrowForward/>
                      </button>}
                  </div>
              </form>
            </div>  
        </div>
      </div>
    </div>
  </div>
  )
}
