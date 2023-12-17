import 'animate.css'
import AppRouter from './router/AppRouter';
import React, { useContext } from 'react';
import { AuthContext } from './components/User/AuthContext'; 


// import './css/App.css'

function App() {
  const { initializationDone } = useContext(AuthContext);

  





  if (!initializationDone) {
    return ; 
  }



  return (
    <AppRouter />
  )
}

export default App
