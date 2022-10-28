import { API_URL } from '../lib/config';
import {useEffect,useState} from 'react';
export default function Cart() {

    const [cartItems,setCart]=useState([])

    useEffect(()=>{
        fetch(`${API_URL}/cart/1`)
        .then((res) => res.json())
        .then((data)=>{
            console.log(data);
        })
    },[])     
   

    return(
        <div>
            Hello Tannu
        </div>
    )
    

}

