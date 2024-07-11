import * as Yup from "yup";

export const otpverify=Yup.object({
    otp:Yup
    .string()
    .matches(/^\d{6}$/, 'Must be a six-digit number')
    .required('Six-digit number is required'),
})