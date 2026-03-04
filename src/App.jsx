import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Products from './Pages/Products.jsx'
import Cart from './Pages/Cart.jsx'
import Contact from './Pages/Contact.jsx'
import About from './Pages/About.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import SingleProduct from './Pages/SingleProduct.jsx'
import CategoryProduct from './Pages/CategoryProduct.jsx'
import Payment from './Pages/Payment.jsx'
import Order from './Pages/Order.jsx'
import Help from './Pages/Help.jsx'
import SingleOrder from './Pages/SingleOrder.jsx'
import { Divide } from 'lucide-react'
import Wishlist from './Pages/Wishlist.jsx'
import Cancel from './Pages/Cancel.jsx'



function App() {


  return (
    
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/products/:id" element={<SingleProduct/>} />
        <Route path='/category/:category' element={<CategoryProduct/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<SingleOrder/>} />
        <Route path="/help" element={<Help />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cancel/:id" element={<Cancel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
