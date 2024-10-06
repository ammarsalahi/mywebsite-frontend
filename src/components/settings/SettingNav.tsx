import React from 'react'
import { FaCheck,FaLock } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { ImProfile } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import { settingsSelector } from '../states/Selectors';

export default function SettingNav() {
    const [settings,setSettings]=useRecoilState<string>(settingsSelector);

    const handleSettingsChanges=(value:string)=>()=>{
      setSettings(value)
    }
  return (
    <div>
         <ul className="menu bg-base-200 h-[490px] pt-10 px-3 text-base  rounded-box">
                      <li>
                        <a  className='p-3 bg-blue-400 text-white mb-1' onClick={handleSettingsChanges('profile')}>
                        <ImProfile className='text-xl'/>
                          ویرایش پروفایل
                        </a>
                      </li>
                      <li>
                        <a className='p-3' onClick={handleSettingsChanges('password')}>
                            <FaLock className='text-xl'/>
                           تغییر گذرواژه
                        </a>
                      </li>
                      <li>
                        <a className='p-3' onClick={handleSettingsChanges('otp')}>
                        <FaCheckDouble className='text-xl'/>
                           تایید دو مرحله
                        </a>
                      </li>
                    </ul>
    </div>
  )
}
