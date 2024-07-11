import { Button, Input, Modal } from 'antd'
import React from 'react'

 interface modalProps{
    isopen:boolean
    close:any
 }
export default function AddCategory(props:modalProps) {
  return (
    <Modal
    title="افزودن دسته‌بندی"
    open={props.isopen}
    onOk={()=>{}}
    onCancel={props.close}
    okText="افزودن"
    cancelText="بی‌خیال"
    className='text-start'
  >
    <div className="py-10 px-4">
    <Input size='large' className='rounded-xl' placeholder='نام دسته‌بندی را وارد کنید' />

    </div>
  </Modal>
  )
}
