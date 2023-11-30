import styles from "./order.module.css";
import { useEffect, useState } from "react";
import auth from "../../firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import { GridLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseInit";
import { onSnapshot,doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { actions, itemSelector } from "../../reducers";
import { authActions } from "../../authReducer";





const OrderPage =()=>{
    const{id} =useParams();
    const[loading,setLoading] =useState(true);
    const dispatch =useDispatch();
    const {orders} = useSelector(itemSelector);
    
    useEffect(()=>{
        
        if (id){
            
             onSnapshot(doc(db, "orders", id), (doc) => {
                if(doc){
                const storeData = doc.data().orderItems;
             
                dispatch(actions.setOrders(storeData));
                
                   console.log("store data:",storeData)
                }
                
            });
            setLoading(false);
        }else{
            console.log("no user found");
        }
    },[id,dispatch]);






    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
    
              dispatch(authActions.setIsLoggedIn(true));
                
            } else {
              console.log("use Effect: logout")
            }
          });
          
       
    },[dispatch]);


    console.log(orders);


return <>
   {loading?<GridLoader color="black" size="20px" cssOverride={{ "position": "absolute","left": "48%","top": "40%"}} /> :
  (orders?<div className={styles.outer}>
    <div className={styles.mainPage}>

    <div> <h1>Your Orders</h1></div>

                {orders.map((item)=><>

                    <div className={styles.dateWise}>
                    <h3>Ordered on: {item.date}</h3>
                    <div className={styles.orders}>
                   <div className={styles.headings}>
            
                            <div className={styles.item}><p>Item</p></div>
                            <div><p>Price</p></div>
                            <div><p>Quantity</p></div>
                            <div><p>Total Price</p></div>
                           </div>

                        {item.orders.map((item)=><>
                            <div className={styles.itemInfo}>
                        <div><p>{item.name}</p></div>
                        <div><p>&#x20B9;{item.price / item.quantity}</p></div>
                        <div><p>x {item.quantity}</p></div>
                        <div><p>&#x20B9;{item.price}</p></div>
                        </div>
                        
                        
                        </>)}

                        <div className={styles.total}>
                        <div><p>Total</p></div>
                        <div><p>&#x20B9;{item.total}</p></div>
                        </div>
                    </div>
                    </div>
                </>)}

    </div>
  </div>:<h1>There are no orders !!</h1>
)

  }



</>

}


export default OrderPage;