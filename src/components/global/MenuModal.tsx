import { Modal } from 'antd'
import React from 'react'
import '../../components/styles/modal.css'
interface modalprops{
    isopen:boolean
    close:any
}
export default function MenuModal(props:modalprops) {
  return (
    <Modal
    title="logo"
        // This was removed
    open={props.isopen}
    onClose={props.close}
    
    >
    <p>hello</p>
    </Modal>
  )
}
