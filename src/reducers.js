import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebaseInit";
import { doc,setDoc } from "firebase/firestore";
import { onSnapshot,collection } from "firebase/firestore";




const initialState = {
    items:[],
    category:false,
    mensFlag:false,
    womensFlag:false,
    jewelleryFlag:false,
    electronicsFlag:false,
    mensClothing:null,
    womensClothing:null,
    jewelleryItems:null,
    electronicsItems:null,
    minPrice:400000,
    cartproducts:[],
    orders:[],
    totalPrice:[],
    viewImage:false,
    currentImage:'',
    loading:true
}





export const fetchitems =  createAsyncThunk("fetchingItems", (_,thunkAPI)=>{
    onSnapshot(collection(db, "products"), (doc) => {
        
        const firestoreData =  doc.docs.map((col)=>{
           
            return{prodId:col.id,
                    ...col.data()}
            });

            thunkAPI.dispatch(actions.setItems(firestoreData));
          
            thunkAPI.dispatch(actions.setLoading(false));
            
    });
})





const itemSlice =createSlice({
    name:'item',
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setItems:(state,action)=>{
            state.items = [...action.payload];
            // console.log(state.items);
        },
        setAddToBag:(state,action)=>{
            const arr= state.cartproducts.map((i)=>{
                if(i.id===action.payload.id){
                    i.addToBag=true;

                    const pos = doc(db, "cart", action.payload.userId);
                        setDoc(pos, {
                        cartItems:state.cartproducts
                    });
                }
                return i;
            });
            state.cartproducts =[...arr];
        },


        setIncreaseQuantity:(state,action)=>{
            
            const arr= state.cartproducts.map((i)=>{
                if(i.id===action.payload.prod.id){
                    i.quantity+=1;
                    i.price=i.quantity * action.payload.price;

                    const pos = doc(db, "cart", action.payload.userId);
                        setDoc(pos, {
                        cartItems:state.cartproducts
                    });
                }
                return i;
            });
            state.cartproducts =[...arr];
            
            
        },

        setDecreaseQuantity:(state,action)=>{
      
            const arr= state.cartproducts.map((i)=>{
                if(i.id===action.payload.prod.id){
                    if(i.quantity>0){
                        i.quantity-=1;
                      }
                    i.price=i.quantity * action.payload.price;

                    const pos = doc(db, "cart", action.payload.userId);
                        setDoc(pos, {
                        cartItems:state.cartproducts
                    });
                }
                return i;
            });
            state.cartproducts =[...arr];
             
            
        },

        setCategory:(state,action)=>{
            state.category=action.payload;
           
        },
        setMensFlag:(state,action)=>{
            state.mensFlag=!state.mensFlag;
           
        },
        setWomensFlag:(state,action)=>{
            state.womensFlag=!state.womensFlag
        },
        setJewelleryFlag:(state,action)=>{
            state.jewelleryFlag=!state.jewelleryFlag
        },
        setElectronicsFlag:(state,action)=>{
            state.electronicsFlag=!state.electronicsFlag
        },
        setMensClothing:(state,action)=>{
            state.mensClothing=action.payload
        },
        setWomensClothing:(state,action)=>{
            state.womensClothing=action.payload
        },
        setJewellery:(state,action)=>{
            state.jewelleryItems=action.payload
        },
        setElectronics:(state,action)=>{
            state.electronicsItems=action.payload
        },
        setMinPrice:(state,action)=>{
            state.minPrice=action.payload
        },
        setCartProducts:(state,action)=>{
            state.cartproducts= [...action.payload]
        },
        setOrders:(state,action)=>{
            state.orders=[...action.payload]
        },
        setTotalPrice:(state,action)=>{
          
            state.totalPrice =action.payload
            
        },
        setViewImage:(state,action)=>{
            state.viewImage=!state.viewImage
        },
        setCurrentImage:(state,action)=>{
            state.currentImage=action.payload;
            console.log("action paylod",action.payload);
            console.log("state",state.currentImage);
        }
    }
})


export const itemReducer = itemSlice.reducer;
export const actions = itemSlice.actions;
export const itemSelector = (state)=>state.itemReducer;