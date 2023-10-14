import React  from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link , useHistory} from "react-router-dom";
import useStyles from "./styles";
import { postCart } from "../../../service/cartService";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      const idProduct = product.id;
      const idUser = user.user_id;
      console.log(idUser);
      const formData = {
        quantity: 1,
        user_id: user.user_id,
        product_id: idProduct,
      };

      await postCart(formData);
      toast.success("Thêm sản phẩm thành công");
    } else {
      history.push("/login");
    }
  };

  return (
    <Card key={product.id} className={classes.root}>
      <Link to={`product/${product.id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={"http://127.0.0.1:8000/storage/images/" + product.image}
            title={product.name}
          />
        </CardActionArea>
      </Link>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6">{product.name}</Typography>
        </div>
        <div className={classes.cardContent}>
          <Typography variant="h6" color="secondary">
            {product.sale > 0 ? (
              <>
             
                  <del>
                    <b>{product.price}</b>
                  </del>{" "}
              
                <b>{product.price - product.sale}</b>
              </>
            ) : (
              <b>{product.price}</b>
            )}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          variant="contained"
          className={classes.button}
          endIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
        >
          <b>ADD TO CART</b>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
