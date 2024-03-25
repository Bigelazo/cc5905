import React from 'react'

interface InputFieldProps {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
}

const InputField: React.FC<InputFieldProps> = ({todo, setTodo}) => {
  return (
  <form className='input'>
    <input type='input'
    value={todo}
    onChange={(e) => setTodo(e.target.value)}
    placeholder='Enter a task'
    className='input__box'>
    </input>
    <button className='input__submit' type='submit'>Go</button>
  </form>
  )
}

export default InputField