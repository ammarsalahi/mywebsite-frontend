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
         <ul className={props.theme=="dark"?"nav-set-dark":"nav-set"}>
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
        </ul>
    </div>
  )
}
