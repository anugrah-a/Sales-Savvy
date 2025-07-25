import React, { use, useState } from 'react'
import styles from "../../style/signinUp.module.css"
import Button from '../../components/Button';
import Textbox from '../../components/Textbox';
import Label from '../../components/Label/Label';
export default function Add_user() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [gender,setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      username, email, password, gender, dob
    }

    try {
      const resp = await fetch('http://localhost:8080/users/manage/addUser',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(resp.ok) {
        alert("User added successfully")
      }
    }
    catch(error) {

    }
    
  }
  return (
    <>
      <div>
        <h4>Add new user</h4>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Label htmlFor="username" text ="Username"/>
          <Textbox name="username" value={username}
            onChange={(e) => setUsername(e.target.value)} required />
          <br /><br />

          <Label htmlFor="email" text="Email"/>
          <Textbox type="email" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <br /><br />

          <Label htmlFor="password" text="Password"/>
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

          <Button type='submit' text="Add user"/>
        </form>
      </div>
    </>
  )
}
