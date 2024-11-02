import React from 'react'
import { useRecoilValue } from 'recoil'
import { themeSelector } from '../states/Selectors'
import { FaPencil, FaPlus, FaTrash } from 'react-icons/fa6';
import { AiOutlineSearch,AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';


export default function CategoryList() {
  const theme=useRecoilValue(themeSelector);

  return (
    <div className={`card-${theme} rounded-xl`}>
        <div className="card-body">
          <div className='flex justify-center items-center text-center pb-7 w-full text-xl font-bold '>
             <p >دسته‌بندی‌ها</p>
          </div>

        <div className="overflow-x-auto">
        <div className="flex justify-between items-center px-10 bg-base-200 border border-blue-500 p-3 rounded-t-lg w-full">
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
            <button className='btn-blue-outline rounded-xl hover:text-white  btn-sm flex'>
              <FaPlus/>
              افزودن
            </button>
          </div>
          <table className="table table-zebra border-x border-blue-500">
         
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
              <tr className='text-center'>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td className="flex gap-2 justify-center items-center">
                      <button className='btn-blue-outline btn-sm rounded-xl flex'>
                         <FaPencil/>
                         ویرایش
                      </button>
                      <button className='btn-red-outline rounded-xl btn-sm flex '>
                         <FaTrash/>
                         حذف
                      </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center items-center px-10 bg-base-200 border border-blue-500 py-5 rounded-b-lg w-full">
              <div className="join border border-blue-600 rounded-xl">
                <button className="join-item btn-page-blue btn-sm text-base">1</button>
                <button className="join-item btn-page-blue btn-sm text-base">2</button>
                <button className="join-item btn-page-blue btn-sm text-base">3</button>
                <button className="join-item btn-page-blue btn-sm text-base">4</button>
              </div>
          </div>
        </div>
        </div>
    </div>
  )
}
