import React from 'react';
import './App.css';
import MyApp from './MyApp'
import MyAppConstructor from './MyAppConstructor'

function App() {
  return (
    <div className="encasing">
      <div className="left">
        <MyApp
          heading="this is a heading from MyApp"
        />
      </div>
      <div className="right">
        <MyAppConstructor
          heading="this is a heading from MyAppConstructor"
        />
      </div>
    </div>
  );
}

export default App;
