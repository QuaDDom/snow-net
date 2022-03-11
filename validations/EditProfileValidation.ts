import * as yup from 'yup';

export const editProfileSchema = yup.object().shape({
    name: yup.string().email().required(),
    lastname: yup.string().required()
})