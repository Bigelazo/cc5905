import React from 'react'

interface InputFieldProps {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  onClick: () => void
}

const InputField: React.FC<InputFieldProps> = ({todo, setTodo, onClick}) => {
  return (
  <form className='input'>
    <input type='input'
    value={todo}
    onChange={onClick}
    placeholder='Enter a task'
    className='input__box'>
    </input>
    <button className='input__submit' type='submit'>Go</button>
  </form>
  )
}

export default InputField