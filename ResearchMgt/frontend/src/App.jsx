import './App.css'
//import { ethers } from "ethers";

import React from 'react'

import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
//import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

//pages
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import MyPage from './pages/MyPage';

function App() {

  return (
    <Router>
    <AuthProvider>
      <Routes>
        <Route  element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard setContractState={setContractState}/>}/>
          <Route path="/mypage" element={<MyPage contractState={contractState}/>}/>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  </Router>
  )
}

export default App
