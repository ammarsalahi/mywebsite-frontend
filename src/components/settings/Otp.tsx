import React, { useState } from 'react'
import bgs from '../../assets/qrcodeno.jpg'
import { IoMdRefresh } from "react-icons/io";
import { Api, showImage } from '../api/Index';
import { OTP_VERIFY, PROFILES_ID, USERS_PASSWORD_VERIFY } from '../api/Endpoints';
import { AuthConfigHeader } from '../api/Configs';
import { CgClose } from 'react-icons/cg';
import { message } from 'antd';
import { FaArrowLeft, FaEye } from 'react-icons/fa6';
import { useRecoilState } from 'recoil';
import { settingsSelector } from '../states/Selectors';


interface optProps{
  token:any;
  user:any
}
export default function Otp(props:optProps) {
   const [otp, setOtp] = useState<any|null>(null);
   const [password,setPassword]=useState("");
   const [isopt,setIsOtp]=useState(false);
   const [settings,setSettings]=useRecoilState(settingsSelector)  

  

  message.config({
    top: document.documentElement.clientHeight - 100,
  });


  const handleGotoProfile=()=>{
    setSettings("profile")
  }
   const handleOpenModal=()=>{
    const modalElement = document.getElementById('otpmodal') as HTMLDialogElement | null;
    modalElement?.showModal();
    }

    const handleClose=()=>{
      const modalElement = document.getElementById('otpmodal') as HTMLDialogElement | null;

      modalElement?.close();
    }

    const handleChangePassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }

    const handleVerify=()=>{
      Api.post(USERS_PASSWORD_VERIFY,{pass:password},{
        headers:AuthConfigHeader(props.token.access)
      }).then((res)=>{
          handleOtp();
          handleClose()
      }).catch((err)=>{
        message.error("متاسفانه مشکلی پیش آمد!")

      })
    }
   const handleOtp=()=>{
    Api.get(PROFILES_ID(props.token.user),{
      headers:AuthConfigHeader(props.token.access)
    }).then((res)=>{
      setOtp(res.data);
      setIsOtp(true)
    }).catch((err)=>{
      console.log(err)
    })
   }

   const hanldeGetNewOtp=()=>{
      Api.get(OTP_VERIFY,{
        headers:AuthConfigHeader(props.token.access)
      }).then((res)=>{
        setOtp(res.data)
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
   }
  
  return (
    <div className='md:pt-16'>
       {props.user.is_otp==false?
          <div className='flex justify-center items-center md:py-32'>

       <div className='text-center'>
          <p className='text-xl py-5'>متاسفانه این قابلیت فعال نیست!</p>
          <button 
            className="btn-blue rounded-xl mt-2 text-lg"
            onClick={handleGotoProfile}
          >
            برو بریم
            <FaArrowLeft/>
          </button>
        </div>
      </div>
      :
      <div>

      {otp?.qrcode_image==null?
         <div className=' flex justify-center items-center text-center'>
           <div className="relative">
           <img src={bgs} className='w-[270px] h-[270px] rounded-2xl border-4 border-blue-500 opacity-25 ' />
           <p className='absolute inset-0 mt-28  text-2xl font-bold'>تصویر پیدا نشد!</p>
           </div>
            
         </div> 
      :
      <div className="flex justify-center">
        <img src={showImage(otp.qrcode_image)} className='w-[270px] h-[270px] rounded-2xl border-4 border-blue-500' />
      </div>}
      <div className="flex items-center justify-center py-5">
          {isopt?<button className='btn-blue rounded-2xl gap-3 w-full md:w-[270px] text-lg'
             onClick={hanldeGetNewOtp}
          >
            <IoMdRefresh/>
            تازه سازی
          </button>
          :<button className='btn-blue rounded-2xl gap-3 w-full md:w-[270px] text-lg'
            onClick={handleOpenModal}
          >
            <FaEye/>
            نمایش
        </button>}
      </div>
      </div>}
      <dialog id={"otpmodal"} className="modal">
        <div className="modal-box py-3">
          <div className="flex justify-end ps-5 items-center">
              <button className='btn btn-circle btn-ghost text-2xl' onClick={handleClose}>
                <CgClose/>
              </button>
          </div>
            <div className='py-10 px-5'>
              <p className='text-xl font-semibold mb-4 text-center'>گذرواژه خود را وارد کنید</p>
              <input 
                  type="password" value={password} onChange={handleChangePassword}
                  className='input input-bordered w-full rounded-2xl mb-5' 
                  placeholder='نام دسته‌بندی را وارد کنید...' />
              
              <div className="flex items-center gap-3">
                <button 
                    className='btn-blue w-52 rounded-2xl' type='button' disabled={password.length==0} 
                    onClick={handleVerify}
                >
                  تایید
                </button>
                <button className='btn-red w-52 rounded-2xl' type='button' onClick={handleClose}>
                  انصراف
                </button>
              </div>
            </div>
        </div>
    </dialog>
    </div>
  )
}
