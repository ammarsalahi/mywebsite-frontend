import React from 'react'
import { FaCheck,FaLock } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { ImProfile } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import { settingsSelector } from '../states/Selectors';

interface themeProps{
  theme:string;
}
export default function SettingNav(props:themeProps) {
    
    const [settings,setSettings]=useRecoilState<string>(settingsSelector);
    const handleSettingsChanges=(value:string)=>()=>{
      setSettings(value)
    }

  return (
    <div>
      <div className='px-3 pt-16'>
        <button className={settings=="profile"?'btn-blue nav-selected':'nav-unselected'} onClick={handleSettingsChanges("profile")}>
            <ImProfile />
           ویرایش پروفایل  
        </button>
        <button className={settings=="password"?'btn-blue nav-selected':'nav-unselected'} onClick={handleSettingsChanges("password")}>
            <FaLock />
            تغییر گذرواژه   
        </button>
        <button className={settings=="otp"?'btn-blue nav-selected':'nav-unselected'} onClick={handleSettingsChanges("otp")}>
            <FaCheckDouble/>
             تایید دو مرحله   
        </button>
      </div>
       {/* <ul className="menu rounded-box w-full my-10">
        <li className='text-xl'>
          <a onClick={handleSettingsChanges("profile")}>
            <ImProfile />
            ویرایش پروفایل
          </a>
        </li>
        <li className='text-xl mt-2 border bg-blue-500 rounded-xl'>
          <a onClick={handleSettingsChanges("password")}>
            <FaLock />
            تغییر گذرواژه  
          </a>
        </li>
        <li className='text-xl mt-2'>
          <a onClick={handleSettingsChanges("otp")}>
          <FaCheckDouble/>
          تایید دو مرحله
          </a>
        </li>
      </ul> */}
         {/* <ul className={props.theme=="dark"?"nav-set-dark":"nav-set"}>
              <li>
                  <a  className={settings=="profile"?"nav-selected":"nav-unselected"} onClick={handleSettingsChanges('profile')}>
                    <ImProfile className='text-xl'/>
                    ویرایش پروفایل
                  </a>
              </li>
              <li>
                  <a className={settings=="password"?"nav-selected":"nav-unselected"} onClick={handleSettingsChanges('password')}>
                    <FaLock className='text-xl'/>
                    تغییر گذرواژه  
                  </a>
              </li>
              <li>
                  <a className={settings=="otp"?"nav-selected":"nav-unselected"} onClick={handleSettingsChanges('otp')}>
                    <FaCheckDouble className='text-xl'/>
                   تایید دو مرحله
                  </a>
              </li>
        </ul> */}
    </div>
  )
}
