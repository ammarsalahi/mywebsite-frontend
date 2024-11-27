import React from 'react'
import { FaCheck,FaLock } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { ImProfile } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import { settingsSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';

interface themeProps{
  theme:string;
}
export default function SettingNav(props:themeProps) {
    
    const [settings,setSettings]=useRecoilState<string>(settingsSelector);
    const handleSettingsChanges=(value:string)=>()=>{
      setSettings(value)
    }
    const {t} = useTranslation()

  return (
    <div>
      <div className='px-3 pt-24'>
        <button className={settings=="profile"?'btn-blue nav-selected':'nav-unselected'} onClick={handleSettingsChanges("profile")}>
            <ImProfile />
           {t('set1')} 
        </button>
        <button className={settings=="password"?'btn-blue nav-selected':'nav-unselected'} onClick={handleSettingsChanges("password")}>
            <FaLock />
            {t('set2')} 
        </button>
        <button className={settings=="otp"?'btn-blue nav-selected':'nav-unselected'} onClick={handleSettingsChanges("otp")}>
            <FaCheckDouble/>
            {t('set3')} 
            </button>
      </div>
 
    </div>
  )
}
