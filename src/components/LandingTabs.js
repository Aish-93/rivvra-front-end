
import React, { useState } from 'react'
import {landingdataTabs} from "../constants/constant"
const LandingTabs = () => {

    const [context,setContext] = useState(0);
    const contentLoad = (val)=>{
    setContext(val);
    }
  return (
    <div >
      
    <div className=' flex justify-center '>
        <h1>Optimize your sales process</h1>
    </div>
    <div className=' flex justify-center'>
        <h3>Supercharge every step of your sales cycle and empower your team to win deals.</h3>
    </div>
    <div className='flex flex-row'>
        {
          landingdataTabs.map((item) =>
        <div className=' m-3 text-xl'
         onClick={() =>contentLoad(item.id)}>
            {item.title}
        </div>
        )
        }
    </div>
    <div>
    <div>
        {
            landingdataTabs[context].title
        }
    </div>
    <div>
        {
            landingdataTabs[context].subHead
        }
    </div>
    </div>
    </div>
  )
}

export default LandingTabs
