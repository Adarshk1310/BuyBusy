import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import auth from "../../firebaseInit";
import {  signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { authActions } from "../../authReducer";


const LoginPage = ()=>{
    const emailRef =useRef();
    const passwordRef =useRef();
    const dispatch =useDispatch();


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log(user.displayName);
              //  setIsLoggedIn(true);
              dispatch(authActions.setIsLoggedIn(true));

              console.log("Sign In page: Logged In successfully!!");
            } else {
              console.log("Sign In page: logout")
            }
          });
          
    })

    //handling form submit here

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        await signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value).then((userCredential) => {
            
            dispatch(authActions.setIsLoggedIn(true));
            const user = userCredential.user;
            console.log(user.uid);
            toast.success("Signed in successfully!!!");

          })
          .catch((error) => {
            
            const errorMessage = error.message;
            toast.error(errorMessage);
            console.log(errorMessage);
          });


    }





    return<>
    <ToastContainer/>
    <div className={styles.background}>
       <div className={styles.LoginMain}>
        <div className={styles.firstPart}><img src="https://images.unsplash.com/photo-1660840042045-e1a24d860810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="loginPageImage"></img></div>
        <div className={styles.secondPart}>
        <div className={styles.loginPage}>
        <div className={styles.signInCard}>
            <div className={styles.heading}><h1>Sign In </h1><p>Welcome to Buy Busy E-Commerce website made by Adarsh Kumar</p></div>
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <p>Email</p>
                <input type="text" ref={emailRef} placeholder="Enter email"></input>
                <p>Password</p>

                <input type="password" ref={passwordRef} placeholder="Enter password"></input>
                <button type="submit">Submit</button>
            </form>
            <div className={styles.signUp}><Link className={styles.link} to='/signUp'><small>or Sign Up Now</small></Link></div>

        </div>
        </div>
        </div>
       </div>
    </div>
    </>

}


export default LoginPage;