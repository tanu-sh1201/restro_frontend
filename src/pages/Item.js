import {useEffect, useState, useContext} from 'react';
// import Nav from './components/navBar;

import {useQuery, useMutation} from 'react-query'
import { json } from 'react-router-dom';
import { API_URL } from '../lib/config';

export default function ItemContainer() {
	
	const {data: foodItems, isLoading: foodItemsLoading, refetch: refetchFoodItems} = useQuery('Dishes', () => fetch(`${API_URL}/dish`,{
		headers:{
			Authorization: localStorage.getItem("token")
		}
	})
	.then((res) => res.json())
	.then((data) => 
	data.map(dish => {
			const base64 = btoa(
				dish.image.data.reduce((data, byte) => data + String.fromCharCode(byte),''))
			return {
				...dish,
				imageSrc: base64,
			}
		})
	
	), {
		enabled: true
	})

	const addItemToCart = (id) => {
		fetch(`${API_URL}/addToCart`, {
			method :"POST",
			body: JSON.stringify({
				userId: localStorage.getItem("user"),
				itemId: id,
			}),
			headers: {
				"Content-type": "application/json",
				"Authorization":localStorage.getItem('token')
				
			}
		})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err)=>console.log(err))
	}

	return (
		
			foodItemsLoading ? <div>Loading...</div> : <div className="food-container">
			{
				foodItems?.map(({id, name, price, imageSrc}) =>{
					return (
						// <img src={`data:image/jpeg;base64,${imageSrc}`} />

						<div key={id} className="food-item">

							<img src={`data:image/jpeg;base64,${imageSrc}`} />
							<div className="food-item-body">
							<div>
							<p>{name}</p>
							<p>price :{price}</p>
							</div>
							<button className="button-conatiner" onClick={() => {addItemToCart(id)}} >Add</button>
							</div>

						</div>
						)
				})
			}
		</div>
		

		
	)
}