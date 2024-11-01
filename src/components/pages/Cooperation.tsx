import React, { useState } from 'react'
import StepOne from '../cooperations/StepOne'
import StepTwo from '../cooperations/StepTwo'
import StepThree from '../cooperations/StepThree'
import { Steps } from 'antd';
import Footer from '../global/Footer';
import { useRecoilValue } from 'recoil';
import { themeSelector } from '../states/Selectors';

export default function Cooperation() {
  const [current, setCurrent] = useState(0);
  const theme=useRecoilValue(themeSelector)

  const nextStep=()=>{
    setCurrent(current+1)
  }
  const prevStep=()=>{
    setCurrent(current-1)
  }


  const handleCurrent=(value:number)=>{
     setCurrent(value)
  }
  const steps=[
    {
      title:'نوع پروژه',
      content:<StepOne  next={nextStep}/>
    },
    {
      title:'اطلاعات شما',
      content:<StepTwo  prev={prevStep} next={nextStep} />
    },
    {
      title:'جزئیات پروژه',
      content:<StepThree  prev={prevStep}/>
    },
  ]
  return (
   <div>
    <div className='py-10 lg:py-20'>
      <div className="cooper">
      <div className="step-show">
       <div className="sticky top-20">
        <ul className="steps steps-vertical">
            <li className={current==0 || current>0?"step step-info":"step"}>نوع پروژه</li>
            <li className={current==1 || current>1?"step step-info":"step"}>اطلاعات شما</li>
            <li className={current==2?"step step-info":"step"}>جزئیات پروژه</li>
         </ul>
       </div> 
     
      </div>
      <div className="steps-space ps-10">
         <div className={`card-${theme}`}>
            <div className="card-body p-10">
            {steps[current].content}

            </div>
         </div>
      </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}
