import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    username: yup.string()
                .required()
                .min(3)
                .max(13) ,
    name: yup.string()
                .required()
                .min(3)
                .max(13) ,
    lastname: yup.string()
                .required()
                .min(3)
                .max(13) ,
    email: yup.string()
                .email()
                .required() ,
    password: yup.string()
                .required()
                .min(6)
                .max(30) ,
    reppassword: yup.string()
                .required()
                .oneOf([yup.ref('password'), null]) ,
    bio:  yup.string()
                .required()
});