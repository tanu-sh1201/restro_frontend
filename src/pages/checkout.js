import { useNavigate } from "react-router-dom"


export default function Checkout() {
    const navigate =useNavigate();
    setTimeout(function(){
        navigate("/")
    }, 1000)
    return (
        <div >
    {/* //     style={{ backgroundImage: "url(/checkoutImage/checkout.jpeg)" },
    //                 width: "100%",
    
    //                 "height": "100vh;
    // background-repeat: no-repeat;
    // background-size: cover;
    // display: flex;
    // justify-content: center;
    // align-items: center;}> */}
          <h2>Thanks for Ordering from Khana khajana!!! </h2>
      </div>
    )
}