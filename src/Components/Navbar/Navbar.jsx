import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import shop from "./shop.png";
import auth from "../../firebaseInit";
import { signOut } from "firebase/auth";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "../../authReducer";



const Navbar =()=>{


    const {isLoggedIn} = useSelector(authSelector);
    const dispatch =useDispatch();
    const user =auth.currentUser;


    //handling logout here

    const handleLogout= async()=>{
    await signOut(auth).then(() => {
        
        dispatch(authActions.setIsLoggedIn(false));
        toast.success("Signed Out Successfully");
        console.log("Sign Out Successfull");
        
        
      }).catch((error) => {
        toast.error("Error in Signing out !!");
        console.log(error);
      });

    

      
}

return (
    <>
    <ToastContainer />
    <div className={styles.navMain}>
        <div className={styles.leftDiv}>
            <img src={shop} alt="Buy busy Logo"></img>
            <h1>Buy Busy </h1>
        </div>
        <div className={styles.rightDiv}>
            <Link className={styles.link} to='/'><div><img src="https://cdn-icons-png.flaticon.com/128/9187/9187555.png" alt="home"></img><h3>Home</h3></div></Link>
           {(isLoggedIn && <Link className={styles.link} to={{pathname:`userOrders/${user.uid}/orders`}}><div><img src="https://cdn-icons-png.flaticon.com/128/9332/9332226.png" alt="Orders"></img><h3>Orders</h3></div></Link>)}
            {(isLoggedIn && <Link className={styles.link} to ={{pathname:`userCart/${user.uid}/cart`}}> <div><img src="https://cdn-icons-png.flaticon.com/128/2838/2838694.png" alt="Cart"></img><h3>Cart</h3></div></Link>)}
            {(!isLoggedIn && <Link to="/signIn" className={styles.link}><div><img src="https://cdn-icons-png.flaticon.com/128/11454/11454449.png" alt="Cart"></img><h3>Sign In</h3></div></Link>)}
           {(isLoggedIn && <div onClick={handleLogout}><Link className={styles.link} to='/'><img src="https://cdn-icons-png.flaticon.com/128/11454/11454458.png" alt="Logout"></img><h3>Logout</h3></Link></div>)}
        </div>
    </div>
    <Outlet />
    </>
)
}


export default Navbar;