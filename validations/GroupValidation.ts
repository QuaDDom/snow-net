import * as yup from 'yup';

export const groupSchema = yup.object().shape({
    title: yup.string().max(15).min(5).required(),
    description: yup.string().max(75).min(10).required()
})