import React,{useRef, useState} from 'react'

const Otp = ({handleFullOtp}) => {

    const length = 4;
    const [otp,setOtp] = useState(Array(length).fill(""));
   

    const inputRef = useRef([]);

    const focusInput =(index) =>{
        inputRef.current[index]?.focus();
        
    }

    const handleChange =(e,index) =>{
        const value = e.target.value;
        if(!/^\d*$/.test(value)) return ;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index < length -1){
            focusInput(index +1);
        }
       
        // all otp value
        const joinedOtp = newOtp.join("");
        if(joinedOtp.length === length && !newOtp.includes("")){
            
            handleFullOtp(joinedOtp)
        }
    }
    const handlePaste =(e) =>{
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,length);
      if( pasted.length === 0) return;

      const newOtp =[...otp];
      for(let i=0;i <pasted.length;i++){

        newOtp[i]=pasted[i];
        if(inputRef.current[i]){
            inputRef.current[i].value= pasted[i];
        }
      }

      setOtp(newOtp);

      const joinedOtp = newOtp.join("");

      if(joinedOtp.length === length && !newOtp.includes("")){
        
        handleFullOtp(joinedOtp)
      }

      const nextFocusedIndex = Math.min(pasted.length,length-1);
      focusInput(nextFocusedIndex)
    }
    const handleKeyDown  =(e,index) =>{
        if(e.key ==="Backspace"){
            if(otp[index] === "" &&  index >0){
                focusInput(index-1)
            }
        }

    }
  return (
    <div>
      
      <div onPaste={handlePaste} style={{padding:'10px', display:'flex', justifyContent:'center'}} >
        {
            otp.map((digit,index) =>(
                <input
                key={index}
                ref={(el) =>(inputRef.current[index] =el)}

                type='text'
                maxLength={1}
                inputMode='numeric'
                value={digit}
                onChange={(e)=>handleChange(e,index)}
                onKeyDown={(e)=>handleKeyDown(e,index)}
                style={{
                    width:"40px",
                    height:"40px",
                    textAlign:'center',
                    marginRight:'10px',
                    border:'1px solid black'
                }}
                />
            ))
          
        }

      </div>
    </div>
  )
}

export default Otp
