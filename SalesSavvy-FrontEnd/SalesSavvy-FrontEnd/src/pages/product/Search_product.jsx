import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Textbox from '../../components/Textbox'
import Label from '../../components/Label/Label'
export default function Search_product() {
  const [productName, setProductName] = useState("")
  const [product, setProduct] = useState([])
  const [error, setError] = useState("")
  const [productId, setProductId] = useState("")


  async function fetchData(e) {
    e.preventDefault()
    setError("")
    setProduct([]);
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

  
  return (
    <>
      <form onSubmit={fetchData}>
        <Label htmlFor="productName" text="Product name" />
        <Textbox name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <Button type='submit' text="Search"/>
      </form>
      
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
