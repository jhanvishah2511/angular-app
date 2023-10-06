import { environment } from '../../environments/environment';
export const SERVER_HOST_URL = environment.SERVER_HOST;
export const COMMON_URL = {
    REGISTER:`${SERVER_HOST_URL}/register`,
    LOGIN: `${SERVER_HOST_URL}/login`,
    LOGOUT: `${SERVER_HOST_URL}/logout`
}