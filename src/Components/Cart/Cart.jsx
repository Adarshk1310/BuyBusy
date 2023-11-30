import { useEffect, useState } from "react";
import styles from "./cart.module.css";
import { onSnapshot,doc,updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseInit";
import auth from "../../firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {GridLoader} from "react-spinners";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions, itemSelector } from "../../reducers";
import { authActions } from "../../authReducer";
import { ViewImage } from "../viewImage/viewImage";



const Cart =()=>{

    const{cartproducts,totalPrice,viewImage} =useSelector(itemSelector);
    const dispatch =useDispatch();
    const{id} =useParams();
    const[loading,setLoading] = useState(true);
    const user = auth.currentUser;

  
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
   
            dispatch(authActions.setIsLoggedIn(true));

            } else {
              console.log("use Effect: logout")
            }
          });
          
       
    },[dispatch]);


    //fetching cart items from firestore
    
    useEffect(()=>{
        
        if (id){
            
             onSnapshot(doc(db, "cart", id), (doc) => {
                if(doc){
                const storeData = doc.data().cartItems;
                    dispatch(actions.setCartProducts(storeData));
                   
                }
                
            });
            setLoading(false);
        }else{
            console.log("no user found");
        }
    },[id,dispatch]);





    useEffect(()=>{
        
       if(cartproducts){
        
        const cost = cartproducts.map((item)=>item.price).reduce((acc, current) => acc + current, 0);   
        dispatch(actions.setTotalPrice(cost));
        
       }else{
    
        dispatch(actions.setTotalPrice(0));


       }
      
    },[cartproducts,dispatch]);



    //handling increase of quantity

    const handleIncrease=(prod)=>{
                   
                 onSnapshot(doc(db, "products", prod.prodId), (col) => {
                    
                    console.log("cart:",col.data());
                    dispatch(actions.setIncreaseQuantity({prod,price:col.data().price,userId:id}));
                  
                    });
              
    }


     //handling decrease of quantity

    const handleDecrease = async(prod)=>{
        
           if(prod.quantity<=1){
            const pos = doc(db, "cart", id);
             updateDoc(pos, {
                cartItems: arrayRemove(prod)
            });

            toast.success(`${prod.name} removed successfully !!`)

           }else{
            onSnapshot(doc(db, "products", prod.prodId), (col) => {
    
                dispatch(actions.setDecreaseQuantity({prod,price:col.data().price,userId:id}));
         });
           }

    }

    //removing of product from the cart

    const handleRemove=async(prod)=>{
            const pos = doc(db, "cart", id);
            await updateDoc(pos, {
                cartItems: arrayRemove(prod)
            });

            toast.success(`${prod.name} removed successfully !!`);  

        }

    
    //handling buy button here
    
    const handleBuy=async()=>{
        const user = auth.currentUser;
        const pos = doc(db, "orders",user.uid);
        const date = (new Date().getDate()).toString() +"-"+ (new Date().getMonth()+1).toString() +"-"+ (new Date().getFullYear()).toString();
            
        await updateDoc(pos, {
            orderItems: arrayUnion({date:date,orders:cartproducts,total:totalPrice})
        });

        const cartPos= doc(db, "cart",user.uid);
        await updateDoc(cartPos, {
            cartItems: []
        });
        dispatch(actions.setCartProducts([]));
      
        dispatch(actions.setTotalPrice(0));
        toast.success("Order placed successfully !!!");

    }

    //clearing all the product from the cart

    const clearCart =async()=>{

        dispatch(actions.setCartProducts([]));
        const pos = doc(db, "cart", id);
        await updateDoc(pos, {
            cartItems: []
        });
        dispatch(actions.setTotalPrice(0));
        
    }   

    // handling of image preview on click

    const handleImage =(item)=>{
        dispatch(actions.setViewImage());
        dispatch(actions.setCurrentImage(item));
    }

    return <>
  {viewImage && <ViewImage />}
   {loading?<GridLoader color="black" size="20px" cssOverride={{ "position": "absolute","left": "48%","top": "40%"}} /> :

   <div className={styles.mainPage}>
        {cartproducts? <div className={styles.cartBox}>
        {cartproducts.map((prod)=><>
            
            <div className={styles.item}>
            <div className={styles.imageDiv}><img src={prod.img} alt="ItemImage" onClick={()=>{handleImage(prod.img)}}></img><p>{prod.name}</p></div>
            <div className={styles.quantity}><p>Quantity:</p><img onClick={()=>handleDecrease(prod)} src="https://cdn-icons-png.flaticon.com/128/512/512619.png" alt="decreaseQnty"></img> <p>{prod.quantity}</p><img onClick={()=>handleIncrease(prod)} src="https://cdn-icons-png.flaticon.com/128/864/864380.png" alt="increaseQuantity"></img></div>
            <div className={styles.priceDiv}><p>&#x20B9; {prod.price}</p><button onClick={()=>handleRemove(prod)} className={styles.removeButton}>Remove</button></div>

        </div> 
        
        
        </>)}

        {cartproducts.length!==0?<div className={styles.total}> <p>Total : &#x20B9;{totalPrice} </p><div><Link className={styles.link} to={{pathname:`/userOrders/${user.uid}/orders`}}><button className={styles.buyButton} onClick={handleBuy} >Buy</button></Link><button onClick={clearCart}>Clear All</button> </div></div>:<h1>Cart is Empty!!!!</h1>} 

        </div>:<h1>Cart is Empty!!!!</h1>}
    </div>}
    </>
}


export default Cart;