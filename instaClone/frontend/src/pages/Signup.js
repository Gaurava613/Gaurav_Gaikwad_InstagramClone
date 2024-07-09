//Signup.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate =useNavigate()
    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const register=()=>{
        fetch("http://localhost:5500/register",{
           method:"post",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({
            fullName:fullName,
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
                navigate('/login')
            }
        })
    }
  return (
    <div className="login-container">
        <div className='card login-card' >
            <h2>Instagram</h2>
            <input type='text' placeholder='Enter fullname'
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}/>
            <input type='text' placeholder='Enter email'value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <input type='text' placeholder='Enter password'value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={register} className='btn-large waves-effect waves-light #42a5f5 blue darken-1'>
            Login
            </button>
        </div>
    </div>
  )
}

export default Signup
