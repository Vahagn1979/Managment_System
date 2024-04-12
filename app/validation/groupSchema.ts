import * as yup from "yup";

export const groupSchema = yup.object().shape({
    name: yup.string().required(),
    maxCount: yup.number().min(2).max(16).required()
})