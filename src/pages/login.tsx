import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/store';

import { auth, provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    //const [newUserName, setUserName] = useState("");
    //const dispatch = useDispatch();
    const loginuser = useSelector((state: any)=> state.user.value.userName);
    const navigate = useNavigate();

    const googleLogin = async () => {
       const result = await signInWithPopup(auth,provider);
       console.log(result);
       navigate("/");
    }

  return (
    <div>
        <p>Welcome {loginuser}</p>
      {/* <input type="text" placeholder="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUserName(e.target.value)}} /> */}
      {/* dispatch(login({userName: newUserName})); */}
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  )
}
