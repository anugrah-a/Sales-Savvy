import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Counter from "./pages/Counter"

import Welcome from "./pages/welcome"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Product_management from "./pages/Product_management";
import Admin_home from "./pages/Admin_home";
import Customer_home from "./pages/Customer_home";
import Add_product from "./pages/product/Add_product"
import Delete_product from "./pages/product/Delete_product"
import Search_product from "./pages/product/Search_product"
import Update_product from "./pages/product/Update_product"

import User_management from "./pages/User_management";
import Add_user from "./pages/user/Add_user"
import Delete_user from "./pages/user/Delete_user"
import Search_user from "./pages/user/Search_user"
import Update_user from "./pages/user/Update_user"
import Cart from "./pages/Cart";
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element = {<Welcome />} />
          <Route path="/sign_in" element = {<SignIn />}/>
          <Route path="/sign_up" element = {<SignUp />}/>
          <Route path="/customer_home" element = {<Customer_home/>}/>

          <Route path ="/admin" element = {<Admin_home/>}/>
          
          <Route path="/product_management" element = {<Product_management/>} />
          <Route path = "/add_product" element ={<Add_product/>}/>
          <Route path = "/delete_product" element ={<Delete_product/>}/>
          <Route path = "/update_product" element ={<Update_product/>}/>
          <Route path = "/search_product" element ={<Search_product/>}/>

          <Route path="/user_management" element = {<User_management/>}/>
          <Route path ="/add_user" element = {<Add_user />}/>
          <Route path ="/delete_user" element = {<Delete_user />}/>
          <Route path ="/update_user" element = {<Update_user />}/>
          <Route path ="/search_user" element = {<Search_user />}/>
          <Route path="/cart" element = {<Cart/>}/>

          <Route path="/counter" element={<Counter />} />
        </Routes>
    </>

    
  )
}

export default App
