export type LoginFormValues = {
  nomeUsuario: string;
  senha: string;
};

export type RegisterFormValues = {
  nomeUsuario: string;
  senha: string;
  confirmacaoSenha: string;
};

export type AuthFormValues = LoginFormValues | RegisterFormValues;
