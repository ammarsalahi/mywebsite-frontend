import React, { useEffect } from 'react'
import Profile from '../settings/Profile';
import PasswordChange from '../settings/PasswordChange';
import { useRecoilState, useRecoilValue } from 'recoil';
import { settingsSelector, themeSelector, tokenSelector } from '../states/Selectors';
import SettingNav from '../settings/SettingNav';
import Otp from '../settings/Otp';


export default function Settings() {

    const [settings,setSettings]=useRecoilState(settingsSelector)  
    const theme=useRecoilValue(themeSelector);
   
    useEffect(() => {
      setSettings("profile")
    },[])
    
  return (
    <div>
              <div className="grid grid-cols-4 gap-4">
                  <div  className='relative'>
                    <div className="sticky top-24">
                      <SettingNav theme={theme}/>
                    </div>
                   

                  </div>
                <div className="col-span-3 px-10 py-0">
                  <div className={theme=='light'?"card-light":"card-dark"}>
                    <div className="card-body">
                        {settings=="profile" &&<Profile/>}
                        {settings=="password" &&<PasswordChange/>}
                        {settings=="otp" && <Otp/>}
                    </div>
                  </div>
                 
                </div>
          </div> 
      </div>
  )
}
