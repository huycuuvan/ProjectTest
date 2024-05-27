import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal, message, Input, Select } from "antd";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail"; // Import component ProductDetail
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import "../assets/styles.css"; // Import CSS

const { Option } = Select;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]); // Danh sách các danh mục
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilterAndSearch();
  }, [products, searchKeyword, filterCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://api-iston.productminting.com/api/v1/product"
      );

      const productsData = response.data.data;
      console.log(productsData);
      if (Array.isArray(productsData)) {
        setProducts(productsData);
        extractCategories(productsData); // Trích xuất danh mục từ dữ liệu sản phẩm
      } else {
        message.error("Failed to fetch products: Data is not an array");
      }
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  const extractCategories = (products) => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.sku)),
    ];
    setCategories(uniqueCategories);
  };

  const handleSave = async (product) => {
    if (currentProduct) {
      // Cập nhật sản phẩm
      try {
        const response = await axios.put(
          `https://api-iston.productminting.com/api/v1/product/${currentProduct.id}`,
          product
        );
        setProducts(
          products.map((p) => (p.id === currentProduct.id ? response.data : p))
        );
        message.success("Product updated successfully");
      } catch (error) {
        message.error("Failed to update product");
      }
    } else {
      // Thêm sản phẩm mới
      try {
        const response = await axios.post(
          "https://api-iston.productminting.com/api/v1/product/add",
          product
        );
        setProducts([...products, response.data]);
        message.success("Product added successfully");
      } catch (error) {
        message.error("Failed to add product");
      }
    }
    setIsModalVisible(false);
    setCurrentProduct(null);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api-iston.productminting.com/api/v1/product/${id}`
      );
      setProducts(products.filter((p) => p.id !== id));
      message.success("Product deleted successfully");
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleFilterAndSearch = () => {
    let tempProducts = [...products];
    if (searchKeyword) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    if (filterCategory) {
      tempProducts = tempProducts.filter(
        (product) => product.category === filterCategory
      );
    }
    setFilteredProducts(tempProducts);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.sku}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="tabled">
              <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                  <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Products Table"
                    extra={
                      <>
                        <Input
                          placeholder="Search by name"
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)}
                          style={{ width: 200, marginRight: 10 }}
                        />
                        <Select
                          placeholder="Filter by category"
                          value={filterCategory}
                          onChange={(value) => setFilterCategory(value)}
                          style={{ width: 200, marginRight: 10 }}
                        >
                          <Option value="">All</Option>
                          {categories.map((category) => (
                            <Option key={category} value={category}>
                              {category}
                            </Option>
                          ))}
                        </Select>
                        <Button
                          type="primary"
                          onClick={() => setIsModalVisible(true)}
                        >
                          Add Product
                        </Button>
                      </>
                    }
                  >
                    <div className="table-responsive">
                      <ProductList
                        products={filteredProducts}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onProductClick={handleProductClick}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <Modal
              title={currentProduct ? "Edit Product" : "Add Product"}
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <ProductForm
                product={currentProduct}
                onSave={handleSave}
                onCancel={() => setIsModalVisible(false)}
              />
            </Modal>
          </>
        }
      />
      <Route path="/product/:sku" element={<ProductDetail />} />
    </Routes>
  );
};

export default ProductPage;
