import React from "react";
import { Table, Space, Button } from "antd";

const ProductList = ({ products, onEdit, onDelete, onProductClick }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a onClick={() => onProductClick(record)}>{text}</a>
      ),
    },
    {
      title: "sku",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div>
          {images && images.length > 0 ? (
            <img
              src={images[0]}
              alt="Product"
              style={{ width: 50, height: 50 }}
            />
          ) : (
            "No image"
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onDelete(record.id)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="id" />;
};

export default ProductList;
