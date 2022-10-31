import logo from './logo.svg';
import './App.css';
import Nav from './components/navBar'
import {Routes,Route} from 'react-router-dom';
// import { Login } from "./pages/login";
import ItemContainer from "./pages/Item"
import React, { useState } from "react";
import {QueryClient, QueryClientProvider} from 'react-query'
import Checkout from "./pages/checkout"
// import { Register } from "./pages/register"
import Link from "./pages/link";
import Home from "./pages/home";
import Cart from "./pages/cart";

function App() {

  const queryClient = new QueryClient()
  const auth=localStorage.getItem("user")
		console.log(auth);
  
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
    <Routes >

       auth?<Route path="view" element={<Home/>}>
             <Route index element={<ItemContainer/>} />
          </Route>
        <Route path="cart" element={<Cart/>} />
        <Route path ="checkout" element ={<Checkout/>}/>
           : <Route path= "/" element={<Link/>}/>
        
    </Routes>
    
      
    </div>
    </QueryClientProvider>
  );
}

export default App;
 