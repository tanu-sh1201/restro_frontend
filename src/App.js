import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import ItemContainer from "./pages/Item"
import React, { useState, useEffect } from "react";
import {QueryClient, QueryClientProvider} from 'react-query'


// import { Register } from "./pages/register"
import Link from "./pages/link";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Checkout from './pages/checkout';


function App() {
  const [auth,setAuth]=useState('')
  const queryClient = new QueryClient()
		console.log(auth);

    useEffect(() =>{
      let authToken = localStorage.getItem("user");
      setAuth(authToken);
    }, [])
  
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">

    <Routes >

       { auth ? <>
              <Route path="/" element={<Home/>} >
                <Route index element={<ItemContainer/>} />
             </Route>
             <Route path="/cart" element={<Cart/>} />
             <Route path='/checkout' element={<Checkout/>} />
          </> :
        (<Route path= "/" element={<Link  setAuth={setAuth}/>}/>)
  }

        
    </Routes>
    
      
    </div>
    </QueryClientProvider>
  );
}

export default App;
 