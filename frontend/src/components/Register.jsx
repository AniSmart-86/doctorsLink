import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import loginImg from "../../assets/login.png"
import styles from "./auth.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils'
import { register, RESET_AUTH } from '../../Components/Redux/Features/Auth/AuthSlice'
import {useDispatch, useSelector} from "react-redux";
import { toast } from 'react-toastify'
import { Spinner } from '../../Components/Spinner/Spinner'


const initialState = {name: "", email: "", password: "", cpassword: ""}; 

const Register = () => {

    // const toast = useToast();
   
    const [formData, setFormData] = useState(initialState);
    const {name, email, password, cPassword} = formData;

   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state)=>state.auth)

    const HandleInputChange = (e)=>{

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }

const registerUser = async (event)=>{
    event.preventDefault();

if(!email || !password){
    return ( toast.error("All fields are required")
);
}
if(password.length < 6){
    return( toast.error("password must be up to 6 characters"))
}
if(!validateEmail(email)){
    return (toast.error("please enter a valid email"))
}
if(password !== cPassword){
    return( toast.error("passwords do not match"))
}

const userData = {
    name, email, password
}

 dispatch(register(userData));

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


<Card>
    <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
            
<input type="text"
              placeholder='Name'
              required
              name="name"
              value={name}
              onChange={HandleInputChange} />

<input type="text"
              placeholder='Email'
              required
              name={"email"}
              value={email}
              onChange={HandleInputChange} />
<input type="password"
              placeholder='password'
              required
              name={"password"}
              value={password}
              onChange={HandleInputChange} />
<input type="password"
              placeholder='confirm password'
              required
              name='cPassword'
              value={cPassword}
              onChange={HandleInputChange} />

              <button type='submit' className="--btn --btn-primary --btn-block">
Register
              </button>
        </form>
        <span className={styles.register}>
            <p>Already have an account? </p> 

            <Link to="/login">Login</Link>
        </span>
    </div>
</Card>

<div className={styles.img}>
    <img src={loginImg} alt="" width="400" />
</div>
    </section>
    </>
  )
}

export default Register