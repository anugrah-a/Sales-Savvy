import React from 'react'
import './textbox.css'
export default function Textbox({type='text',placeholder='',value,
     name, id, onChange, className=''}) {
  return (
 
    <input type={type} 
    name={name} 
    id={id}
    value={value} 
    placeholder={placeholder}
    onChange={onChange}
    className={`textbox ${className}`}
    />

  )
}
