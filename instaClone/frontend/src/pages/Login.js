//Login.js
import React, { useContext, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

function Login() {
  const {state,dispatch}=useContext(UserContext)
  const navigate =useNavigate()
  const [email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const login=()=>{
      fetch("http://localhost:5500/login",{
         method:"post",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify({
          email:email,
          password:password
         }) 
      }).then(response=>{
        return response.json()
      }).then(data=>{
          console.log("Reasponse data : ",data)
          if(data.error){
              alert(data.error)
          }else{
            console.log(data)
            localStorage.setItem("token",data.token)
              localStorage.setItem("user",JSON.stringify(data.userInfo))
              dispatch({type:"USER",payload:data.userInfo})
              navigate('/')
          }
      }).catch(err=>{
        console.log(err)
      })
      }
  return (
    <div className="login-container">
        <div className='card login-card' >
            <h2>Instagram</h2>
            <input type='text' placeholder='Enter email' value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <input type='text' placeholder='Enter password' value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={login} className='btn-large waves-effect waves-light #42a5f5 blue darken-1'>
            Login
            </button>
        </div>
    </div>
  )
}

export default Login
