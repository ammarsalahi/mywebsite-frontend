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

interface stepprops{
  next:any;
}
export default function StepOne(props:stepprops) {
  const [types,settypes]=useRecoilState(typeSelector)
  return (
    <div>
      <p className='text-2xl pb-10 text-center'>یک گزینه را انتخاب کنید</p>
      <ListGroup as="ul">
          <ListGroup.Item action as='li' className={types=='بک‌اند'?'selected_step':'unselected_step'} onClick={()=>settypes('بک‌اند')}>
            <div className="flex justify-between items-center">
              {types=='بک‌اند'?
                  <FaCheck fontSize={25}/>
              :
                <div className="px-3"></div>}
              <p>پروژه بک‌اند</p>
              <AiFillCode fontSize={25}/>
            </div>
          </ListGroup.Item>
          <ListGroup.Item action as='li' className={types=='فرانت‌اند'?'selected_step':'unselected_step'} onClick={()=>settypes('فرانت‌اند')}>
            <div className="flex justify-between items-center">
                 {types=='فرانت‌اند'?
                  <FaCheck fontSize={25}/>
              :
                <div className="px-3"></div>}
              <p>پروژه فرانت‌اند</p>
              <FaPaintBrush fontSize={25}/>
            </div>
          </ListGroup.Item>
          <ListGroup.Item action as='li' className={types=='فول‌استک'?'selected_step':'unselected_step'} onClick={()=>settypes('فول‌استک')}>
            <div className="flex justify-between items-center">
              {types=='فول‌استک'?
                  <FaCheck fontSize={25}/>
              :
                <div className="px-3"></div>}
              <p>پروژه فول‌استک</p>
              <PiCodeFill fontSize={25}/>
            </div>
          </ListGroup.Item>
          <ListGroup.Item action as='li' className={types=='نمیدونم'?'selected_step':'unselected_step'} onClick={()=>settypes('نمیدونم')}>
            <div className="flex justify-between items-center">
              {types=='نمیدونم'?
                  <FaCheck fontSize={25}/>
              :
                <div className="px-3"></div>}
              <p>نمیدونم مطمئن نیستم!</p>
              <BsEmojiNeutralFill fontSize={25}/>
            </div>
          </ListGroup.Item>
      </ListGroup>
        <button 
          className='btn btn-wide w-full bg-blue-600 text-white hover:bg-blue-600 border border-blue-600 rounded-full'
          onClick={props.next}
            >
          ادامه
          <FaChevronLeft/>
        </button>
      
      
    </div>
  )
}
