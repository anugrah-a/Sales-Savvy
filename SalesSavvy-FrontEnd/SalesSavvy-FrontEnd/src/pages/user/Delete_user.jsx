import React, { useState } from 'react'
import Button from '../../components/Button'
import Textbox from '../../components/Textbox';
export default function Delete_user() {
  const [username, setUsername] = useState("")



  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username
    };

    try {
      const resp = await fetch('http://localhost:8080/users/manage/deleteUser', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (resp.ok) {
        alert("User deleted")
      } else {
        const errorMessage = await resp.text();
        alert(errorMessage)
      }

    }
    catch (error) {
      console.log(error)
      alert("error")
    }

  }
  return (
    <>
      <div>
        <h4>Delete user</h4>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <Textbox id='username' value={username} onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Button type='submit' text="Submit"/>
        </form>
      </div>
    </>
  )
}
