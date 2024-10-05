import React from 'react'
import bgs from '../../assets/bgs.jpg'
export default function Settings() {
  return (
    <div>
        <div className="card-light">
            <div className="card-body py-5 md:px-20">
                <form>
                  <div className="relative">
                    <div className="flex justify-center pb-10">
                    <img src={bgs} alt="" className='rounded-[50%] w-[230px] h-[230px]'/>
                    </div>

                  </div>
                 <div className='grid md:grid-cols-2 gap-x-10 gap-y-4'>
                    <div className="mb-5">
                      <input type="text" className="input input-bordered w-full" />
                    </div>
                    <div className="mb-5">
                      <input type="text" className="input input-bordered w-full" />
                    </div>
                    <div className="mb-5">
                      <input type="text" className="input input-bordered w-full" />
                    </div>
                    <div className="mb-5">
                      <input type="text" className="input input-bordered w-full" />
                    </div>
                    <div className="mb-5">
                      <input type="text" className="input input-bordered w-full" />
                    </div>
                 </div>
                  
                </form>
            </div>
        </div>
    </div>
  )
}
