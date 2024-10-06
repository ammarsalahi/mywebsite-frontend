import React, { useEffect } from 'react'
import Profile from '../settings/Profile';
import PasswordChange from '../settings/PasswordChange';
import { useRecoilValue } from 'recoil';
import { settingsSelector } from '../states/Selectors';
import SettingNav from '../settings/SettingNav';
import Otp from '../settings/Otp';


export default function Settings() {

    const settings=useRecoilValue(settingsSelector)  
  return (
    <div>
              <div className="grid grid-cols-4 gap-4">
                  <div  className='relative'>
                    <div className="sticky top-24">
                      <SettingNav/>
                    </div>
                   

                  </div>
                <div className="col-span-3 px-10 py-0">
                  <div className="card-light">
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
