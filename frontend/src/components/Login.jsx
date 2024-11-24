import React, { useContext, useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import loginImg from "../../assets/login.png"
import styles from "./auth.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { login, RESET_AUTH } from '../../Components/Redux/Features/Auth/AuthSlice'
import { Spinner } from '../../Components/Spinner/Spinner'
import { store } from '../../Components/Redux/store'
import { DocsContext } from '../context/DocsContext'



const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state)=>state.auth)

const loginUser = async (event)=>{
    event.preventDefault();

    if(!email || !password){
        return ( toast.error("All fields are required")
    );
    }
   
    if(!validateEmail(email)){
        return (toast.error("please enter a valid email"))
    }
    
    const userData = {
         email, password
    }
    // console.log(email,  password);


    store.dispatch(login(userData));

};

useEffect(()=>{
    if(isSuccess && isLoggedIn){
        navigate("/")
    }
   
    dispatch(RESET_AUTH());
    },[isSuccess, isLoggedIn, dispatch, navigate])



  return (
    <>
      {isLoading && <Spinner/>}
    <section className={`container ${styles.auth}`}>
<div className={styles.img}>
    <img src={loginImg} alt="" width="400" />
</div>

<Card>
    <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
<input type="text"
              placeholder='Email'
              required
              value={email}
              onChange={(e) =>setEmail(e.target.value)} />
<input type="password"
              placeholder='password'
              required
              value={password}
              onChange={(e) =>setPassword(e.target.value)} />

              <button type='submit' className="--btn --btn-primary --btn-block">
Login
              </button>
        </form>
        <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
        </span>
    </div>
</Card>
    </section>
    </>
  )
}

export default Login