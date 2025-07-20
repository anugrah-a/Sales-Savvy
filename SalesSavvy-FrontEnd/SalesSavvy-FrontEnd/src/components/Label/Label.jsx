import React from 'react'
import './label.css'
export default function Label({htmlFor, text, className = ''}) {
  return (
    <label htmlFor={htmlFor}
      className={`label ${className}`}>
      {text}
    </label>
  )
}
