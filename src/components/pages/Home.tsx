import React from 'react'
import Navbar from '../global/Navbar'
import LastPosts from '../posts/LastPosts'
import LastProjects from '../projects/LastProjects'
import Footer from '../global/Footer'

export default function Home() {
  return (
    <div >
      <Navbar/>
      <LastPosts/>
      <LastProjects/>
     
      <Footer/> 
    </div>
  )
}
