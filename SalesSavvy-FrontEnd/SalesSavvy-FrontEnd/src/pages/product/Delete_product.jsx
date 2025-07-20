import React, { useState } from 'react'
import Button from '../../components/Button'
import Textbox from '../../components/Textbox';
export default function Delete_product() {
  const [productName, setProductName] = useState("");
  const [product, setProduct] = useState([])
  const [error, setError] = useState("")
  const [productId, setProductId] = useState("")
  async function fetchData(e) {
    e.preventDefault()
    setError("")
    setProduct([]);
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
          setProduct(data);
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

  async function deleteData(e) {
    e.preventDefault();
    setProductId("")
    const id = productId
    try {
      const resp = await fetch(`http://localhost:8080/products/deleteProduct?productId=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if(resp.ok) {
        const msg = await resp.text();
        alert(msg);
      }
      else {
        const msg = await resp.text();
        alert(msg);
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <form onSubmit={fetchData}>
        <label htmlFor="productName">Enter product name: </label>
        <Textbox name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <Button type='submit' text="Search product"/>
      </form>
      
      {product.length > 0 && (
        <form onSubmit={deleteData}>
          <label htmlFor="productId">Enter product ID to delete : </label>
          <Textbox name="productId" value={productId} onChange={(e) => setProductId(e.target.value)} />
          <Button type='submit' text="Search"/>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product.length > 0 && product.map((product, index) => (
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
          <h3 style={{ color: '#333' }}>Product id {product.id}</h3>
          <h3 style={{ color: '#333' }}>{product.name}</h3>
          <p style={{ color: '#555' }}>{product.description}</p>
          <p style={{ fontWeight: 'bold', color: '#008000' }}>₹{product.price}</p>
        </div>
      ))}

    </>
  )
}
