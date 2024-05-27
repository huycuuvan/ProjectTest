import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, message } from "antd";

const ProductDetail = () => {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);

  console.log(sku);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://api-iston.productminting.com/api/v1/product/${sku}`
        );
        setProduct(response.data.data);
      } catch (error) {
        message.error("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [sku]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Card title={product.name}>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      {/* Add more fields as needed */}
    </Card>
  );
};

export default ProductDetail;
