import { API_URL } from "../lib/config";
import { useQuery, useMutation } from "react-query";
import { useEffect, useState } from "react";
// import Nav from "../components/navBar";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const {
    data: cartItems,
    isLoading: cartItemsLoading,
    refetch: refetchFoodItems,
  } = useQuery(
    "cart",
    async () =>
      await fetch(`${API_URL}/cart/${userId}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }).then((res) => res.json()),
    { enabled: true }
  );

  const getQuantity = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
        return myArray[i];
      }
    }
  };

  const updateCart = (id, action) => {
    console.log(
      { id },
      localStorage.getItem("user"),
      "add",
      getQuantity(id, cartItems.items).id
    );
    fetch(`${API_URL}/cart/update/${id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("user"),
        itemId: id,
        action: action,
        quantity: getQuantity(id, cartItems.items).quantity,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(async (data) => await refetchFoodItems())
      .catch((err) => console.log(err));
  };

  const clickHandler = () => {
    navigate("/checkout");
  }

  
  return cartItemsLoading ? (
    <div>Loading...</div>
  ) : (
    <>
    {/* <div className="cart-Nav">
    <Nav/>
    </div> */}
    <div>
      <div className="food-container">
        {cartItems.items?.map(({ id, name, price, quantity, userId }) => {
          // setQuantity(quantity)
          return (
            // <img src={`data:image/jpeg;base64,${imageSrc}`} />

            <div key={id} className="cart-item">
              {/* <img src={`data:image/jpeg;base64,${imageSrc}`} /> */}
              <div className="cart-item-body">
                <div>
                  <p>{name}</p>
                  <p>price :{price}</p>
                </div>
                <div className="updateCart-Container">
                  <button
                    id={id}
                    onClick={(e) => {
                      updateCart(e.target.id, "add");
                    }}
                  >
                    +
                  </button>
                  <p>{quantity}</p>
                  <button
                    id={id}
                    onClick={(e) => {
                      updateCart(e.target.id, "sub");
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="updateCart">
        <p>Total :{cartItems.CartTotal}</p>
      </div>
      <div>
        <button type="submit" onClick={clickHandler}>CHECKOUT</button>
      </div>
    </div>
    
    </>
  );
}
