import React, { useEffect, useState } from 'react'
import { Button} from 'antd'
import VerticalCard from '../posts/VerticalCard'
import { useParams } from 'react-router-dom'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { POST_CATEGORY } from '../api/Endpoints'
import { Spin } from 'antd';
import PostEmpty from '../global/PostEmpty'
import LoadMotion from '../global/LoadMotion'
import { useRecoilState, useRecoilValue } from 'recoil'
import { filterSelector, pageLoadSelector, themeSelector } from '../states/Selectors'
import { Post } from '../types'
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { PiFireFill } from 'react-icons/pi'
import { FaArrowUp } from 'react-icons/fa6'

export default function Categories() {

    const [posts,setPosts]=useState<Post[]>([])
    const {name}:any =useParams();    
    const [isLoad,setisLoad]=useState(false);
    const [next, setNext] = useState<number | null>(null);
    
    const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
    const theme =useRecoilValue(themeSelector)
    const [filters, setFilters] = useRecoilState(filterSelector);

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

    const handleFilters = (name: string, value: boolean) => () => {
    setFilters({ ...filters, [name]: value });
    sortDataByCreatedAt(filters.assort);
    };
    const getFilters = async () => {
        setisLoad(false);
        await Api.get(POST_CATEGORY(name, 1))
          .then((res) => {
            setPosts(res.data.results);
            setNext(res.data.next_page_number);
          })
          .finally(() => {
            setisLoad(true);
          });
      };
  
    useEffect(() => {
      getFilters()
      setpageLoad(true)
      return () => {
        setPosts([])
      }
    }, [])

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
        {isLoad ? <>
         <div className='paddingtop'>
                <div className='flex justify-start'>
                  <p className='text-xl'>نتایج برای </p>
                  <p className="text-3xl font-bold mx-2">{name}</p>
                </div> 

                <div className={scrollY > 30 ? " hidden md:block fixed" : "hidden"}>
                              <ul className={`filter-${theme}-menu`}>
                               
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
                            </div>
                            <div
                              className={
                                scrollY > 10
                                  ? "md:hidden  fixed bottom-3 right-3 left-3 w-100 shadow-lg"
                                  : "hidden"
                              }
                              style={{ zIndex: 9999 }}
                            >
                              <ul className="menu menu-horizontal bg-base-300 border-2 border-blue-500 text-blue-500 rounded-box shadow-lg w-full px-2 flex justify-between items-center">
                               
                                <li>
                                  <a
                                    className="text-2xl"
                                    onClick={handleFilters("news", !filters.news)}
                                  >
                                    <PiFireFill
                                      className={filters.news ? "text-orange-500" : ""}
                                    />
                                  </a>
                                </li>
                                <li>
                                <a
                                    className="text-2xl font-bold"
                                    onClick={handleFilters("assort", !filters.assort)}
                                  >
                                    {filters.assort ? (
                                      <AiOutlineSortAscending  className="text-green-500 " />
                                    ) : (
                                      <AiOutlineSortDescending  className="text-red-500" />
                                    )}
                                  </a>
                                </li> 
                                  <li>
                                    <a className="text-2xl" onClick={scrollToTop}>
                                      <FaArrowUp />
                                    </a>
                                  </li>
                              </ul>
                            </div>
            <div>  
               
                {posts.length>0?
                  <>
                  <div className='post-card'>
                    {posts?.map((item:Post,idx:number)=>(
                        <VerticalCard post={item} key={idx} reload={getFilters} theme={theme}/>
                    ))}
                  </div>
                
                  {posts?.length > 4 &&  <div className="flex justify-center py-10">
                    <Button size='large' type='primary' className=' text-lg rounded-full' iconPosition='end'>بیشتر</Button>
                    </div>}
                  
                  
                  </>
                  :
                    <PostEmpty/>
              
                  }
            </div>
         </div>
        <Footer/> 
        </>:
          <div className="h-screen w-screen grid place-items-center">
            <Spin size='large'/>
          </div>
        }
        </div>
  )
}
