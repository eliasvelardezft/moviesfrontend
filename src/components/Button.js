import React from 'react';

const Button = (props) => {

  let style = {
    backgroundColor: `${props.color}`,
    '&:hover': { backgroundColor: `${props.color}` }
  }

  return(
    <button onClick={props.onClick} type={props.type} 
      className={`${props.className} rounded-full
        text-sm text-gray-50 py-1 px-2 focus:outline-none focus:ring-2
      focus:ring-purple-100`}
      style={style}>
      {props.children}
    </button>
  )
}; 

export default Button;