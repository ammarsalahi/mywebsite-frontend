import React, { useState, useEffect } from "react";
import {
  AiFillSun,
  AiFillMoon,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SiDjango,
  SiFastapi,
  SiHtml5,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuAtom } from "../states/Atoms";
import { AiOutlineMenu } from "react-icons/ai";
import PostFilter from "../posts/PostFilter";
import ProjectFilters from "../projects/ProjectFilters";
import {
  imgurlSelector,
  langSelector,
  tokenSelector,
} from "../states/Selectors";
import logoblack from "../../assets/logo-dark.png";
import logolight from "../../assets/logo-light.png";
import { themeSelector } from "../states/Selectors";
import iconlight from "../../assets/icon-light.png";
import iconblack from "../../assets/newicon.png";
import NavMenu from "./NavMenu";
import NavDropDownMenu from "./NavDropDownMenu";
import SearchBar from "./SearchBar";
import { motion, Variants } from "framer-motion";
import { FaGolang, FaUser } from "react-icons/fa6";
import UserMenu from "./UserMenu";
import { GrGolang } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import LanguageSync from "./LanguageSync";

export default function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  const [ismenu, setismenu] = useRecoilState(menuAtom);
  const imgurl = useRecoilValue(imgurlSelector);
  const [theme, setTheme] = useRecoilState<any>(themeSelector);
  const [lang, setLang] = useRecoilState<string>(langSelector);
  const [search, setSearch] = useState("");
  const token = useRecoilValue(tokenSelector);
  const { t } = useTranslation();

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // تأخیر برای هر حرف
        duration: 0.3,
      },
    }),
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // تأخیر بین حروف
      },
    },
  };
  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setismenu(!ismenu);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };
  const handleOnClick = () => {
    navigate(`/search/${search}`);
    setSearch("");
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {/* <LanguageSync/> */}
      <div
        className={
          theme == "light"
            ? location.pathname == "/"
              ? "nav-blue text-white"
              : "nav-light-fixed"
            : location.pathname == "/"
              ? "nav-dark"
              : "nav-dark-fixed"
        }
        style={{ zIndex: 9999 }}
      >
        <nav className="navbar items-center ">
          <div className="navbar-start">
            <div className="logo-menu pt-1">
              <Link to="/">
                <img
                  src={
                    location.pathname == "/" || theme == "dark"
                      ? logolight
                      : logoblack
                  }
                  width={170}
                />
              </Link>
            </div>
            <div className="logo-mobile">
              <Link to="/">
                <button className="btn btn-ghost">
                  <img
                    src={
                      location.pathname == "/" || theme == "dark"
                        ? iconlight
                        : iconblack
                    }
                    width={35}
                  />
                </button>
              </Link>
            </div>
          </div>
          <div
            className={
              theme == "dark" || location.pathname == "/"
                ? "hidden lg:block navbar-center text-white"
                : "hidden lg:block navbar-center text-black"
            }
          >
            <div className="list-menus">
              <NavMenu />
            </div>
          </div>
          <div
            className={
              theme == "dark" || location.pathname == "/"
                ? "navbar-end text-white"
                : "navbar-end text-black"
            }
          >
            <div className="menu-mobile">
              <button className="btn btn-ghost" onClick={handleMenu}>
                {ismenu ? (
                  <AiOutlineClose fontSize={30} />
                ) : (
                  <AiOutlineMenu fontSize={35} />
                )}
              </button>
            </div>
            <div className="hidden md:flex gap-1 pt-2">
              <div className="drop-menus">
                <NavDropDownMenu path={location.pathname} theme={theme} />
              </div>
              {location.pathname == "/" && (
                <>
                  <div className="dropdown dropdown-bottom">
                    <label className="input input-sm bg-transparent  hover:border-white border-white rounded-full input-bordered flex items-center gap-2">
                      <AiOutlineSearch fontSize={20} color="white" />
                      <input
                        type="text"
                        className="grow text-white"
                        placeholder={t("search")}
                        value={search}
                        onChange={handleSearch}
                        onKeyDown={handleSubmit}
                      />
                    </label>
                    {search.length > 0 && (
                      <ul
                        tabIndex={0}
                        className=" mt-2 dropdown-content menu bg-white text-black rounded-xl z-[1] w-56 p-2 shadow"
                      >
                        <li
                          className="p-3 hover:bg-gray-100 rounded-xl cursor-pointer"
                          onClick={handleOnClick}
                        >
                          جستجو برای "{search}"
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}
              <button className="btn btn-ghost btn-sm" onClick={handleLang}>
                {lang.toUpperCase()}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={handleTheme}>
                {theme == "light" ? (
                  <AiFillSun fontSize={20} />
                ) : (
                  <AiFillMoon fontSize={20} color="white" />
                )}
              </button>

              {token.access?.length > 0 ? (
                <UserMenu path={location.pathname} theme={theme} />
              ) : null}
            </div>
          </div>
        </nav>

        <div>
          {location.pathname == "/" && ismenu == false && (
            <div className="py-16 xl:py-28">
              {imgurl !== "" && (
                <div className="grid lg:grid-cols-2 ">
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          delay: 0.3,
                          duration: 0.1,
                          ease: "easeInOut",
                        },
                      }}
                      className="sm:w-20 lg:w-[400px] absolute"
                    >
                      <img src={imgurl} className="rounded-full" />
                    </motion.div>
                    <motion.svg
                      className="sm:w-20 lg:w-[400px]"
                      fill="transparent"
                      viewBox="0 0 506 506"
                      xmlns={"https://www.w3.org/2000/svg"}
                    >
                      <motion.circle
                        cx="253"
                        cy="253"
                        r="250"
                        stroke="#fff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ strokeDasharray: "24 10 0 0" }}
                        animate={{
                          strokeDasharray: [
                            "15 120 25 25",
                            "16 25 92 72",
                            "4 250 22 22",
                          ],
                          rotate: [120, 360],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </motion.svg>
                  </div>
                  <div className="text-center text-white lg:pt-20 xl:pt-20 md:pt-10 ">
                    <p className="text-6xl">{t("name")}</p>
                    <p className="text-5xl mt-10">{t("job")}</p>
                    <div className="flex flex-wrap justify-center items-center gap-7 md:gap-5 px7 px-0">
                      <Link to="https://www.python.org" target="black">
                        <SiPython
                          fontSize={40}
                          className="hover:text-indigo-900"
                        />
                      </Link>
                      <Link to="https://www.djangoproject.com" target="black">
                        <SiDjango
                          fontSize={40}
                          className=" hover:text-green-900"
                        />
                      </Link>
                      <Link to="https://fastapi.tiangolo.com/" target="black">
                        <SiFastapi
                          fontSize={40}
                          className=" hover:text-green-400"
                        />
                      </Link>
                      <Link to="https://go.dev/" target="black">
                        <FaGolang fontSize={65} />
                      </Link>
                      <Link to="https://react.dev/" target="black">
                        <SiReact
                          fontSize={40}
                          className="hover:text-blue-900"
                        />
                      </Link>
                      <Link to="https://www.typescriptlang.org/" target="black">
                        <SiTypescript
                          fontSize={40}
                          className="hover:text-indigo-900"
                        />
                      </Link>
                      <Link
                        to="https://en.wikipedia.org/wiki/HTML5"
                        target="black"
                      >
                        <SiHtml5
                          fontSize={40}
                          className=" hover:text-orange-600"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* {location.pathname=='/posts' &&
          <PostFilter/>
      }

      {location.pathname=='/projects' &&
          <ProjectFilters/>
      }  */}
          {location.pathname.startsWith("/search") && <SearchBar />}
        </div>
      </div>
    </>
  );
}
