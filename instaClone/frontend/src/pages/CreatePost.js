//CreatePost.js
import React, { useEffect, useState } from 'react'
import "../pages/createPost.css"
import { useNavigate } from 'react-router-dom'

function CreatePost() {
  const navigate =useNavigate()
  const[title,setTitle]=useState("")
  const[content,setContent]=useState("")
  const[image,setImage]=useState("")
  const[url,setUrl]=useState("")
  
useEffect(()=>{
  if(url){
    fetch("http://localhost:5500/create-post",{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        },  
       body:JSON.stringify({
       title:title,
       content:content,
       url:url
      }) 
   }).then(response=> response.json())
   .then(data=>{
       console.log("Reasponse data : ",data)
       if(data.error){
           alert(data.error)
       }else{
        console.log(data)
        navigate('/')
       }
   }).catch(err=>{
     console.log(err)
   })
  }
},[url, title, content, navigate])

  const submitData=()=>{

    const imageData=new FormData()
    imageData.append("file",image)
    imageData.append("upload_present","instamern")
    imageData.append("cloud_name","dyrlyhscm")

    // fetch("",{
      fetch("https://api.cloudinary.com/v1_1/dyrlyhscm/image/upload",{
      method:"post",
      body:imageData
   }).then(response=>{
     return response.json() })
     .then(data=>{
       console.log("Reasponse data : ",data)
       setUrl(data.url)
   }).catch(err=>{
    console.log(err)
   })

  } 
  return (
    <div className='card input-field post-container'>
      <input type='text' placeholder='Post title' value={title}
      onChange={(e)=>setTitle(e.target.value)}/>
      <input type='text' placeholder='Post content' value={content}
      onChange={(e)=>setContent(e.target.value)}/> 

      <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button onClick={submitData} className='btn-large waves-effect waves-light #42a5f5 blue darken-1'>
            Create Post
            </button>
    </div>
  )
}

export default CreatePost
