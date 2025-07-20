import React, { useState } from 'react'
import styles from "../../style/signinUp.module.css"
import Button from '../../components/Button'
import Textbox from '../../components/Textbox'
import Label from '../../components/Label/Label'
export default function Search_user() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(username)
      const resp = await fetch(`http://localhost:8080/users/manage/searchUser?username=${username}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        
      });

       if (!resp.ok) {
        const message = await resp.text();
        setError(message);
        return;
      }
      const data = await resp.json();
      setUser(data);
      setError("");
    }
    catch (error) {
      console.log(error)
      setError("Something went wrong")
    }

  }
  return (
    <>
      <h4>Search user</h4>
      <div>
        <form onSubmit={handleSubmit} >
          <Label htmlFor="username" text="Enter username" />
          <Textbox id='username' value={username} onChange={(e) => { setUsername(e.target.value) }}
          />
          <Button type='submit' text="Search user"/>
          
        </form>
        {
          error && <p>
            {error}
          </p>
        }
        {user &&
          <div>
            <h4>User details</h4>
            <p>UserID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            <p>DOB {user.dob}</p>
            <p>Role {user.role}</p>

          </div>
        }
      </div>
    </>
  )
}
