import { useField } from 'formik';
import ReactSelect from 'react-select';
import { FormField } from '../../types/FormField';
import style from './style.module.css';
import clsx from 'clsx/lite';

interface IProps {
  field: FormField;
}

export default function Select({ field }: IProps) {
  const [_, meta, helpers] = useField(field.name);

  const initialOption = field.options!.filter(
    (op) => op.value === meta.initialValue
  )[0];

  return (
    <ReactSelect
      instanceId={field.id}
      options={field.options}
      placeholder={field.placeholder}
      defaultValue={initialOption}
      name={field.name}
      unstyled={true}
      onChange={(newOption) => helpers.setValue((newOption as any).value)}
      onMenuClose={() => helpers.setTouched(true)}
      classNames={{
        option: (props) =>
          clsx(style.option, props.isSelected && style.selected_option),
        menu: (_) => style.menu,
        control: (props) =>
          clsx(
            style.control,
            !props.menuIsOpen && style.control_closed,
            props.menuIsOpen && style.control_open,
            meta.error && meta.touched && style.control_error
          ),
      }}
      {...field.props}
    />
  );
}
