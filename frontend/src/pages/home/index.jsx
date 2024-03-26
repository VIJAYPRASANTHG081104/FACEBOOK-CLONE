import React, { useRef, useState } from 'react'
import Header from '../../components/header'
import clickOutSide from '../../helper/clickOutSide'

const Home = () => {
  const [visible,setVisible] = useState(true);
  const ref = useRef(null);

  clickOutSide(ref,()=>{
    setVisible(false)
  });
  return (
    <div>
      <Header/>
      {
        visible && <div className='card' ref={ref}>heeeeeeee</div>
      }
    </div>
  )
}

export default Home