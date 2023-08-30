import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cart'
import "./CSS/cart.css"
const SHIPPING_CHARGES=25

function Cart() {
  const{cart,removeFromCart,increaseQuantity,decreaseQuantity}=useCart();
  cart.map((item)=>(console.log(item,"id")))
  const cartTotal=()=>{
    return cart.reduce((acc,item)=>acc+item.product.price*item.quantity,0)
  }

  const round=(value,decimal)=>{
    return Number(Math.round(value+"e"+decimal)+"e-"+decimal)
  }
  return (
    <div className="cartWrapper">
            <div className="cart-container">
                {cart.length >= 1 ? (
                    <div className="cart-grid my-5">
                        <div className="cartItem p-3">
                            <h2>Order Summary</h2>
                            {cart.map((item) => (
                                <div className="cart-item" key={item.product.id}>
                                    <div className="cart-item-grid py-3">
                                        <div className="cart-itemImage">
                                            <img src={item.product.image} alt={item.product.image} />
                                        </div>
                                        <div className="itemDesc">
                                            <div className="title">
                                                <Link to={"/products/" + item.product.id} className="titleLink">
                                                    {item.product.title}
                                                </Link>
                                            </div>
                                            <span className="price">Price: ${round(item.product.price * item.quantity, 2)}</span>
                                        </div>
                                        <div className="itemControl flex">
                                            <div>
                                                <button
                                                    onClick={() => increaseQuantity(item.product.id)}
                                                    className="addQty"
                                                >
                                                    +
                                                </button>
                                                <span className="mx-1 qty-text">{item.quantity}</span>
                                                <button
                                                    onClick={() => decreaseQuantity(item.product.id)}
                                                    disabled={item.quantity === 1}
                                                    className="removeQty"
                                                >
                                                    -
                                                </button>
                                                <div
                                                    className="remove my-1"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="payment p-3">
                            <h2>Payment Summary</h2>
                            <div className="payment-summary py-3 my-2">
                                <div className="charges-cont">
                                    <div className="flex py-1">
                                        <span>Subtotal:</span>
                                        <span className="price">${round(cartTotal(), 2)}</span>
                                    </div>
                                    <div className=" flex py-1">
                                    <span>Total:</span>
                                    <span className="price">${round(cartTotal() + SHIPPING_CHARGES, 2)}</span>
                                     </div>
                                </div>
                                <div className="flex py-1">
                                    <span>Shipping Fee:</span>
                                    <span className="price">${SHIPPING_CHARGES}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="error">
                        <p>&#9432; Cart is empty</p>
                    </div>
                )}
            </div>
        </div>
  )
}

export default Cart
