import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { BiImageAdd } from "react-icons/bi";



export interface MenuItem {
  path: string;
  title: string;
  icon?: IconType;
  childrens?: MenuItem[];
}


const menu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: FaTh,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: BiImageAdd,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: FaRegChartBar,
    path: "/account",
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: FaCommentAlt,
    path: "/contact-us",
  },
];

export default menu;