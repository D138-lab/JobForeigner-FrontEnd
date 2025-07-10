import { title } from './serviceName';
import { PATH } from './routes';
import { LOCAL_STORAGE } from './storage';

export * from './navItems';
export { PATH, title, LOCAL_STORAGE };

export const API_URL = import.meta.env.VITE_BASE_API_URL as string;
