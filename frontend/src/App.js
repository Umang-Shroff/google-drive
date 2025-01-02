import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import axios from 'axios'
import { useEffect } from 'react';

axios.defaults.url = "http://localhost:5000"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
