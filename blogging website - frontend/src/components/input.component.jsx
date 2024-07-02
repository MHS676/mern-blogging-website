import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const InputBox = ({ name, type, id, value, placeholder, icon: Icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className='relative w-[100%] mb-4'>
      <input
        name={name}
        type={type === 'password' ? (passwordVisible ? 'text' : 'password') : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className='input-box'
      />
      {Icon && <Icon className='input-icon' />}
      {
        type === 'password' && (
          passwordVisible ? 
          <FaRegEye className='input-icon left-[auto] right-4 cursor-pointer' onClick={togglePasswordVisibility}/> :
          <FaRegEyeSlash className='input-icon left-[auto] right-4 cursor-pointer' onClick={togglePasswordVisibility}/>
        )
      }
    </div>
  )
}

export default InputBox
