import { useDispatch, useSelector } from "react-redux";
import styles from "./viewImage.module.css";
import { actions, itemSelector } from "../../reducers";


export const ViewImage = ()=>{
    const dispatch =useDispatch();
    const {currentImage}= useSelector(itemSelector);

    const handleClose =()=>{
        dispatch(actions.setViewImage());
    }

    return<>

        <div className={styles.mainDiv}>
            <div className={styles.imageDiv}>
                <img src={currentImage} alt="productimage"></img>
            </div>
            <button onClick={handleClose}>X</button>
        </div>
    
    </>
}