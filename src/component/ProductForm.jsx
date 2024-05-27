import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../assets/styles.css"; // Import CSS

const ProductForm = ({ product, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(product ? product.thumbnail : "");

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
      setImageUrl(product.thumbnail);
    } else {
      form.resetFields();
      setImageUrl("");
    }
  }, [product, form]);

  const onFinish = (values) => {
    onSave({ ...product, ...values, thumbnail: imageUrl });
    form.resetFields();
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      setImageUrl(info.file.response.url);
    }
  };

  const uploadProps = {
    name: "file",
    action: "https://dummyjson.com/products/add",
    headers: {
      authorization: "authorization-text",
    },
    onChange: handleUpload,
    showUploadList: false,
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="product-form"
    >
      <Form.Item
        name="title"
        label="Product Name"
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Image">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} className="upload-button">
            Click to Upload
          </Button>
        </Upload>
        {imageUrl && (
          <img src={imageUrl} alt="Product" className="product-image" />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
