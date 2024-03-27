import React, { useState } from 'react'


interface InputFieldProps {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  onClick: (a: string) => void
}

const InputField: React.FC<InputFieldProps> = ({todo, setTodo, onClick}) => {
  const [input, setInput] = useState<string>("")

  function onButtonClick(): void {
    onClick(input)
  }
  return (
  <div className='input'>
    <input type='input'
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder='Enter a task'
    className='input__box'>
    </input>
    <button onClick={onButtonClick} className='input__submit' type='submit'>Go</button>
  </div>
  )
}

export default InputField