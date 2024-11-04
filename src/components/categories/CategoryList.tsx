import React, { useEffect, useState } from 'react'
import { FaPencil, FaPlus, FaTrash } from 'react-icons/fa6';
import { AiOutlineSearch,AiOutlineSortAscending } from 'react-icons/ai';
import AddEditModal from './AddEditModal';
import { Api } from '../api/Index';
import { CATEGORIES, CATEGORIES_ID } from '../api/Endpoints';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { categorySelector } from '../states/Selectors';

interface listProps{
  theme:string
}
export default function CategoryList(props:listProps) {
  const[catType,setCatType]=useState("");
  const [categories,setCategories]=useState([]);
  const [cateId,setCatId]=useRecoilState(categorySelector)
  const getCategories=()=>{
    Api.get(CATEGORIES).then((res)=>{
        setCategories(res.data.results)
    })
  }
  const handleOpenModal=(type:string,item:any|null)=>()=>{
      setCatType(type)
      if(item!=null){
        setCatId({
          name:item.name,
          id:item.id
        })
      }
      const modalElement = document.getElementById('catmodal') as HTMLDialogElement | null;
      modalElement?.showModal();

  }
  const handleDelete=(id:number,name:string)=>()=>{
    Swal.fire({
      title:`آیا میخواهید ${name} حذف شود؟`,
      icon:"error",
      confirmButtonText:"بله",
      cancelButtonText:"نه, بیخیال",
      showCancelButton:true
    }).then((result)=>{
        if(result.isConfirmed){
            Api.delete(CATEGORIES_ID(id)).then((res)=>{
                getCategories()
            })
        }
    })
  }

  useEffect(()=>{
    getCategories()
  },[])
  return (
    <div className={`card-${props.theme} rounded-xl`}>
        <div className="card-body">
          <div className='flex justify-center items-center text-center pb-7 w-full text-xl font-bold '>
             <p >دسته‌بندی‌ها</p>
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
                placeholder='جستجو...'
              />
              <AiOutlineSearch fontSize={20}/>
            </label>
            <button 
                className='btn-blue-outline rounded-xl hover:text-white  btn-sm flex'
                onClick={handleOpenModal("add",null)}
            >
              <FaPlus/>
              افزودن
            </button>
          </div>
          <table className="table table-zebra border-x border-base-300">
         
            <thead>
              <tr className='text-sm text-center'>
                <th>#</th>
                <th>نام</th>
                <th>تعداد پست‌ها</th>
                <th>گزینه‌ها</th>
              </tr>
            </thead>
            <tbody>
              {/* row 3 */}
              {categories?.map((item:any,idx:number)=>(
                <tr className='text-center' key={idx}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.post_count}</td>
                  <td className="flex gap-2 justify-center items-center">
                        <button 
                            className='btn-blue-outline btn-sm rounded-xl flex'
                            onClick={handleOpenModal("edit",item)}
                        >
                          <FaPencil/>
                          ویرایش
                        </button>
                        <button className='btn-red-outline rounded-xl btn-sm flex' onClick={handleDelete(item.id,item.name)}>
                          <FaTrash/>
                          حذف
                        </button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
          <div className="flex justify-center items-center px-10 bg-base-300  py-5 rounded-b-lg w-full">
              <div className="join border border-blue-600 rounded-xl">
                <button className="join-item btn-page-blue btn-sm text-base">1</button>
                <button className="join-item btn-page-blue btn-sm text-base">2</button>
                <button className="join-item btn-page-blue btn-sm text-base">3</button>
                <button className="join-item btn-page-blue btn-sm text-base">4</button>
              </div>
          </div>
        </div>
        </div>
        <AddEditModal  type={catType} reload={getCategories}/>
    </div>
  )
}
