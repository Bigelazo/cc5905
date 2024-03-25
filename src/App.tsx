import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './components/InputField';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")

  console.log(todo);

  return (
    <div className="App">
      <span className="heading">TODO</span>
      <InputField todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
