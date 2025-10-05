import React, { useState, useEffect } from "react";
import {
  AiFillSun,
  AiFillMoon,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuAtom } from "../states/Atoms";
import { AiOutlineMenu } from "react-icons/ai";
import {
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
import UserMenu from "./UserMenu";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  const [ismenu, setismenu] = useRecoilState(menuAtom);
  const [theme, setTheme] = useRecoilState<any>(themeSelector);
  const [lang, setLang] = useRecoilState<string>(langSelector);
  const [search, setSearch] = useState("");
  const token = useRecoilValue(tokenSelector);
  const { t } = useTranslation();

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
 console.log("navbar")
  return (
    <>
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
                    width={30}
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
                  <AiOutlineClose fontSize={28} />
                ) : (
                  <AiOutlineMenu fontSize={30} />
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
         
          {location.pathname.startsWith("/search") && <SearchBar />}
        </div>
      </div>
    </>
  );
}
