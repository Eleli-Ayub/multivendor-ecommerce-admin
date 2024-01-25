// import { Avatar } from "antd";
import { AdminSideLinks } from "../../Data/SideLinks";
// import Image from "../../assets/profile.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/E-duka (3).png";
import control from "../../assets/control.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full  pt-5">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300 overflow-y-scroll no-scrollbar`}
        style={{
          backgroundColor: "#0a2540",
          fill: "#425466",
          height: "98vh",
          maxHeight: "98vh",
          position: "sticky",
          top: "0",
        }}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-8 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center ">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            } logo`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Admin
          </h1>
        </div>
        <ul className="pt-6">
          {AdminSideLinks.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer text-gray-600 hover:bg-primary-orange  hover:text-white text-sm items-center gap-4 bg-white ${"mt-2"} ${
                index === 0 && "bg-light-white"
              }`}
              onClick={() => navigate(`${Menu.url}`)}
            >
              <Menu.icon size="30" className=" hover:text-white" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
      </div>
    </div>
  );
};

export default Sidebar;
