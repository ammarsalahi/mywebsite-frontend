import React, { useState } from 'react'
import StepOne from '../cooperations/StepOne'
import StepTwo from '../cooperations/StepTwo'
import StepThree from '../cooperations/StepThree'
import { Steps } from 'antd';

export default function Cooperation() {
  const [current, setCurrent] = useState(0);
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
    <div className='py-10 bg-gray-100'>
      <div className="cooper">
      <div className="step-show">
      <Steps
        items={steps}
        onChange={handleCurrent}
        current={current}
        direction="vertical"
        className='h-full rounded-xl border border-dashed border-gray-200 p-5 '
      />
      </div>
      <div className="steps-space">
         <div className="content-show">
            {steps[current].content}
         </div>
      </div>
      </div>
  
    </div>
  )
}
