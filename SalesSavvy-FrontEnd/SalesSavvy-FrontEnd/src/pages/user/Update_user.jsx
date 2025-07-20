import React from 'react'
import { useState } from 'react';
import styles from "../../style/signinUp.module.css"
import Button from '../../components/Button'
import Textbox from '../../components/Textbox';
import Label from '../../components/Label/Label';
export default function Update_user() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("")
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
      setUsername(data.username)
      setEmail(data.email)
      setRole(data.role)
      setGender(data.gender)
      setDob(data.dob)
      setPassword(data.password)
      setError("");
    }
    catch (error) {
      console.log(error)
      setError("Something went wrong searching")
    }
  }



  async function update(e) {
    e.preventDefault()
    const data = {
      username, email, password, gender, dob, role
    }

    try {
      const resp = await fetch('http://localhost:8080/users/manage/updateUser',{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(resp.ok) {
        alert("User updated successfully")
        return
      }
      else {
        const msg = resp.text()
        alert(msg)
        return
      }
    }
    catch (error) {
      console.log(error)
      alert("something went wrong updating")
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="username" text ="Username"/>
        <Textbox value={username}
          onChange={(e) => { setUsername(e.target.value) }} required />
        <Button type='submit' text="Submit" />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user &&
        <div>
          <h4>Add new user</h4>
          <form className={styles.form} onSubmit={update}>
            <Label htmlFor="username" text ="Username"/>
            <Textbox name="username" value={username}
              onChange={(e) => setUsername(e.target.value)} required />
            <br /><br />

            <Label htmlFor="email" text="Email" />
            <Textbox type="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <br /><br />

            <Label htmlFor="password" text="Password" />
            <Textbox type="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <br /><br />

            
            <Label htmlFor="gender" text="Gender" />
            <div className={styles['gender-role-group']}>
              <label><input type="radio" name="gender" value="M" checked={gender === "M"} onChange={(e) => setGender(e.target.value)} /> Male</label>
              <label><input type="radio" name="gender" value="F" checked={gender === "F"} onChange={(e) => setGender(e.target.value)} /> Female</label>
              <label><input type="radio" name="gender" value="O" checked={gender === "O"} onChange={(e) => setGender(e.target.value)} /> Other</label>
            </div>
            <br /><br />

            <Label htmlFor="dob" text="DOB"/>
            <Textbox type="date" name="dob" value={dob}
              onChange={(e) => setDob(e.target.value)} />
            <br /><br />
            <Label htmlFor="role" text="Role"/>
            <div className={styles['gender-role-group']}>
              <label><input type="radio" name="role" value="admin" checked={role === "admin"} onChange={(e) => setRole(e.target.value)} /> Admin</label>
              <label><input type="radio" name="role" value="customer" checked={role === "customer"} onChange={(e) => setRole(e.target.value)} /> Customer</label>
            </div>

            <br /><br />

            <Button type='submit' text="Update user"/>
            </form>
        </div>
      }
    </>
  )
}
