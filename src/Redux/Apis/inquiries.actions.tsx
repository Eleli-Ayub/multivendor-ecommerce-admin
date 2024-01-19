import axios from 'axios';
import { toast } from 'react-toastify';
const url = 'https://inquiries.vercel.app/inquiries';

export const createInquiry = async (payload: any): Promise<any> => {
    try {
        const response = await axios.post(`${url}/inquire`, payload);
        toast.success('Your inquiry has been sent...');
        return response;
    } catch (error: any) {
        toast.error('Please fill in all the fields');
        console.error(error);
        throw new Error();
    }
};

export const GetInquiries = async (): Promise<any> => {
    try {
        const response = await axios.get(`${url}/all`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const GetInquiry = async (id: any): Promise<any> => {
    try {
        const response = await axios.get(`${url}/inquiry/${id}`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const MarkAsRead = async (id: any): Promise<any> => {
    try {
        const response = await axios.patch(`${url}/read/${id}`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const DeleteInquiry = async (id: any): Promise<any> => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        toast.success('Deleted successfully...');
        return response.data;
    } catch (error: any) {
        toast.success('Error deleting');
        console.error(error);
        throw new Error();
    }
};
