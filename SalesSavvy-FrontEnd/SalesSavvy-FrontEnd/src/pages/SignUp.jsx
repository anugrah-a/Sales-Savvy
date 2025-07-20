import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "../style/signinUp.module.css"
import Textbox from '../components/Textbox'
import Button from '../components/Button'
export default function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")
    const [role, setRole] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            username,
            email,
            password,
            gender,
            dob,
            role
        };

        try {
            const resp = await fetch('http://localhost:8080/users/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const msg = await resp.text();
            alert(msg);
            if (msg === "User created successfully") {
                navigate('/sign_in')
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit data");
        }
    }

    return (
        <>
        <div className={styles.body}>
            <h4 className={styles.h4}>signup</h4>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Username: </label>
                <Textbox name="username" value={username}
                    onChange={(e) => setUsername(e.target.value)} required/>
                <br /><br />

                <label>Email: </label>
                <Textbox type="email" name="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required/>
                <br /><br />

                <label>Password: </label>
                <Textbox type="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required/>
                <br /><br />

                <label htmlFor={styles.gender}>Gender:</label>
                <div className={styles['gender-role-group']}>
                    <label><input type="radio" name="gender" value="M" checked={gender === "M"} onChange={(e) => setGender(e.target.value)} /> Male</label>
                    <label><input type="radio" name="gender" value="F" checked={gender === "F"} onChange={(e) => setGender(e.target.value)} /> Female</label>
                    <label><input type="radio" name="gender" value="O" checked={gender === "O"} onChange={(e) => setGender(e.target.value)} /> Other</label>
                </div>
                <br /><br />

                <label>DOB: </label>
                <Textbox type="date" name="dob" value={dob}
                    onChange={(e) => setDob(e.target.value)} />
                <br /><br />
                <label htmlFor={styles.role}>Role:</label>
                <div className={styles['gender-role-group']}>
                    <label><input type="radio" name="role" value="admin" checked={role === "admin"} onChange={(e) => setRole(e.target.value)} /> Admin</label>
                    <label><input type="radio" name="role" value="customer" checked={role === "customer"} onChange={(e) => setRole(e.target.value)} /> Customer</label>
                </div>

                <br /><br />

                <Button type="submit" text="Sign Up"/>
            </form>
            <div className={styles.signupContainer}>

                <Button text="Already have an account?" variant='switchButton' onClick={() => { navigate('/sign_in') }}/>

            </div>
            </div>
        </>

    )
}
