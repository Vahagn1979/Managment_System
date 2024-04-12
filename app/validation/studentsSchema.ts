import * as yup from "yup";

export const studentsSchema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    groupId: yup.string().required(),
})