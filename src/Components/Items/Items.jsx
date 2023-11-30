import Filter from "../filter/filter";
import ItemCard from "../itemCard/itemCard";
import styles from "./items.module.css";
import { GridLoader } from "react-spinners";
import React, { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import auth from "../../firebaseInit";
import { onAuthStateChanged } from "firebase/auth";

import { useDispatch } from "react-redux";
import {  fetchitems } from "../../reducers";
import { authActions } from "../../authReducer";
import { ViewImage } from "../viewImage/viewImage";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { itemSelector } from "../../reducers";




const Items =()=>{
  
    // const[loading,setLoading] =useState(true);
    const {viewImage,loading} = useSelector(itemSelector);
    const dispatch =useDispatch();
    
    

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // setUserId(user.uid);
              dispatch(authActions.setUserId(user.uid));
              dispatch(authActions.setIsLoggedIn(true));

            } else {
              console.log("use Effect: logout")
            }
          });
          
       
    },[dispatch]);

    

//fetching products from firebase

    useEffect(()=>{

    dispatch(fetchitems());
    
    },[dispatch]);


    return <>
      

    {loading?<GridLoader color="black" size="20px" cssOverride={{ "position": "absolute","left": "48%","top": "40%"}} /> :<>
        <div className={styles.itemsMain}>
        <Filter />  
    {viewImage && <ViewImage />}

            <ItemCard />
        </div></>
        
        }

        
    
    </>

}


export default Items;