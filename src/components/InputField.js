import React from 'react';

const Input = (props) => {
  return (
    <input type={props.type ? props.type : 'text'} 
      value={props.value}
      placeholder={props.placeholder}
      className={`h-8 text-center border border-purple-500 rounded-2xl
      focus:bg-purple-100 focus:outline-none focus:ring-2
      focus:ring-purple-100
        sm:h-9 sm:w-3/4 sm:rounded-full sm:text-xl
        ${props.className}`}
      onChange={props.onChange}
      required={props.required}
    />
  )
}

export default Input;