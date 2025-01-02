import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login'
import axios from 'axios'
import { useEffect } from 'react';

axios.defaults.url = "http://localhost:5000"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
