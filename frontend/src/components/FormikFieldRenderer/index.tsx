import { ErrorMessage, Field, useField } from 'formik';
import { FormField } from '../../types/FormField';
import Select from '../Select';
import * as S from './style';

interface IProps {
  field: FormField;
}

export default function FormikFieldRenderer({ field }: IProps) {
  const [_, meta, __] = useField(field.name);

  return (
    <S.FieldWrapper>
      <label htmlFor={field.id}>{field.label}</label>

      {field.type == 'select' ? (
        <Select field={field} />
      ) : (
        <Field
          {...field}
          className={meta.error && meta.touched ? 'error' : ''}
        />
      )}

      {meta.touched && meta.error && (
        <S.FormikError>
          <ErrorMessage name={field.name} />
        </S.FormikError>
      )}
    </S.FieldWrapper>
  );
}
