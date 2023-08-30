import './App.css';
import {Routes, Route,useNavigate,createSearchParams} from 'react-router-dom'
import Navbar from './components/Navbar';
import Product from './components/Product';
import Home from './components/Home';
import Cart from './components/Cart';
import PageNotFound from './components/PageNotFound';
import { useCart } from './context/cart';

function App() {

  const {cartItemCount}=useCart();
  // filter products using search
  const navigate=useNavigate();
  const onSearch=(searchQuery)=>{
    navigate(`/?${createSearchParams({q:searchQuery})}`)
  }


  return (
    <>
    <Navbar onSearch={onSearch} cartItemCount={cartItemCount()}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/products/:productId" element={<Product/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    
    </>
  );
}

export default App;
