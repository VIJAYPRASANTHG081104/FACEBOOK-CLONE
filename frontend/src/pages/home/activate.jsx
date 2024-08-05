import React, { useRef, useState,useEffect } from 'react'
import Header from '../../components/header'
import HomeLeft from '../../components/home/left';
import { useSelector,useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import './style.css'
import CreatePost from '../../components/createPost';
import ActivateForm from './ActivateForm';
import axios from 'axios';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

const Activate = () => {
  const navigate = useNavigate();  
  const dispatch = useDispatch(); 
  const user  = useSelector((state)=>state.user);
  const [success,setSuccess] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);

  const {token} = useParams();
    useEffect(()=>{
        activateAccount();
    },[])
    const activateAccount = async() =>{
        try {
         
            setLoading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/activate`,{token},{
                headers:{
                    Authorization: `Bearer ${user.token}`,
                }
            })
            setSuccess(data.msg);
            Cookies.set('user',JSON.stringify({...user,Verfied:true}));
            dispatch({
                type:"VERIFY",
                payload: true
            })
            setTimeout(()=>{
                navigate('/');
            },3000)
        } catch (error) {
            setError(error.response.data.msg);
        }
    }
  return (
    <div className='home'>
    {
        success &&
        <ActivateForm 
        type="success"
        header= "Account Verification succeded"
        text = {success}
        loading = {loading}
    />
    }
    {
        error&&
        <ActivateForm 
        type="error"
        header= "Account Verification failed"
        text = {error}
        loading = {loading}
    />
    }
      <Header/>
      <HomeLeft user={user}/>
      <div className='home_middle'>
          <Stories/>
          <CreatePost user={user}/>
      </div>
      <RightHome user={user}/>
    </div>
  )
}

export default Activate