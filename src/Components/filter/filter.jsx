import {  useState } from "react";
import styles from "./filter.module.css";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers";


const Filter =()=>{
    const [price,setPrice] =useState("0");
 
    const dispatch =useDispatch();

    const handleChangeMensClothing=(e)=>{
        const checked = e.target.checked;
        if(checked){

            dispatch(actions.setMensClothing("mensclothing"));
            dispatch(actions.setCategory(true));
            dispatch(actions.setMensFlag());

          
        }else{
            dispatch(actions.setMensClothing(""));
            dispatch(actions.setCategory(false));
            dispatch(actions.setMensFlag());

           
        }
    }

    //when womens clothing is checked


    const handleChangeWomensClothing=(e)=>{
        const checked = e.target.checked;
        if(checked){
            dispatch(actions.setWomensClothing("womensclothing"));
            dispatch(actions.setCategory(true));
            dispatch(actions.setWomensFlag());
         

        }else{

            dispatch(actions.setWomensClothing(""));
            dispatch(actions.setCategory(false));
            dispatch(actions.setWomensFlag());

        }
    }

    //when jewellery is checked

    const handleChangejewellery=(e)=>{
        const checked = e.target.checked;
        if(checked){
            dispatch(actions.setJewellery("jewellery"));
            dispatch(actions.setCategory(true));
            dispatch(actions.setJewelleryFlag());
     

        }else{
            dispatch(actions.setJewellery(""));
            dispatch(actions.setCategory(false));
            dispatch(actions.setJewelleryFlag());
           
        }
    }

    //when electronics is checked

    const handleChangeElectronics=(e)=>{
         const checked = e.target.checked;
        if(checked){
            dispatch(actions.setElectronics("electronics"));
            dispatch(actions.setCategory(true));
            dispatch(actions.setElectronicsFlag());
            
        }else{   
            dispatch(actions.setElectronics(""));
            dispatch(actions.setCategory(false));
            dispatch(actions.setElectronicsFlag());

        }
    }

    
    return<>

        <div className={styles.filterMain}>
            <div className={styles.filterRange}><h2>Filter</h2><p>Price: &#x20B9;{price}</p><input type="range" name="points" min="0" max="350000" step="500"  onChange={(e)=> {setPrice(e.target.value);dispatch(actions.setMinPrice(e.target.value))}}></input></div>
            <div className={styles.category}><h2>Category</h2>
            <div><input type="checkbox" onChange={e => handleChangeMensClothing(e)} ></input><span>Men's Clothing</span></div>
            <div><input type="checkbox" onChange={e => handleChangeWomensClothing(e)}></input><span>Women's Clothing</span></div>
            <div><input type="checkbox" onChange={e => handleChangejewellery(e)}></input><span>Jewellery</span></div>
            <div><input type="checkbox" onChange={e => handleChangeElectronics(e)}></input><span>Electronics</span></div>

            </div>
        </div>
    
    
    
    </>

}


export default Filter;