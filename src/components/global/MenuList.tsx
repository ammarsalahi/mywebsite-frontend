import { Input } from "antd";
import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiFillSun,
  AiFillMoon,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { PiNewspaperClipping } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuAtom } from "../states/Atoms";
import { FaHammer, FaHandshake } from "react-icons/fa";
import { PiNewspaperFill } from "react-icons/pi";
import { langSelector, themeSelector, menuSelector, tokenSelector } from "../states/Selectors";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

export default function MenuList() {
  const location = useLocation();
  const [ismenu, setismenu] = useRecoilState(menuSelector);
  const [theme, setTheme] = useRecoilState<any>(themeSelector);
  const { t } = useTranslation();
  const [lang, setLang] = useRecoilState(langSelector);
  const [isUser, setIsUser] = useState(false);
  const [token,setToken]=useRecoilState(tokenSelector);
  let navigate=useNavigate()

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setismenu(false);
  };

  const handleUser = (e: React.MouseEvent<HTMLElement>) => {
    setIsUser(!isUser);
  };
  const handleTheme = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleLang = () => {
    if (lang == "en") {
      setLang("fa");
    } else {
      setLang("en");
    }
  };

  const handleSignout=()=>{
    setToken({
      access:"",
      refresh:"",
      user:""
    })
    navigate("/signin")
  }

  const menus = [
    {
      url: "/posts",
      icon: <PiNewspaperFill fontSize={22} />,
    },
    {
      url: "/projects",
      icon: <FaHammer fontSize={22} />,
    },
    {
      url: "/about",
      icon: <BsEmojiSunglassesFill fontSize={22} />,
    },
    {
      url: "/collaboration",
      icon: <FaHandshake fontSize={22} />,
    },
  ];

  const Usermenus = [
    {
      url: "/settings",
      icon: <IoSettings fontSize={22} />,
    },
    {
      url: "/posts/add",
      icon: <PiNewspaperFill fontSize={22} />,
    },
    {
      url: "/projects/add",
      icon: <FaHammer fontSize={22} />,
    },
    {
      url: "/category",
      icon: <BiCategory fontSize={22} />,
    },
    {
      url: "/about/add",
      icon: <BsEmojiSunglassesFill fontSize={22} />,
    },
    {
      url: "",
      icon: <FiLogOut fontSize={22} />,
    },
  ];
  return (
    <div
      className={
        theme == "light"
          ? location.pathname == "/"
            ? "bg-blue-600 px-3 h-[87vh]"
            : "px-3 h-screen"
          : location.pathname == "/"
            ? "bg-gray-900 px-3 h-[87vh]"
            : "bg-gray-900 px-3 h-screen"
      }
    >
      <div
        className={
          theme == "light"
            ? location.pathname == "/"
              ? "flex justify-center items-center gap-3 py-2 text-white"
              : " pt-28 flex justify-center items-center gap-3  py-2 text-black"
            : location.pathname == "/"
              ? "flex justify-center items-center gap-3 py-2 text-white"
              : "pt-28 flex justify-center items-center gap-3 py-2 text-white"
        }
      >
        <button className="btn btn-ghost text-lg" onClick={handleUser}>
          {isUser ? <AiOutlineMenu /> : <FaUser />}
        </button>

        <button className="btn btn-ghost text-lg" onClick={handleLang}>
          {lang.toUpperCase()}
        </button>
        <button className="btn btn-ghost text-xl" onClick={handleTheme}>
          {theme == "light" ? <AiFillSun /> : <AiFillMoon />}
        </button>
      </div>
      {location.pathname == "/" && (
        <label className="input  bg-transparent focus:border-white hover:border-white border-white rounded-full input-bordered flex items-center gap-2 my-6">
          <AiOutlineSearch fontSize={20} color="white" />
          <input
            type="text"
            className="grow text-white"
            placeholder="جستجو..."
          />
        </label>
      )}
      <ul
        className={
          theme == "dark" || location.pathname == "/"
            ? "list-none text-white pt-3"
            : "list-none pt-3"
        }
        dir={t("dir")}
      >
        {isUser
          ? Usermenus.map((item: any, idx: number) => (
              <li className="px-4 pb-5 text-lg" onClick={handleMenu} key={idx}>
                {item.url.length>0?<Link to={item.url} className="flex items-center gap-2">
                  {item.icon}
                  {t(`user${idx + 1}`)}
                </Link>
                :
                <button className="flex items-center gap-2" onClick={handleSignout}>
                  {item.icon}
                  {t(`user${idx + 1}`)}
                </button>}
              </li>
            ))
          : menus.map((item: any, idx: number) => (
              <li className="px-4 pb-7 text-lg" onClick={handleMenu} key={idx}>
                <Link to={item.url} className="flex items-center gap-2">
                  {item.icon}
                  {t(`menu${idx + 1}`)}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
