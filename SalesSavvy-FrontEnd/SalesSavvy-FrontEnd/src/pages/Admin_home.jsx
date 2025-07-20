import React from "react";
import { NavLink } from "react-router-dom";

export default function Customer_home() {
    return (
        <>
            <h4>Admin Home</h4>

            <div>
                <NavLink to = {"/product_management"}>Product Management</NavLink>
                <br />
                <NavLink to = {"/user_management"}>User Management</NavLink>
            </div>
        </>
        
    )
}