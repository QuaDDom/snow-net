import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    username: yup.string()
                .required("This field is required")
                .min(3)
                .max(10)
                .lowercase("Please put the username in lowercase") ,
    name: yup.string()
                .required("This field is required")
                .min(3)
                .max(10) ,
    lastname: yup.string()
                .required("This field is required")
                .min(3)
                .max(14) ,
    email: yup.string()
                .email("Must comply with the email format")
                .required("This field is required") ,
    password: yup.string()
                .required("This field is required")
                .min(6)
                .max(30) ,
    reppassword: yup.string()
                .required("This field is required")
                .oneOf([yup.ref('password')], "Passwords must be equals!") ,
});