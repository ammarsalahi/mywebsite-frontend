import React, { useState } from 'react'
import StepOne from '../collaborations/StepOne'
import StepTwo from '../collaborations/StepTwo'
import StepThree from '../collaborations/StepThree'
import { Steps } from 'antd';
import Footer from '../global/Footer';
import { useRecoilValue } from 'recoil';
import { themeSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';

export default function Collaboration() {
  const [current, setCurrent] = useState(0);
  const theme=useRecoilValue(themeSelector)

  const {t}=useTranslation();


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
        <ul className="steps steps-vertical" dir="rtl">
            <li className={current==0 || current>0?"step step-info":"step"}>{t('step1')}</li>
            <li className={current==1 || current>1?"step step-info":"step"}>{t('step2')}</li>
            <li className={current==2?"step step-info":"step"}>{t('step3')}</li>
         </ul>
       </div> 
     
      </div>
      <div className="steps-space flex justify-center ">
         <div>
          <div className={`card-${theme}  w-full md:w-[500px]`}>
            <div className="card-body p-6">
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
