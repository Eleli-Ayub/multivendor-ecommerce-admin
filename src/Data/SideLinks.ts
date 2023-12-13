import { RxDashboard } from "react-icons/rx";
import { FcAdvertising } from "react-icons/fc";
import { BsPeopleFill } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";

export const AdminSideLinks = [
  {
    name: "Overview",
    url: "/",
    icon: RxDashboard,
  },
  {
    name: "Ads",
    url: "/",
    icon: FcAdvertising,
  },
  {
    name: "Users",
    url: "/users",
    icon: BsPeopleFill,
  },
  {
    name: "Categories",
    url: "/categories",
    icon: TbCategory,
  },
  {
    name: "Main Ads",
    url: "/main_ads",
    icon: TbCategory,
  },


  {
    name: "Packages",
    url: "/packages",
    icon: MdPayment,
  },
  {
    name: "Notifications",
    url: "/notifications",
    icon: MdNotifications,
  },
  {
    name: "Messages",
    url: "/messages",
    icon: BsMessenger,
  },
];
