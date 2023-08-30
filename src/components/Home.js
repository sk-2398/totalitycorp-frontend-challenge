import React,{useEffect,useState} from 'react'
import { FakeStoreApi } from '../Services/store'
import ProductItem from './ProductItem'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import "./CSS/home.css"
import Slide from './Slide'



function Home() {
  const {addToCart}=useCart();
  const [loading,setLoading]=useState(true);
  const [products,setProducts]=useState([]);
  const [query]=useSearchParams();

//   To show proucts
  const searchQeury=query.get('q');
  useEffect(()=>{
    const fetchProducts=async()=>{
        
            setLoading(true);

            const products=searchQeury?await FakeStoreApi.fetchProductsBySearch(searchQeury)
            :await FakeStoreApi.fetchAllProducts();
            setProducts(products);
            setLoading(false)
        
            console.log(products)
    }
    fetchProducts().catch(console.error)
  },[searchQeury])

  if(!loading && searchQeury && !products.length){
    return(
        <div className="continer">
            <div className="product py-2">
                <div className="details p-3">No products/category matching your search</div>
            </div>
        </div>
    )
  }
  return (
    <>
      <div className="first-container">
        <div className="products f-products-cont my-5">
              <h1 className='f-cont-title'>Top Products</h1>
            <div className="products-grid">
                {
                    loading?(<div className="loader"/>):
                    (
                        products.slice(0,6).map((product)=>(
                            <ProductItem key={product.id} data={product} addToCart={()=>addToCart(product)}/>
                        ))
                    )
                }
            </div>
        </div>
      </div>
      <div className="sec-container">
        <Slide products={products} className="s-products-container"></Slide>
      </div>
    </>
  )
}

export default Home
