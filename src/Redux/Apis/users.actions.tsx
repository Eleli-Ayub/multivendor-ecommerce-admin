import { axiosService } from "../helpers/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  userid: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  token: string;
  phone: string;
  password: string;
  userimage: string;
  location: string;
  noofproducts: number;
  packagetype: string;
  activeads: number;
  inactiveads: number;
  deletedads: number;
  usertype: string;
  isapproved: boolean;
  totallikes: number;
  totalviews: number;
  datejoined: string;
  lastlogin: string;
  lastinteraction: string;
  notifications: number;
}

export interface FetchUsersResponse {
  users: User[];
}

export const RegistrationOfUser = async (formdata: any) => {
  const response = await axiosService.post("/admin/auth/signup", formdata);
  return response.data;
};

export const LogginOfUser = async (
  formdata: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosService.post("/admin/auth/signin", formdata);
  return response.data;
};

export const getUsers = async (): Promise<FetchUsersResponse> => {
  const response = await axiosService.get("/admin/panel/fetchusers");
  return response.data;
};

export const GetUserById = async (id: string) => {
  const response = await axiosService.get(`/users/fetchuser?id=${id}`);
  return response.data;
};

export const UpdateOfUser = async (userid: string, formdata: any) => {
  const response = await axiosService.post(
    `/users/updateuser?userid=${userid}`,
    formdata
  );
  return response.data;
};

export const loggedInUser = async () => {
  const response = await axiosService.get("/admin/panel/fetchusers");
  return response.data;
};

export const ApproveUser = async (id: string) => {
  const response = await axiosService.put(`/admin/panel/approveuser/${id}`);
  return response.data;
};

export const RevokeUser = async (id: string) => {
  const response = await axiosService.put(`/admin/panel/revokeuser/${id}`);
  return response.data;
};
