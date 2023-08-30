import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./CSS/productItem.css"

function ProductItem({data, addToCart}) {
    const {id,image,title,price}=data
  return (
    <div className='fproduct-card'>
        <div className="grid">
            <div className="fproduct-image">
                <img src={image} alt="" />
            </div>
            <div className="f-product-title">
                <Link to={`/products/${id}`} className='link titleLink'>
                    {title}
                </Link>
            </div>
            <div className="f-product-flex">
                <span className="price" style={{marginRight:15}}>
                    Price: ${price}
                </span>
                <div className="cart" onClick={addToCart}>
                    <ShoppingCartIcon style={{width:"24px",height:"24px"}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductItem
