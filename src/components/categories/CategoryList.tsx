import React, { useEffect, useState } from 'react'
import { FaPencil, FaPlus, FaTrash } from 'react-icons/fa6';
import { AiOutlineSearch,AiOutlineSortAscending } from 'react-icons/ai';
import { Api } from '../api/Index';
import { CATEGORIES_ID, CATEGORIES_PAGE } from '../api/Endpoints';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categorySelector, langSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';
import AddEditCategory from './AddEditCategory';
import DeleteModal from '../global/DeleteModal';
import { TfiReload } from 'react-icons/tfi';
import { Category } from '../types';


interface listProps{
  theme:string
}
export default function CategoryList(props:listProps) {
  const[catType,setCatType]=useState("");
  const [categories,setCategories]=useState<Category[]>([]);
  const [catId,setCatId]=useRecoilState(categorySelector)
  
  const {t} = useTranslation();
  const lang=useRecoilValue(langSelector)
  const [page,setPage]=useState(1);
  const [nextmob,setNextMob] = useState(1)
  const [isPage,setIsPage]=useState({
    next:null,
    prev:null,
    count:0
  })

 

  const getCategories=async()=>{
    await Api.get(CATEGORIES_PAGE(page)).then((res)=>{
        setCategories(res.data.results)
        if(res.data.next_page_number!=null){
          setNextMob(res.data.next_page_number)
          }       
          setIsPage({
          next:res.data.next_page_number,
          prev:res.data.prev_page_number,
          count:res.data.count
        })
    })
  }
  const handleOpenModal=(type:string,item:any|null)=>()=>{
      setCatType(type)
      if(item!=null){
        setCatId({
          name:item.name,
          english:item.english_name,
          id:item.id
        })
      }
      const modalElement = document.getElementById('catmodal') as HTMLDialogElement | null;
      modalElement?.showModal();
  }


  const handlePageChange=(num:number)=>()=>{
    setPage(num)
    // getCategories()
  }
 
  const getNextPages = () => {
      if (isPage.next != null) {

        Api.get(CATEGORIES_PAGE(nextmob)).then((res) => {
          setCategories((prevcat: any) => [...prevcat, ...res.data.results]);
          if(res.data.next_page_number!=null){
          setNextMob(res.data.next_page_number)
          }
          setIsPage({
            next:res.data.next_page_number,
            prev:res.data.prev_page_number,
            count:res.data.count
          })
        });
      }
  };

  useEffect(()=>{
    getCategories()
  },[page]);



   let modalElement = document.getElementById('delmodal') as HTMLDialogElement | null;
  
    const handleShowDelete=(item:any)=>()=>{
      if(item!=null){
        setCatId({
          name:item.name,
          english:item.english_name,
          id:item.id
        })
      }
      modalElement = document.getElementById('delmodal') as HTMLDialogElement | null;
      modalElement?.showModal();
    }
    const handleClose=()=>{
      getCategories()
      modalElement?.close()
    }

    const handleDelete=()=>{
      Api.delete(CATEGORIES_ID(catId.id)).then((res)=>{
                getCategories()
      })
      handleClose()
    }


  return (
    <div className='w-full'>
    <div className={`hidden md:block card-${props.theme} rounded-xl`} dir={t('dir')}>
        <div className="card-body px-0 pt-5 pb-0">
          <div className='flex justify-center items-center text-center pb-7 w-full text-xl font-bold '>
             <p>{t('cates')}</p>
          </div>

        <div className="overflow-x-auto">
        <div className="flex justify-between items-center px-10 bg-base-300  p-3 rounded-t-lg w-full">
            {/* <input className="input input-bordered input-sm rounded-xl"/> */}
            <button className='btn btn-ghost btn-sm'>
              <AiOutlineSortAscending className='text-2xl text-blue-600'/>
            </button>
            <label className='input input-bordered  input-sm rounded-xl flex items-center w-80'>
              <input 
                className='grow'
                placeholder={t('search')}
              />
              <AiOutlineSearch fontSize={20}/>
            </label>
            <button 
                className='btn-blue-outline rounded-xl hover:text-white  btn-sm flex'
                onClick={handleOpenModal("add",null)}
            >
              <FaPlus/>
              {t('add')}
            </button>
          </div>
          <table className="table table-zebra border-x border-base-300">
         
            <thead>
              <tr className='text-sm text-center'>
                <th>#</th>
                <th>{t('cname')}</th>
                <th>{t('englishname')}</th>
                <th>{t('postcount')}</th>
                <th>{t('catoption')}</th>
              </tr>
            </thead>
            <tbody>
              {/* row 3 */}
              {categories?.map((item:any,idx:number)=>(
                <tr className='text-center' key={idx}>
                  <th>{idx+1}</th>
                  <td>{item.name}</td>
                  <td>{item.english_name}</td>
                  <td>{item.post_count}</td>
                  <td className="flex gap-2 justify-center items-center">
                        <button 
                            className='btn-blue-outline btn-sm rounded-xl flex'
                            onClick={handleOpenModal("edit",item)}
                        >
                          <FaPencil/>
                          {t('edit')}
                        </button>
                        <button 
                          className='btn-red-outline rounded-xl btn-sm flex' 
                          onClick={handleShowDelete(item)}
                        >
                          <FaTrash/>
                          {t('delete')}
                        </button>
                  </td>
                   
                </tr>
              ))}
              
            </tbody>
          </table>
          <div className="flex justify-center items-center bg-base-300  py-4 rounded-b-lg w-full">
          {isPage.count>5 &&<div className="join border border-blue-600 rounded-xl" dir='ltr'>
              
              
                {isPage.prev!=null && <button className="join-item btn-page-blue btn-sm text-base"
                   onClick={handlePageChange(isPage.prev)}
                  >{`<<`}</button>}

                 <button className="join-item btn-ghost btn-sm text-base">{page}</button>  
                 {isPage.next!=null &&<button className="join-item btn-page-blue btn-sm text-base"
                  onClick={handlePageChange(isPage.next)}
                >{`>>`}</button>}
              
              
              </div>}
          </div>
        </div>
        </div>
    </div>
    <div className='block md:hidden pt-4'>
      <div className='flex justify-center items-center text-center pb-7 w-full text-xl font-bold '>
             <p>{t('cates')}</p>
      </div>
    <div className=' flex flex-col justify-center gap-y-4 items-center  '>
      {categories?.map((item:any,idx:number)=>(
          <div className={`mini-card-${props.theme} !w-full`} key={idx}>
              <div className="card-body p-4 text-base">
                <div className="flex justify-between">
                   <div className='flex flex-col justify-start !text-start '>
                    <p>{t('cname')} : {item.name}</p>
                    <p>{t('englishname')} : {item.english_name}</p>
                    <p>{t('postcount')} : {item.post_count}</p>
                   </div>
                   <div className="flex flex-col gap-2 justify-center items-center">
                        <button 
                            className='btn-blue-outline rounded-xl'
                            onClick={handleOpenModal("edit",item)}
                        >
                          <FaPencil/>
                        </button>
                        <button className='btn-red-outline rounded-xl' onClick={handleShowDelete(item)}>
                          <FaTrash/>
                        </button>
                   </div>
                </div>
                
              </div>
               
          </div>
      ))}
    </div>
        {isPage.count>5 && isPage.count > categories.length && (
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

        <div className={`fixed bottom-5 ${lang=="fa" ?"right-8":"left-8"}`}>
            <button 
              className='btn rounded-3xl btn-success  shadow-lg border border-success'
              onClick={handleOpenModal("add",null)}
            >
              <FaPlus fontSize={30} className='font-bold text-white'/>
            </button>
        </div>

      <AddEditCategory  type={catType} reload={getCategories}/>
        <DeleteModal
          type="catetype" 
          name={catId.name} 
          engname={catId.english_name} 
          close={handleClose} 
          delete={handleDelete}
        />
    </div>
  )
}
