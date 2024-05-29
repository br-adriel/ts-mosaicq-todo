export type FormField = {
  id: string;
  name: string;
  label?: string;
  defaultValue?: Option;
  placeholder?: string;
  options?: Option[];
  type?: string;
  as?: string;
  props?: any;
};

export type Option = {
  label: string;
  value: string;
};
