import React, { useEffect, useState } from 'react';
import { FakeStoreApi } from '../Services/store';
import { Link, useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/cart';
import './CSS/product.css'





function Product() {
  const {addToCart}=useCart()
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null); // Initialize with null
  const { productId } = useParams(); // Extract the 'productId' parameter

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await FakeStoreApi.fetchProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  if (!loading && !product) {
    return (
      <div className="container">
        <div className="product py-2">
          <div className="details p-3">
            Product Not Found. Please visit{' '}
            <Link to="/" replace>
              home
            </Link>{' '}
            to see all available products.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {loading?(
        <div className="loader"></div>
      ):
      (
        <div className="product-detail py-2">
            <div className="details-grid p-3">
                <div className="product-detail-image">
                    <img src={product.image} alt="product" />
                </div>
                <div className="product-info">
                    <div className="product-description">
                        <h3>{product.title}</h3>
                        <p className="my-2">{product.description}</p>
                    </div>
                    <div className="product-flex">
                        <span className="price">Price: ${product.price}</span>
                        <span className='cart' onClick={()=>addToCart(product)}><ShoppingCartIcon style={{width:"44px",height:"44px"}}/></span>
                    </div>
                </div>
            </div>
        </div>
      )

      }
    </div>
  );
}

export default Product;
