import React from 'react'
import { NavLink } from 'react-router-dom'
export default function User_management() {
  return (
    <>
        <h3>Manage Users</h3>
        <NavLink to ={"/add_user"}>Add new user</NavLink>
        <br/>
        <NavLink to ={"/update_user"}>Update existing user</NavLink>
        <br/>
        <NavLink to ={"/delete_user"}>Delete user</NavLink>
        <br/>
        <NavLink to ={"/search_user"}>Search user</NavLink>
        <br/>
        
    </>
  )
}
