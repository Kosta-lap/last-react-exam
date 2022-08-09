import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <section className='main'>
        <div className='container'>
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default App;
