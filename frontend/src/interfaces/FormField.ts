export type FormField = {
  id: string;
  name: string;
  label?: string;
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
