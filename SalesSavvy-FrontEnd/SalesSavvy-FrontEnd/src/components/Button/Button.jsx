import React from 'react'
import './button.css'
export default function Button({ variant = '',text,className, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant} ${className}`} 
    >
      {text}
    </button>
  )
}
