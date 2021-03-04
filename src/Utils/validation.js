import * as Yup from 'yup'

export const  user = Yup.object().shape (
  {
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required()
  }
);

export const naver = Yup.object().shape(
  {
    name: Yup.string().required(),
    birthdate: Yup.date().required(),
    admissionDate: Yup.string().required(),
    jobRole: Yup.string().required()
  }
);

export const project = Yup.object().shape(
  {
    name: Yup.string().required()
  }
);
