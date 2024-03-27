import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './components/InputField';
import axios from 'axios'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")

  function doClick(a: string): void {
    axios.get('http://localhost:8080/attack?fromId=1&toId=2'+(a?'&attack='+a:''))
    .then((response) => {
      const data = response.data
      if(response.data.attack.length>0)
        alert("tu ataque fue exitoso: "+response.data.attack[0]+". El x es "+data.x)
      }
    )
  }

  console.log(todo);

  return (
    <div className="App">
      <span className="heading">TODO</span>
      <InputField onClick={doClick} todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
