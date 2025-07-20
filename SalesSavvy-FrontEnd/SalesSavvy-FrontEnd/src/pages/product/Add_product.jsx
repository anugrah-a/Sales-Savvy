import React, { use } from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Textbox from '../../components/Textbox'
import Label from '../../components/Label/Label'
export default function Add_product() {

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState(0)
	const [photo, setPhoto] = useState("")
	const [category, setCategory] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		const data = { name, description, price, photo, category };

		try {
			const resp = await fetch('http://localhost:8080/products/addProduct', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			const msg = await resp.text();
            alert(msg);
			if(msg === "Product added") {
				navigate("/add_product");
			}
			
		}
		catch (error) {
			console.error("Error:", error);
            alert("Failed to submit data");
			navigate('/add_product');
		}

  }
 


  return (
    <>
      <h4>Add Product</h4>
      <form onSubmit={handleSubmit}>
        <Label htmlFor='name' text="Product name" />
        <Textbox id='name' name="name" value={name}
          onChange={(e) => setName(e.target.value)} />
        <br /><br />

        <Label htmlFor='description' text="Description" />
        <Textbox id='description' name="description" value={description}
          onChange={(e) => setDescription(e.target.value)} />
        <br /><br />

        <Label htmlFor='price' text="Price" />
        <Textbox id='price' name="price" value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <br /><br />
        <Label htmlFor='photo' text="Photo" />
        <Textbox id='photo' name="photo" value={photo}
          onChange={(e) => setPhoto(e.target.value)} />
        <br /><br />

        <Label htmlFor='category' text="Category" />
        <Textbox id='category' name='category' value={category}
          onChange={(e) => setCategory(e.target.value)}/>

        <br /><br />
        <Button type='submit' text ="Add product" />
      </form>
    </>
  )
}
