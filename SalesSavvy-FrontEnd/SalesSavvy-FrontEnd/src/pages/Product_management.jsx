import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Product_management() {
  return (
    <>
        <h3>Manage your Products</h3>
        <NavLink to ={"/add_product"}>Add new product</NavLink>
        <br/>
        <NavLink to ={"/update_product"}>Update existing product</NavLink>
        <br/>
        <NavLink to ={"/delete_product"}>Delete product</NavLink>
        <br/>
        <NavLink to ={"/search_product"}>Search product</NavLink>
        <br/>
        <NavLink to ={"/all_product"}>View all products</NavLink>
    </>
  )
}
