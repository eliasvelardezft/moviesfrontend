import React from 'react';

const Button = (props) => {
  return(
    <button onClick={props.onClick} type={props.type} 
      className={`${props.className} rounded-full bg-purple-500 px-5 py-2
        text-sm text-gray-50
      focus:bg-purple-500 focus:outline-none focus:ring-2
      focus:ring-purple-100
        sm:h-auto sm:w-35 sm:text-xl`}>
      {props.children}
    </button>
  )
}; 

export default Button;