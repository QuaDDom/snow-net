import * as yup from 'yup';

export const gallerySchema = yup.object().shape({
    title: yup.string().max(15).min(5).required()
})