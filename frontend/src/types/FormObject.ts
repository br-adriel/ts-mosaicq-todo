import { ObjectSchema } from 'yup';
import { FormField } from './FormField';

export type FormObject = {
  initialValues: Record<string, string>;
  validationSchema: ObjectSchema<any>;
  fields: FormField[];
};
