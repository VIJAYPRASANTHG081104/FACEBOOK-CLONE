import React, { useRef, useState } from 'react'
import Header from '../../components/header'
import HomeLeft from '../../components/home/left';
import { useSelector } from 'react-redux';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import './style.css'
import CreatePost from '../../components/createPost';
import SendVerification from '../../components/home/sendVerification';
const Home = () => {
  const user  = useSelector((state)=>state.user);
  return (
    <div className='home'>
      <Header/>
      <HomeLeft user={user}/>
      <div className='home_middle'>
          <Stories/>{
            user.Verfied===false &&
          <SendVerification user={user}/>}
          <CreatePost user={user}/>
      </div>
      <RightHome user={user}/>
    </div>
  )
}

export default Home