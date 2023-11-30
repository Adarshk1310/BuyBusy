import styles from  "./itemCard.module.css";
import { db } from "../../firebaseInit";
import auth from "../../firebaseInit";
import { doc,updateDoc,arrayUnion} from "firebase/firestore";
import {  toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { actions, itemSelector } from "../../reducers";
import { notificationSelector } from "../../notificationReducer";
// import { ViewImage } from "../viewImage/viewImage";
// import { useState } from "react";






const ItemCard =()=>{
    const dispatch =useDispatch();
    const{items,
        minPrice,
        category,
        mensClothing,
        womensClothing,
        jewelleryItems,
        electronicsItems,
        mensFlag,
        womensFlag,
        jewelleryFlag,
        electronicsFlag} = useSelector(itemSelector);

    const {message} =useSelector(notificationSelector);
     
    


    //handling add button here
    
    const handleAdd=async(item)=>{
        const user = auth.currentUser;
        const pos = doc(db, "cart",user.uid);
    
        if(!item.addToBag){
            // item.addToBag=true;   
        dispatch(actions.setAddToBag(item));
        await updateDoc(pos, {
            cartItems: arrayUnion(item)
        });
        console.log("message:",message);
        
        }else{
            toast.success("Item already added");
        }

    }

    //handling image preview on click

    const handleViewImage =(item)=>{
        dispatch(actions.setViewImage());
        dispatch(actions.setCurrentImage(item))
    }

    
    return <>
     {
        items.map((item,i)=>{if(item.price<=minPrice && !category){
            
            return <>
            <div className={styles.itemCardMain} key={i}>
        <div className={styles.itemImage} ><img src={item.img} alt="productImage" onClick={()=>{handleViewImage(item.img)}}></img></div>
        <div className={styles.itemInfo}><p>{item.name}</p></div>
        <div className={styles.lowerInfo}>
        <div className={styles.itemPrice}>&#x20B9;{item.price}</div>
        <div className={styles.addToCart}><button onClick={()=>handleAdd(item)}>Add to Cart</button></div>
            </div>
        </div>
        </>}else{
            return<></>
        }})
    }
  
    {
        items.map((item,i)=>{if(item.price<=minPrice && item.category===mensClothing && mensFlag){
            
            return <>
            <div className={styles.itemCardMain} key={i}>
        <div className={styles.itemImage} ><img src={item.img} alt="productImage" onClick={()=>{handleViewImage(item.src)}}></img></div>
        <div className={styles.itemInfo}><p>{item.name}</p></div>
        <div className={styles.lowerInfo}>
        <div className={styles.itemPrice}>&#x20B9;{item.price}</div>
        <div className={styles.addToCart}><button onClick={()=>handleAdd(item)}>Add to Cart</button></div>
            </div>
        </div>
        </>}else{
            return<></>
        }})
    }

{
        items.map((item,i)=>{if(item.price<=minPrice && item.category===womensClothing && womensFlag){
            
            return <>
            <div className={styles.itemCardMain} key={i}>
        <div className={styles.itemImage} ><img src={item.img} alt="productImage" onClick={()=>{handleViewImage(item.src)}}></img></div>
        <div className={styles.itemInfo}><p>{item.name}</p></div>
        <div className={styles.lowerInfo}>
        <div className={styles.itemPrice}>&#x20B9;{item.price}</div>
        <div className={styles.addToCart}><button onClick={()=>handleAdd(item)}>Add to Cart</button></div>
            </div>
        </div>
        </>}else{
            return<></>
        }})
    }
      {
        items.map((item,i)=>{if(item.price<=minPrice && item.category===electronicsItems && electronicsFlag){
            
            return <>
            <div className={styles.itemCardMain} key={i}>
        <div className={styles.itemImage} ><img src={item.img} alt="productImage" onClick={()=>{handleViewImage(item.src)}}></img></div>
        <div className={styles.itemInfo}><p>{item.name}</p></div>
        <div className={styles.lowerInfo}>
        <div className={styles.itemPrice}>&#x20B9;{item.price}</div>
        <div className={styles.addToCart}><button onClick={()=>handleAdd(item)}>Add to Cart</button></div>
            </div>
        </div>
        </>}else{
            return<></>
        }})
    }
      {
        items.map((item,i)=>{if(item.price<=minPrice && item.category===jewelleryItems && jewelleryFlag){
            
            return <>
            <div className={styles.itemCardMain} key={i}>
        <div className={styles.itemImage} ><img src={item.img} alt="productImage" onClick={()=>{handleViewImage(item.src)}}></img></div>
        <div className={styles.itemInfo}><p>{item.name}</p></div>
        <div className={styles.lowerInfo}>
        <div className={styles.itemPrice}>&#x20B9;{item.price}</div>
        <div className={styles.addToCart}><button onClick={()=>handleAdd(item)}>Add to Cart</button></div>
            </div>
        </div>
        </>}else{
            return<></>
        }})
    }


    </>
    

}

export default ItemCard;