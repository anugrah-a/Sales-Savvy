import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "../style/signinUp.module.css";
import Button from '../components/Button';
import Textbox from '../components/Textbox';

export default function SignIn() {
	const [username, setUsername] = useState("")
	const[password, setPassword] = useState("")
	const navigate = useNavigate()
	async function handleSubmit(e) {
		e.preventDefault();

		const data = {
			username,
			password
		};

		try {
			const resp = await fetch('http://localhost:8080/users/signIn', {
				method: 'post',
				headers: {
            	    'Content-Type': 'application/json',
					"Accept": "text/plain" 
                },
                body: JSON.stringify(data)
			});

			const msg = await resp.text();
			//alert(msg);
			if(msg === 'admin') {
				localStorage.setItem("username",username)
				navigate('/admin')
			}
			else if (msg === 'customer'){
				localStorage.setItem("username",username)
				navigate('/customer_home')

			}
			else {
				alert("user does not exist")
			}
		} catch (error) {
			console.error("Error: ", error);
			alert('Failed to submit data');
		}
		
	}
	
	return (
		<>
		<div className= {styles.body}>
			
			
			
			<h4 className={styles.h4}>Sign In</h4>

			<form className={styles.form} onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<Textbox name ="username" value={username}
					onChange={(e) => setUsername(e.target.value)}/>
				<br /><br />
				<label htmlFor="password">Password</label>
				<Textbox type="password" name='password' value={password}
					onChange={(e) => setPassword(e.target.value)}/>
				<br /><br />
				<Button type='submit' text="Submit" />
			</form>

				<div className={styles.signupContainer}>
					<Button  variant='switchButton'
  
						onClick={() => { navigate('/sign_up') }} text="Create an account" />
				</div>
			</div>
		</>
	)
}
