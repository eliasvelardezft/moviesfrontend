import React from 'react';

const Label = (props) => {
    return(
      <label className={`${props.className} 
        sm:text-xl`}>
        {props.children}
      </label>
    )
  }
  
  export default Label;