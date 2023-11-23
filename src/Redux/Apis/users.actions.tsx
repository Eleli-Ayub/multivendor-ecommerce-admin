import { axiosService } from '../helpers/axios';

// export const ApproveUser = async (id: string): Promise<any> => {
//     try {
//         const response = await axiosService.post(`user/auth/approveuser?id='${id}'`);
//         return response;
//     } catch (error: any) {
//         console.error(error);
//         throw new Error();
//     }
// };

// export const RevokeUser = async (id: string): Promise<any> => {
//     try {
//         const response = await axiosService.post(`user/auth/approveuser?id=${id}`);
//         return response;
//     } catch (error: any) {
//         console.error(error);
//         throw new Error();
//     }
// };

export const RegisterUser = async (payload: any): Promise<any> => {
    try {
        const response = await axiosService.post('/user/auth/signup', payload);
        localStorage.setItem('userToken', response.data.token);
        return response;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};
//

export const LoginUser = async (payload: any): Promise<any> => {
    try {
        const response = await axiosService.post('/user/auth/signin', payload);
        localStorage.setItem('userToken', response.data.token);
        return response;
    } catch (error: any) {
        console.log(error, 'a terrible error occurred');
        throw new Error(error.message);
    }
};

export const currentUser = async () => {
    try {
        const response = await axiosService.get('/user/auth/getuser');
        return response;
    } catch (error: any) {
        console.log(error, 'someError');
        throw new Error(error.message);
    }
};

export const loggedInUser = async () => {
    const response = await axiosService.get('/user/auth/getuser');
    return response;
};

export const RegistrationOfUser = async (formdata: any) => {
    const response = await axiosService.post('/admin/register', formdata);
    return response;
};

export const LogginOfUser = async (formdata: any) => {
    const response = await axiosService.post('/admin/login', formdata);
    return response;
};

export const GetUserById = async (id: any) => {
    const response = await axiosService.get(`/user/auth/fetchuser?id=${id}`);
    return response;
};

export const UpdateOfUser = async (userid: any, formdata: any) => {
    const response = await axiosService.post(`/user/auth/updateuser?userid=${userid}`, formdata);
    return response;
};

export const ApproveUser = async (id: string): Promise<any> => {
    try {
        const response = await axiosService.post(`/admin/approveuser?id=${id}`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const RevokeUser = async (id: string): Promise<any> => {
    try {
        const response = await axiosService.post(`/admin/revokeuser?id=${id}`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const getUsers = async () => {
    try {
        const response = await axiosService.get('/admin/fetchusers');
        return response;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getUser = async (id: any) => {
    try {
        const response = await axiosService.get(`/user/auth/fetchuser?id=${id}`);
        return response;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};
