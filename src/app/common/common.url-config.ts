import { environment } from '../../environments/environment';
export const SERVER_HOST_URL = environment.SERVER_HOST;
export const COMMON_URL = {
    REGISTER:`${SERVER_HOST_URL}/register`,
    LOGIN: `${SERVER_HOST_URL}/login`,
    LOGOUT: `${SERVER_HOST_URL}/logout`,
    USER: `${SERVER_HOST_URL}/user/`,
    USER_EDIT:`${SERVER_HOST_URL}/user/edit/`,
    USER_CREATE:`${SERVER_HOST_URL}/user/create/`,
    USER_VERIFY:`${SERVER_HOST_URL}/user/verify/`,
    PROFILE_PIC:`${SERVER_HOST_URL}/user/profile-pic/`,
    MULTI_UPLOAD: `${SERVER_HOST_URL}/user/multi-upload/`,
    GET_ALL_UPLOADS: `${SERVER_HOST_URL}/user/get-all-uploads/`,
    UPLOAD_DOCS:`${SERVER_HOST_URL}/user/get-all-uploads-docs/`,
    REMOVE_UPLOAD: `${SERVER_HOST_URL}/user/remove-uploads/`,
    CATEGORY_CREATE:`${SERVER_HOST_URL}/category/create/`,
}