import React from 'react'

const DisplayAccessibility = ({setVisible}) => {
  return (
    <div className='absolute_wrap'>
      <div className='absolute_wrap_header'>
        <div className='circle hover1' onClick={()=>{
          setVisible(0)
        }}>
          <i className='arrow_back_icon'></i>
        </div>
        display & Accessiblity
      </div>
      <div className='mmenu_main'>
        <div className='small_circle' style={{width:'60px'}}>
          <i className='dark_filled_icon'></i>
        </div>
        <div className='mmenu_col'>
          <span className='mmenu_span1'>Dark Mode</span>
          <span className='mmenu_span2'>
            Adjust the apperance of the Facebook to reduce glare and give your eyes a break
          </span>
        </div>
      </div>
      <label htmlFor='darkOff' className='hover1'>
        <span>Off</span>
        <input type='radio' name='dark' id='darkOff'/>
      </label>
      <label htmlFor='darkOn' className='hover1'>
        <span>On</span>
        <input type='radio' name='dark' id='darkOn'/>
      </label>


      <div className='mmenu_main'>
        <div className='small_circle'  style={{width:'50px'}}>
          <i className='compact_icon'></i>
        </div>
        <div className='mmenu_col'>
          <span className='mmenu_span1'>Compact mode</span>
          <span className='mmenu_span2'>
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor='CompactOff' className='hover1'>
        <span>Off</span>
        <input type='radio' name='dark' id='CompactOff'/>
      </label>
      <label htmlFor='CompactOn' className='hover1'>
        <span>On</span>
        <input type='radio' name='dark' id='CompactOn'/>
      </label>
      <div className='mmenu_item hover3'>
        <div className='small_circle'>
          <i className='keyboard_icon'></i>
        </div>
        <span>keyboard</span>
        <div className='rArrow'>
          <i className='right_icon'></i>
        </div>
      </div>
    </div>
  )
}

export default DisplayAccessibility