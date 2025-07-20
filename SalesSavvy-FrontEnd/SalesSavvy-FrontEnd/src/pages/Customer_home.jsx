import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import '../style/Customer_home.module.css';
export default function Customer_home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/products/getAllProduct')
                if (!response.ok) {
                    throw new error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data)
            }
            catch (error) {
                setError(error)
            }
            finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    async function handleAddToCart(product, qty = 1) {
        const username = localStorage.getItem("username");
        if (!username) return alert("Please sign in first");

        try {
            const resp = await fetch("http://localhost:8080/products/addToCart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id, username : username, quantity: qty })
            });
            const msg = await resp.text();
            if(msg=== "cart added")
            {
                alert(`Added “${product.name}” (x${qty}) to cart`)
            }
            else {
                alert(msg);
            } 
        } catch (err) {
            console.error(err);
            alert("Could not add to cart due to err");
        }

        
    }
    const filtered = products.filter((p) =>
        (p.name + p.description)
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    return (
        <>  
            <section className="customer-home">
                <header className="shop-header">
                    <h1 className="shop-title">Welcome to Sales Savvy</h1>
                    <p className="shop-tagline">
                        Discover curated deals, fresh arrivals and lightning-fast delivery.
                        Scroll down to start shopping!
                    </p>

                    <button
                        
                        onClick={() => navigate("/cart")}
                    >
                        Go to Cart 🛒
                    </button>
                    

                    {/*
                    <input
                    className="shop-search"
                    type="text"
                    placeholder="Search products…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    */}
                </header>

                <div className="container">
                    {loading && <p className="text-center">Loading…</p>}
                    {error && <p className="text-center text-danger">{error}</p>}

                    {!loading && !error && (
                        filtered.length ? (
                            <div className="products-grid">
                                {filtered.map((p) => (
                                    <ProductCard
                                        key={p.id}
                                        product={p}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No products match your search.</p>
                        )
                    )}
                </div>
            </section>
        </>
    )
}