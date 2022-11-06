import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth';
import "./style.css"

const Navbar = () => {

  const [user] = useAuthState(auth);

  const logoutUser = async () => {
    await signOut(auth);
  }

  return (
    <div className='navbar'>
        <div className='nav-links'>
          <Link to="/" className='link' >Home |</Link>
          {!user ? <Link to="/login" className='link' > Login</Link>
            :
           <Link to="/create-post" className="link"> New Post</Link>}
        </div>
        { user &&
           <>
            <div className='user-info'>
              <p className='user-name'>{user?.displayName}</p>
              <img src={user?.photoURL || ""}  width="30" height="30" className='user-image' />
              <button onClick={logoutUser} className="logout-button">Log out</button>
            </div>
           </>
        }
    </div>
  )
}

export default Navbar