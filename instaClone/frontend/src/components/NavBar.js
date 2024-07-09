//NavBar.js
import React, { useContext } from 'react'
import '../components/NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { type } from '@testing-library/user-event/dist/type'

function NavBar() {
  const navigate=useNavigate()
  const { state, dispatch } = useContext(UserContext)
  const menuList = () => {
    if (state) {
      return [
        <li key="111"><Link to="/create-post">Create post</Link></li>,
        <li key="112"><Link to="/profile">Profile</Link></li>,
        <li key="122">
           <button onClick={()=>{
            localStorage.clear()
            dispatch({type:"LOGOUT"})
            navigate('/login')
           }} className='btn-large waves-effect waves-light #42a5f5 blue darken-1'>
            Log Out
            </button>
        </li>

      ]
    } else {
      return [
        <li key="113"><Link to="/signup">Signup</Link></li>,
        <li key="114"><Link to="/login">Login</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo">Instagram</Link>
        <ul id="nav-mobile" className="right">
          {menuList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
