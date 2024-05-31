import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../lib/axios';
import { LoginFormValues, RegisterFormValues } from '../types/auth';

interface AuthContextData {
  accessToken: string | null;
  logout: () => void;
  updateAuth: () => void;
  login: (values: LoginFormValues) => Promise<void>;
  register: (values: RegisterFormValues) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface IProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateAuth = () => {
    setAccessToken(localStorage.getItem('accessToken'));
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
  };

  const login = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const { data } = await api.post<LoginResponse>('auth/login', values);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setAccessToken(data.accessToken);
    } catch (err: any) {
      toast.error(err.response.data.error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      const { data } = await api.post<LoginResponse>('auth/register', values);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setAccessToken(data.accessToken);
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(updateAuth, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoading,
        updateAuth,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
