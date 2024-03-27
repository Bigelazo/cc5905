import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './components/InputField';
import axios from 'axios'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")

  function doClick(): void {
    axios.get('http://localhost:8080/attack?fromId=1&toId=2')
    .then((response) => console.log(response))
  }

  console.log(todo);

  return (
    <div className="App">
      <span className="heading">TODO</span>
      <button className='input__submit' type='submit' onClick={doClick}>Go1</button>
      <InputField onClick={doClick} todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
