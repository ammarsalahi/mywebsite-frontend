import React, { useEffect, useState } from 'react'
import StepOne from '../collaborations/StepOne'
import StepTwo from '../collaborations/StepTwo'
import StepThree from '../collaborations/StepThree'
import { Steps } from 'antd';
import Footer from '../global/Footer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageLoadSelector, themeSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';
import StepZero from '../collaborations/StepZero';

export default function Collaboration() {
  const [current, setCurrent] = useState(0);
  const theme=useRecoilValue(themeSelector)
    const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);

  const {t}=useTranslation();


  const nextStep=()=>{
    setCurrent(current+1)
  }
  const next2Step=()=>{
    setCurrent(current+2)
  }
  const prevStep=()=>{
    setCurrent(current-1)
  }

   const prev2Step=()=>{
    setCurrent(current-2)
  }


  const handleCurrent=(value:number)=>{
     setCurrent(value)
  }
  const steps=[
    {
      title:'نوع پروژه',
      content:<StepZero  next={nextStep} next2={next2Step}/>
    },
    {
      title:'نوع پروژه وب',
      content:<StepOne prev={prevStep} next={nextStep}/>
    },
    {
      title:'اطلاعات شما',
      content:<StepTwo  prev={prevStep} next={nextStep} prev2={prev2Step} />
    },
    {
      title:'جزئیات پروژه',
      content:<StepThree  prev={prevStep} />
    },
     
  ]

  useEffect(() => {
        setpageLoad(true)
      
  }, [])
  return (
   <div>
    <div className='py-20'>
      <div className="cooper">
      <div className="step-show">
       <div className="sticky top-20">
        <ul className="steps steps-vertical" dir="rtl">
            <li className={current==0 || current>0?"step step-info":"step"}>{t('step1')}</li>
            <li className={current==1 || current>1?"step step-info":"step"}>{t('step2')}</li>
            <li className={current==2?"step step-info":"step"}>{t('step3')}</li>
         </ul>
       </div> 
     
      </div>
      <div className="steps-space md:flex md:justify-center ">
         <div>
          <div className={`card-${theme}  w-full md:w-[500px]`}>
            <div className="md:card-body md:p-6">
            <p className='text-3xl pb-6 text-center font-semibold'>{t('cooper')}</p>

            {steps[current].content}

            </div>
          </div>
         </div>
         
      </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}
