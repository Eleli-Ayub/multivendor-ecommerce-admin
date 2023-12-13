type ProductData = {
  isapproved: boolean;
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
  isactive: boolean;
  isdeleted: boolean
  issuspended: boolean
  lastupdated:string
  activeuntil:string
  latestinteractions:string
  UpdatedAt:string
  DeletedAt:string
  CreatedAt:string
  dateadded:string
  totalbookmarks:number
  totalcomments:number
  totalinteractions:number
  totallikes:number
};


export interface userProps {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phonenumber: string;
  password: string;
}

export interface adminProps {
  adminname:string
}