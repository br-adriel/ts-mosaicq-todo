import axios from 'axios';
import { attachAccessToken } from './request-interceptors';
import { refreshTokensWhen401 } from './response-interceptors';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(attachAccessToken, undefined);

api.interceptors.response.use(undefined, refreshTokensWhen401);

export { api };
