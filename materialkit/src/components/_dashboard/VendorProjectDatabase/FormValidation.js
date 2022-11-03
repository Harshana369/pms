import * as Yup from 'yup';

export const dataSitesSchema = Yup.object().shape({
  Project_ID: Yup.string().required('* required'),
  Site_ID: Yup.string().required('* required'),
  Site_Name: Yup.string().required('* required'),
  TSS_PO_number: Yup.string().required('* required'),
  TSS_HO: Yup.string().required('* required'),
  PI_Number: Yup.string().required('* required')
});
