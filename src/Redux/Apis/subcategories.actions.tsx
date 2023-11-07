import { axiosService } from "../helpers/axios";

export const FetchSubcategories = async () => {
  try {
    const response = await axiosService.get("/subcategories/getsubcategories");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createSubcategory = async (payload: any): Promise<any> => {
  try {
    const response = await axiosService.post(
      "/subcategories/addsubcategory",
      payload
    );
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error();
  }
};
