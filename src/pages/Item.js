import {useEffect, useState, useContext} from 'react';
// import Nav from './components/navBar;
import {Cartcontext} from "../context/cart.context";
import {useQuery, useMutation} from 'react-query'
import { API_URL } from '../lib/config';

export default function ItemContainer() {
	const {cartlist, setCartlist} = useContext(Cartcontext);
	const {data: foodItems, isLoading: foodItemsLoading, refetch: refetchFoodItems} = useQuery('Dishes', () => fetch(`${API_URL}/dish`)
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
				userId: 1,
				itemId: id,
			}),
			headers: {
				"Content-type": "application/json"
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