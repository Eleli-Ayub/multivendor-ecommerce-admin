import { axiosService } from '../helpers/axios';

export const FetchCategories = async () => {
    try {
        const response = await axiosService.get('/categories/getcategories');
        return response;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const createCategory = async (payload: any): Promise<any> => {
    try {
        const response = await axiosService.post('/categories/addcategory', payload);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const EditCategory = async (payload: any): Promise<any> => {
    try {
        const response = await axiosService.put(`/categories/update`, payload);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const EditSubCategory = async (payload: any): Promise<any> => {
    try {
        const response = await axiosService.put(`/subcategories/update`, payload);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const deleteCategory = async (CategoryId: any): Promise<any> => {
    try {
        const response = await axiosService.post(`/categories/delete/${CategoryId}`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};

export const deleteSubCategory = async (SubCategoryId: any): Promise<any> => {
    try {
        const response = await axiosService.post(`/subcategories/delete/${SubCategoryId}`);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error();
    }
};
