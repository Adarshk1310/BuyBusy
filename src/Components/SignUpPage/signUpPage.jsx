import { useRef } from "react";
import styles from "./signUpPage.module.css";
import { Link, redirect } from "react-router-dom";
import auth from "../../firebaseInit";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import { db } from "../../firebaseInit";
import { doc,setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { authActions } from "../../authReducer";

const SignUpPage =()=>{


    const nameRef =useRef();
    const emailRef =useRef();
    const passwordRef =useRef();
    const dispatch =useDispatch();


    //handling submit here
    
    const handleSubmit =async(e)=>{
        e.preventDefault();

       await createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value).then((userCredential)=>{
        const user =userCredential.user;

         updateProfile(user, {
            displayName:nameRef.current.value
          });


        setDoc(doc(db,"cart",user.uid),{});
        setDoc(doc(db,"orders",user.uid),{});
     
        dispatch(authActions.setIsLoggedIn(true));
        toast.success(`Heyy ${nameRef.current.value}!!  New account created successfully!!`);
        console.log(userCredential);
        console.log(user);
        redirect('/signIn');
       }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(errorCode);
        // ..
      });



      nameRef.current.value="";
      emailRef.current.value="";
      passwordRef.current.value="";



    }



    return<>

        <ToastContainer />
        <div className={styles.background}>
       <div className={styles.LoginMain}>
        <div className={styles.firstPart}><img src="https://images.unsplash.com/photo-1660840042045-e1a24d860810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="loginPageImage"></img></div>
        <div className={styles.secondPart}>
        <div className={styles.signUpPage}>
        <div className={styles.signUpCard}>
            <div className={styles.heading}><h1>Sign Up </h1><p>New User? Create a new account.</p></div>
            <form className={styles.signUpForm} onSubmit={handleSubmit}>
                <p>Name</p>
                <input type="text" ref={nameRef} placeholder="Enter Name" ></input>
                <p>Email</p>
                <input type="text" ref={emailRef} placeholder="Enter Email" ></input>
                <p>Password</p>
                <input type="password" ref={passwordRef} placeholder="Enter Password"></input>
                <button>Submit</button>
            </form>
            <div className={styles.signUp}><Link className={styles.link} to='/signIn'><small>or Sign In</small></Link></div>

        </div>
        </div>


        
        </div>
       </div>
    </div>
    </>
}


export default SignUpPage;