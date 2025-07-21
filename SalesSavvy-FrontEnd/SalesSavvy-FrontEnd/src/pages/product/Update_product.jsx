import React from 'react'
import { useState } from 'react'
import Button from '../../components/Button'
import Label from '../../components/Label/Label'
import Textbox from '../../components/Textbox'
export default function Update_product() {
  const [productName, setProductName] = useState("");
  const [productList, setProductList] = useState([])
  const [product, setProduct] = useState("")
  const [error, setError] = useState("")
  const [productId, setProductId] = useState("")
  const [description,setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState("")
  const [category, setCategory] = useState("")
  async function fetchProductByName(e) {
    e.preventDefault()
    setError("")
    setProductList([]);
    setProductId("")
    try {
      const resp = await fetch(`http://localhost:8080/products/searchProduct?productName=${productName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (resp.ok) {
        const data = await resp.json();
        if (data.length === 0) {
          setError("No product found")
        } else {
          setProductList(data);
        }
      } else {
        const message = await resp.text();
        alert(message)
        setError(message);
      }

    } catch (error) {
      console.log(error)
      setError("something went wrong")
      return;
    }
  }

  async function fetchProductById(e) {
    e.preventDefault()
    setError("")
    setProduct("")

    try {
      const resp = await fetch(`http://localhost:8080/products/getProductById?productId=${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!resp.ok) {
        const message = await resp.text();
        setError(message);
        alert(message)
      }
      const data = await resp.json();
      setProduct(data)
      setProductName(data.name)
      setCategory(data.category)
      setDescription(data.description)
      setPrice(data.price)
      setPhoto(data.photo)

    }
    catch (error) {
      setError(error.message)
      console.log(error.message || "unknown error caught")
    }

  }

  return (
    <>
      <form onSubmit={fetchProductByName}>
        <Label htmlFor="productName" text="Enter product name" />
        <Textbox name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <Button type='submit' text="Search product" />
      </form>

      {productList.length > 0 && (
        <form onSubmit={fetchProductById}>
          <Label htmlFor="productId" text="Enter product ID to update" />
          <Textbox name="productId" value={productId} onChange={(e) => setProductId(e.target.value)} />
          <Button type='submit' text="Search" />
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {productList.length > 0 && productList.map((productList, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            padding: '16px',
            marginBottom: '16px',
            maxWidth: '400px',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <h3 style={{ color: '#333' }}>Product id {productList.id}</h3>
          <h3 style={{ color: '#333' }}>{productList.name}</h3>
          <p style={{ color: '#555' }}>{productList.description}</p>
          <p style={{ fontWeight: 'bold', color: '#008000' }}>₹{productList.price}</p>
        </div>
      ))}

      {product &&
        <div>
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
              onChange={(e) => setCategory(e.target.value)} />

            <br /><br />
            <Button type='submit' text="Add product" />
          </form>
        </div>

      }
    </>
  )
}
