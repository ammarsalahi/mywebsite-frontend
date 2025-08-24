import React from 'react'
import { ImProfile } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import { settingsSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';
import { FaLock } from 'react-icons/fa6';


interface Navprops{
    onLoad:()=>void;
    theme:string
}
export default function SettingNavMobile(props:Navprops) {
    const [settings,setSettings]=useRecoilState<string>(settingsSelector);
    const handleSettingsChanges=(value:string)=>()=>{
      props.onLoad()  
      setSettings(value)
    }
    const {t} = useTranslation()
  return (
    
    <ul className={`menu menu-lg space-y-4 rounded-box w-full 
            ${props.theme=="dark"?"bg-gray-800 shadow-2xl":"bg-gray-300"}
        `}
    >
        <li onClick={handleSettingsChanges("profile")}><a>
            <ImProfile />
            {t('set1')} 
        </a></li>
        <li
          onClick={handleSettingsChanges("password")}
        ><a>
            <FaLock />
           {t('set2')} 
        </a></li>
        <li
           onClick={handleSettingsChanges("otp")}
        ><a>
            <FaCheckDouble/>
          {t('set3')} 
        </a></li>

    </ul>
  )
}
