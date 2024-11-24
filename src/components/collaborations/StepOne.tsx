import { Button, Checkbox } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { FaPaintBrush } from "react-icons/fa";
import { AiFillCode } from "react-icons/ai";
import { PiCheck, PiCodeFill } from "react-icons/pi";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { useRecoilState } from 'recoil';
import { typeSelector } from '../states/Selectors';
import { FaCheck } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft} from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

interface stepprops{
  next:any;
}
export default function StepOne(props:stepprops) {
  const [types,settypes]=useRecoilState(typeSelector)
  const {t}=useTranslation();


  return (
    <div>
      <p className='text-2xl pb-7 text-center'>{t('title1')}</p>
      <ul className='menu w-full rounded-box [&_li>*]:rounded-full  p-0' dir={t('dir')}>
        <li>
          <a className={types=='backend'?'selected_step hover:bg-blue-600':'unselected_step '} onClick={()=>settypes('backend')}>
          {types=='backend' && <FaCheck fontSize={25}/>}
               {t('opt1')}
          <AiFillCode fontSize={25}/>    
          </a>
        </li>
        <li>
          <a className={types=='frontend'?'selected_step hover:bg-blue-600':'unselected_step'} onClick={()=>settypes('frontend')}>
            {types=='frontend' && <FaCheck fontSize={25}/>}
            {t('opt2')}
            <FaPaintBrush fontSize={25}/>
          </a>
        </li>
        <li>
          <a className={types=='full'?'selected_step hover:bg-blue-600':'unselected_step'} onClick={()=>settypes('full')}>
            {types=='full' && <FaCheck fontSize={25}/>}

               {t('opt3')}
            <PiCodeFill fontSize={25}/>

          </a>
        </li>
        <li>
          <a className={types=='know'?'selected_step hover:bg-blue-600':'unselected_step'} onClick={()=>settypes('know')} >
              {types=='know' && <FaCheck fontSize={25}/>}
               {t('opt4')}
               <BsEmojiNeutralFill fontSize={25}/>
          </a>
        </li>
      </ul>
      {/* <ListGroup as="ul" >
          <ListGroup.Item action as='li' className={types=='بک‌اند'?'selected_step':'unselected_step'} onClick={()=>settypes('backend')}>
            <div className="flex justify-between items-center">
              {types=='backend'?
                  <FaCheck fontSize={25}/>
              :
                <div className="px-3"></div>}
              <p>پروژه بک‌اند</p>
              <AiFillCode fontSize={25}/>
            </div>
          </ListGroup.Item>
          <ListGroup.Item action as='li' className={types=='frontend'?'selected_step':'unselected_step'} onClick={()=>settypes('frontend')}>
            <div className="flex justify-between items-center">
                 {types=='frontend'?
                  <FaCheck fontSize={25}/>
              :
                <div className="px-3"></div>}
              <p>پروژه فرانت‌اند</p>
              <FaPaintBrush fontSize={25}/>
            </div>
          </ListGroup.Item>
          <ListGroup.Item action as='li' className={types=='full'?'selected_step':'unselected_step'} onClick={()=>settypes('full')}>
            <div className="flex justify-between items-center">
              {types=='full'?
                  <FaCheck fontSize={25}/>
              :
                <div className="px-3"></div>}
              <p>پروژه فول‌استک</p>
              <PiCodeFill fontSize={25}/>
            </div>
          </ListGroup.Item>
          <ListGroup.Item action as='li' className={types=='know'?'selected_step':'unselected_step'} onClick={()=>settypes('know')}>
            <div className="flex justify-between items-center">
              {types=='know'?
                  <FaCheck fontSize={25}/>
              :
                <div className="px-3"></div>}
              <p>نمیدونم مطمئن نیستم!</p>
              <BsEmojiNeutralFill fontSize={25}/>
            </div>
          </ListGroup.Item>
      </ListGroup> */}
        <button 
          className='btn w-full bg-blue-600 text-white hover:bg-blue-600 border border-blue-600 rounded-full'
          onClick={props.next}
          disabled={types==""&&true}
            >
          {t('continue')}
          <FaChevronLeft/>
        </button>
      
      
    </div>
  )
}
