import { axiosService } from "../helpers/axios";

export const FetchCategories = async () => {
  try {
    const response = await axiosService.get("/categories/getcategories");
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createCategory = async (payload: any): Promise<any> => {
  try {
    const response = await axiosService.post(
      "/categories/addcategory",
      payload
    );
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error();
  }
};

export const deleteCategory = async (CategoryName: any): Promise<any> => {
  try {
    const response = await axiosService.post(
      `/categories/delete/${CategoryName}`
    );
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error();
  }
};
