type ProductData = {
  productname: string;
  productdescription: string;
  productprice: string;
  quantity: number;
  mainimage: string;
  category: string;
  subcategory: string;
  producttype: string;
  brand: string;
  productimages: File[] | [] | any[];
  producttid: string;
};


export interface userProps {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phonenumber: string;
  password: string;
}