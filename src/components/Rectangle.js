import React from 'react';

const Rectangle = (props) => {
  return(
    <button 
      className={`${props.className} border-1 shadow-lg rounded-xl h-16 w-3/4
        relative mx-auto bg-purple-50 max-w-2xl
        `}>
    </button>
  )
}

export default Rectangle;