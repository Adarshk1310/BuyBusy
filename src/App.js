import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Items from "./Components/Items/Items";
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom';
import LoginPage from "./Components/LoginPage/LoginPage";
import OrderPage from "./Components/Orders/Orders";
import SignUpPage from "./Components/SignUpPage/signUpPage";
import Cart from "./Components/Cart/Cart";
import {  useSelector } from "react-redux";
import { authSelector } from "./authReducer";


function App() {

    const {isLoggedIn} = useSelector(authSelector);

  const router = createBrowserRouter([
    { path:'/',
      element:<Navbar />,
      children:[
                {index:true,element:<Items />},
                {path:'signIn',element:isLoggedIn?<Navigate to="/" />: <LoginPage />},
                {path:'/userCart',children:[
                  {path:':id',children:[
                    {
                      path:'cart',element:<Cart />
                    }]}
                ]},

                {path:'/userOrders',children:[
                  {
                    
                      path:':id',children:[{
                        path:'orders',element:<OrderPage />
                      }] 
                    
                  }
                ]},
                
                {path:'signUp',element:isLoggedIn?<Navigate to="/" />:<SignUpPage/>}
                
    ]}
    
  ])


  return (

  
    <div className="App">
      <RouterProvider router={router}/>

    </div>

    
  );
}

export default App;
