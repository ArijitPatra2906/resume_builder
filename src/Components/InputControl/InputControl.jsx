import React from 'react'
import "./InputControl.css"
function InputControl ({ label, ...props })  {
  return (
    <div className='input_container'>
    
    {label && <label>{label}</label>}
    <input type="text" {...props}/>
    
    </div>
  );
}

export default InputControl;