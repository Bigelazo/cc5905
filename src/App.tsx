import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


interface FooProps{
  name: string;
  bar: number;
  aumentarBar: () => void;
}

function Foo(props: FooProps){
  const [count, setCount] = useState(0)

  const s = {width: 200, height: 200, background: "yellow", border: "1px solid #000", color: "#000"}
  
  return <div style={s}>
          <div>
            My count: {count}
            <button onClick={() => setCount(count + 1)}>Click me for my count</button>
          </div>
          <div>
            {props.name}, Parent count: {props.bar}
            <button onClick={props.aumentarBar}>Click me for parent count</button>
          </div>
          </div>
}



function SubComponent(){
  const [count, setCount] = useState(0)
  console.log("re rendering SUbComponent")
  function onFooClick(){
    setCount(count + 1)
  }
  //const onFooClick = () => setCount(count + 1)
  return (<div>
    <Foo name="Daniel" bar={count} aumentarBar={onFooClick}  />

    <a href="javascript:;" style={{color: "#fff"}} onClick={onFooClick}>Hazme click</a>
  </div>
  )
}


function App() {
  
  
  return (
    <div className="App">
      <header className="App-header">        
        <SubComponent />  
      </header>
    </div>
  );
}

export default App;
