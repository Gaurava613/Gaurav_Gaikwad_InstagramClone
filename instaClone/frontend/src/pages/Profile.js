//Profile.js
import React, { useContext, useEffect, useState } from 'react'
import '../pages/profile.css'
import { UserContext } from '../App'
function Profile() {
  const [posts,setPosts]=useState([])
  const{state,dispatch}=useContext(UserContext)
  useEffect(()=>{
      fetch("http://localhost:5500/myposts",{
          method:"get",
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("token")
            }
       }).then(response=>{
         return response.json()
       }).then(data=>{
           console.log("Reasponse data : ",data)
          setPosts(data.myposts)
       }).catch(err=>{
         console.log(err)
       })
  },[])
  return (
    <div style={{maxWidth:"550px" , margin:"0px auto"}}>
      <div className='profile-container'>
        <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
            src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D'/>
        </div>
        <div>
           <h4> {state ? state.fullName:"Loading..."}</h4>
            <div className='info-section'>
                <h6>{posts.length}</h6>
                <h6>50 followers</h6>
                <h6>50 followings</h6>
            </div>
        </div>
      </div>

      <div className='gallery-container'>
        {
          posts.map(post=>{
            return(
              <img key={post._id} className="post" src={post.imgUrl}/>
            )
          })
        }
       
      </div>
          </div>
  )
}

export default Profile
