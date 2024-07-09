import React, { createContext, useContext, useEffect, useReducer } from 'react'
import './App.css';
import {BrowserRouter,Route, Routes,useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost';
import { reducer,initialState } from './reducer.js/userReducer';

export const UserContext =createContext()

const Routing=()=>{
  const navigate=useNavigate()
  const{state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      navigate("/")
    }else{
      navigate("/login")
    }
  },[])
  return(
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
    </Routes>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state:state,dispatch:dispatch}}>
    <BrowserRouter>
      <NavBar />
     <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
