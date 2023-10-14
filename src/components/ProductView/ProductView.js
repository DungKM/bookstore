import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import { detailProduct } from "../../service/productService";
import { postCart } from "../../service/cartService";
import { toast } from "react-toastify";
import Comments from "./Comment";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});
  const history = useHistory();
  const id = window.location.pathname.split("/");
  const idProduct = id[2];
  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      const formData = {
        quantity: 1,
        user_id: user.user_id,
        product_id: idProduct,
      };
      try {
        await postCart(formData);
        toast.success("Thêm sản phẩm thành công");
      } catch (error) {
        toast.error("Thêm sản phẩm không thành");
      }
    } else {
      history.push("/login");
    }
  };
  const fetchProduct = async (id) => {
    const response = await detailProduct(id);
    const { name, price, image, quantity, description } = response;
    setProduct({
      name,
      quantity,
      description,
      price,
      image,
    });
  };
  useEffect(() => {
    fetchProduct(id[2]);
  }, []);

  return (
    <>
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={5} className="image-wrapper">
          <img
            src={"http://127.0.0.1:8000/storage/images/" + product.image}
            alt={product.name}
          />
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2">
            <b>{product.name}</b>
          </Typography>
          <Typography
            variant="p"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3" color="secondary">
            Price: <b> {product.price} </b>
          </Typography>
          <br />
          <Grid container spacing={4} className="flex justify-content-center mb-5">
            <Grid className="flex justify-content-center">
              <Button
                size="large"
                className="custom-button"
                onClick={handleAddToCart}
              >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
      <Comments valueProduct={idProduct} />
    </>
  );
};

export default ProductView;
