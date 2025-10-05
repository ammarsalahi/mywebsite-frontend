import React, { useEffect, useState } from "react";
import PostCard from "../posts/PostCard";
import Footer from "../global/Footer";
import { Api } from "../api/Index";
import { CATEGORIES, POST_SEARCH_FILTER } from "../api/Endpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filterSelector,
  langSelector,
  pageLoadSelector,
  postSearchSelector,
  themeSelector,
} from "../states/Selectors";
import { Spin } from "antd";
import EmptyList from "../global/EmptyList";
// import LoadMotion from '../global/LoadMotion'
import { TfiReload } from "react-icons/tfi";
import { BiCategory } from "react-icons/bi";
import {
  AiOutlineSearch,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { PiFireFill, PiNewspaperFill } from "react-icons/pi";
import { MdFilterList } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { FaArrowUp } from "react-icons/fa6";
import { Post } from "../types";
import { LuMinimize2,LuMaximize2 } from "react-icons/lu";

export default function Posts() {
  // let navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<any>([]);
  const [postsearch, setPostSearch] = useRecoilState(postSearchSelector);
  const [search, setSearch] = useState("");
  const [_,setpageLoad] = useRecoilState(pageLoadSelector);
  const [next, setNext] = useState<number | null>(null);
  const { t } = useTranslation();
  const lang = useRecoilValue(langSelector);
  const [filters, setFilters] = useRecoilState(filterSelector);
  const [isLoad, setisLoad] = useState(false);
  const theme = useRecoilValue(themeSelector);
  const [ismin,setIsMin]  = useState(false)

  const modalElement = document.getElementById(
    "searchmodal",
  ) as HTMLDialogElement | null;

  const handleFilters = (name: string, value: boolean) => () => {
    setFilters({ ...filters, [name]: value });
    sortDataByCreatedAt(filters.assort);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handlePostSearch = () => {
    setPostSearch(search);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handlePostSearch();
    }
  };
  const handleOpenModal = () => {
    modalElement?.showModal();
  };

  const handleClose = () => {
    modalElement?.close();
  };
  const getFilters = async () => {
    setisLoad(false);
    await Api.get(POST_SEARCH_FILTER(postsearch, next?next:1))
      .then((res) => {
        setPosts(res.data.results);
        setNext(res.data.next_page_number);
      })
      .finally(() => {
        setisLoad(true);
      });
  };
  const getCategory = async () => {
    await Api.get(CATEGORIES).then((res) => {
      setCategories(res.data.results);
    });
  };

  const getNextPages = () => {
    if (next != null) {
      Api.get(POST_SEARCH_FILTER(postsearch, next)).then((res) => {
        setPosts((prevPosts: any) => [...prevPosts, ...res.data.results]);
        setNext(res.data.next_page_number);
      });
    }
  };


  const handleCategorySearch = (search: string) => () => {
    setisLoad(false);
    setNext(1)
    Api.get(POST_SEARCH_FILTER(search, next?next:1))
      .then((res) => {
        setPosts(res.data.results);
        setNext(res.data.next_page_number);
      })
      .finally(() => {
        setisLoad(true);
      });
  };
  useEffect(() => {
    getFilters();
    getCategory();
    setpageLoad(true);
    return () => {
      setCategories([]);
      setPosts([]);
    };
  }, [postsearch]);

  const sortDataByCreatedAt = (ascending: boolean) => {
    const sortedData = [...posts].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (ascending) {
        return dateA - dateB; // Ascending order
      } else {
        return dateB - dateA; // Descending order
      }
    });

    setPosts(sortedData);
  };
  useEffect(() => {
    sortDataByCreatedAt(filters.assort);
  }, [filters.assort]);

  const [scrollY, setScrollY] = useState<number>(1);
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll > 0) {
        // Calculate the scroll percentage and map it to a range of 1-100
        const scrollPercent = (window.scrollY / maxScroll) * 100;
        const clampedScrollY = Math.min(Math.max(scrollPercent, 1), 100);
        setScrollY(clampedScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  };

  return (
    <div>
      {isLoad ? (
        <>
          <div className="paddingtop">
            {posts.length>0
            &&<div className={scrollY > 30 ? " hidden md:block fixed z-20" : "hidden"}>
              <ul className={`filter-${theme}-menu text-blue-500`}>
                <li>
                  <button className="text-xl" onClick={handleOpenModal}>
                    <AiOutlineSearch />
                  </button>
                </li>
                <li>
                  <button
                    className="text-xl"
                    onClick={handleFilters("news", !filters.news)}
                  >
                    <PiFireFill
                      className={filters.news ? "text-orange-500" : ""}
                    />
                  </button>
                </li>
                <li>
                  <button
                    className="text-2xl "
                    onClick={handleFilters("assort", !filters.assort)}
                  >
                    {filters.assort ? (
                      <AiOutlineSortAscending className="text-green-500" />
                    ) : (
                      <AiOutlineSortDescending className="text-red-500" />
                    )}
                  </button>
                </li>
                 <li>
                    <a className="text-xl" onClick={scrollToTop}>
                      <FaArrowUp />
                    </a>
                  </li>
              </ul>
            </div>}
           {posts.length>0&& <div
              className={
                scrollY > 10  && posts.length>0
                  ? "md:hidden  fixed bottom-3 right-3 left-3 w-100 shadow-lg z-20"
                  : "hidden"
              }
              
            >
              {ismin?
                <ul className={`  flex justify-center items-center w-14 cursor-pointer 
                    ${theme=="dark"?"bg-gray-900":"bg-white"} 
                     border-2 border-blue-500 text-blue-500 rounded-2xl shadow-lg`}
                >
                  <li>
                  <a className="btn btn-ghost rounded-xl" onClick={()=>setIsMin(!ismin)}>
                    <LuMaximize2 fontSize={25} />
                  </a>
                </li>
                </ul>
              :<ul className={`menu menu-horizontal menu-sm
                  ${theme=="dark"?"bg-gray-900":"bg-white"}  
                  border border-blue-500 text-blue-500 rounded-2xl shadow-lg 
                    w-full flex justify-between items-center`}
                 >
                <li>
                  <a onClick={()=>setIsMin(!ismin)}>
                    <LuMinimize2 fontSize={29}/>
                  </a>
                </li>
                <li>
                  <a onClick={handleOpenModal}>
                    <AiOutlineSearch fontSize={28} />
                  </a>
                </li>
                <li >
                  <a
                    onClick={handleFilters("news", !filters.news)}
                  >
                    <PiFireFill
                      fontSize={28}
                      className={filters.news ? "text-orange-600" : ""}
                    />
                  </a>
                </li>
                <li>
                <a
                    onClick={handleFilters("assort", !filters.assort)}
                  >
                    {filters.assort ? (
                      <AiOutlineSortAscending fontSize={30} className="font-bold text-success"/>
                    ) : (
                      <AiOutlineSortDescending fontSize={30} className="font-bold text-red-500" />
                    )}
                  </a>
                </li>
                  <li>
                    <a onClick={scrollToTop}>
                      <FaArrowUp fontSize={27}/>
                    </a>
                  </li>
              </ul>}
            </div>}
            <p className="text-center pb-8 text-4xl text-blue-600 font-bold flex justify-center items-center gap-2">
              {lang == "fa" && <PiNewspaperFill fontSize={40} />}
              {t("menu1")}
              {lang == "en" && <PiNewspaperFill fontSize={40} />}
            </p>

            <div className="md:flex justify-center items-center px-0 md:px-10 lg:px-40 gap-2">
              <div
                className={`card-${theme} border-2 border-blue-500 rounded-full`}
              >
                <div className="p-1 flex gap-0 w-full">
                  <label
                    className="input input-ghost input-sm w-full  md:w-[400px] lg:w-[650px] border-0 rounded-full flex items-center gap-2"
                    dir={t("dir")}
                  >
                    <AiOutlineSearch className="text-2xl " />
                    <input
                      type="text"
                      className="grow"
                      placeholder={t("search")}
                      dir={t("dir")}
                      value={search}
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                    />
                    {search.length > 0 && (
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={handlePostSearch}
                      >
                        {lang == "fa" ? (
                          <FaArrowLeft className="text-xl" />
                        ) : (
                          <FaArrowRight className="text-xl" />
                        )}
                      </button>
                    )}
                    <div className="dropdown dropdown-right dropdown-hover hidden md:block">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-sm rounded-full "
                      >
                        <MdFilterList />
                        {t("filters")}
                      </div>
                      <ul
                        tabIndex={0}
                        className={
                          theme == "dark"
                            ? "drop-items bg-gray-900 text-white"
                            : "drop-items bg-white text-black"
                        }
                      >
                        <li>
                          <button
                            className="text-orange-600 text-base hover:bg-orange-500 hover:text-white rounded-2xl"
                            onClick={handleFilters("news", !filters.news)}
                          >
                            <PiFireFill />
                            {t("newest")}
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-green-600 text-base hover:bg-green-500 hover:text-white rounded-2xl"
                            onClick={handleFilters("assort", true)}
                          >
                            <AiOutlineSortAscending />
                            {t("asc")}
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-red-600 text-base hover:bg-red-500 hover:text-white rounded-2xl"
                            onClick={handleFilters("assort", false)}
                          >
                            <AiOutlineSortDescending />
                            {t("desc")}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="category-show py-4">
              {categories.length > 0 && (
                <div
                  className="flex flex-wrap justify-center gap-3 pt-3"
                  dir={t("dir")}
                >
                  <button
                    className="mini-item px-5 flex gap-2 items-center"
                    onClick={handleCategorySearch("")}
                  >
                    <BiCategory fontSize={20} />
                    {t("all")}
                  </button>
                  {categories?.map((item: any, idx: number) => (
                    <button
                      className="mini-item px-5 flex gap-2 items-center"
                      key={idx}
                      dir={t("dir")}
                      onClick={handleCategorySearch(item.name)}
                    >
                      <BiCategory fontSize={20} />
                      {lang == "fa" ? item.name : item.english_name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              {posts.length > 0 ? (
                <>
                  <div>
                    <div className="post-card  md:px-8 lg:px-20" dir={t("dir")}>
                      {posts?.map((item: any, idx: number) => (
                        <div className="py-2 z-0" key={idx}>
                          <PostCard
                            post={item}
                            reload={getFilters}
                            theme={theme}
                          />
                        </div>
                      ))}
                    </div>
                    {next != null && (
                      <div className="flex justify-center py-10">
                        <button
                          className="btn-blue w-36 gap-3 rounded-2xl font-bold text-xl"
                          onClick={getNextPages}
                        >
                          <TfiReload />
                          {t("more")}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <EmptyList name="nopost" />
              )}
            </div>
            <dialog id={"searchmodal"} className="modal">
              <div
                className={`h-auto
                  ${theme == "dark"
                    ? "modal-box py-5 bg-base-200"
                    : "modal-box py-5  bg-white"}`
                }
              >
                <div className="flex justify-end ps-5 items-center">
                  <button
                    className="btn btn-circle btn-ghost text-2xl"
                    onClick={handleClose}
                  >
                    <CgClose />
                  </button>
                </div>
                <div className="py-5 md:py-10 md:px-5 space-y-6">
                  <p className="text-2xl text-center font-semibold">
                    {t("postsearch")}
                  </p>
                  <label
                    className="input input-bordered  w-full rounded-2xl flex items-center gap-2"
                    dir={t("dir")}
                  >
                    <AiOutlineSearch className="text-2xl " />
                    <input
                      type="text"
                      className="grow"
                      placeholder={t("search")}
                      value={search}
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                    />
                    {search.length > 0 && (
                      <button
                        className="btn btn-sm btn-ghost hidden md:block"
                        onClick={handlePostSearch}
                      >
                        {lang == "fa" ? (
                          <FaArrowLeft className="text-xl" />
                        ) : (
                          <FaArrowRight className="text-xl" />
                        )}
                      </button>
                    )}
                  </label>
                  {search.length > 0 && (
                      <button
                        className="mt-3 btn-blue w-full md:hidden"
                        onClick={handlePostSearch}
                      >
                        {t("agree")}
                        {lang == "fa" ? (
                          <FaArrowLeft className="text-xl" />
                        ) : (
                          <FaArrowRight className="text-xl" />
                        )}
                      </button>
                    )}
                </div>
              </div>
            </dialog>
          </div>
          <Footer />
        </>
      ) : (
        <div className="h-screen w-screen grid place-items-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}
