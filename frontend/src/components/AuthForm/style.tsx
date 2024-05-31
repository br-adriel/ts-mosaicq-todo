import styled from 'styled-components';
import { Form as FormikForm } from 'formik';

export const Form = styled(FormikForm)`
  p {
    margin-bottom: 16px;
  }

  a,
  a:visited {
    color: var(--btn-color-secondary);
  }

  a:hover {
    text-decoration: underline;
  }
`;
