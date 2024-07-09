//Home.js
import React, { useEffect, useState } from 'react'
import '../pages/home.css'

function Home(){
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        fetch("http://localhost:5500/posts",{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
              }
         }).then(response=>{
           return response.json()
         }).then(data=>{
             console.log("Reasponse data : ",data)
            setPosts(data.allposts)
         }).catch(err=>{
           console.log(err)
         })
    },[])

    const deletePost=(postId)=>{
        fetch("http://localhost:5500/delete-post/"+postId,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
              }
         }).then(response=>{
           return response.json()
         }).then(data=>{
             console.log("Reasponse data : ",data)
             const newPosts=posts.filter(item=>{
                return item._id !== data.result._id
             })
                setPosts(newPosts)
            }).catch(err=>{
           console.log(err)
         })
    }
return(
    <div className='home-container' >
        {
            posts.map(post=>{
                <div className='card home-card' key={post._id}>
                <h5>{post.author.fullName}
                    <i  onClick={deletePost(post._id)} className='material-icons' style={{float:"right",color:"red"}} >X</i>
                </h5>
                <div className='card-image'>
                    <img src="" alt={post.title} />
                </div>
                <div className='card-content'>
                    <h6>{post.title}</h6>
                    <p>{post.content}</p>
                    <input type='text' placeholder='add comment'/>
                </div>
            </div>
             })
        }    
        
    </div>
)
}
export default Home;