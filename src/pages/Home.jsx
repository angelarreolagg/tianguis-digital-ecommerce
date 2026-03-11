import { Link } from "react-router-dom";
import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const products = getProducts();

  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Your Ultimate Geek Treasure Hunt</h1>
        <p className="home-subtitle">
          Join the most vibrant community of collectors. High-end figures and
          rare finds delivered straight from our tianguis to your doorstep.
        </p>
        <p></p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
