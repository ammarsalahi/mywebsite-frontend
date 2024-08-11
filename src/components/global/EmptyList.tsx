import React from 'react'
import Lottie from 'react-lottie-player'
import nolist from '../../assets/lotties/box-empty.json'

export default function EmptyList(props:{name:string}) {
  return (
        <div className='no-list'>
            <div className='py-2 flex justify-center'>
                <Lottie
                animationData={nolist}
                loop
                play
                style={{height:300,width:300}}
                />
            </div>
            <div className="flex justify-center">
                <div className=" p-2 lg:p-4 bg-red-300 text-center rounded-lg w-96">
                <p className='text-xl text-red-700'>هیچ {props.name} وجود ندارد!!!</p>
                </div>
            </div>
        
        </div>
  )
}
