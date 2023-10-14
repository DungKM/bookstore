import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';
import { toast } from 'react-toastify';

const CartItem = ({ item, onRemoveFromCart, onUpdateCartQty }) => {
  const classes = useStyles();

  return (
    <Card className="cart-item">
      <CardMedia image={"http://127.0.0.1:8000/storage/images/" + item.products.image} alt={item.products.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.products.name}</Typography>
        <Typography variant="h6" color='secondary'>
        {item.products.sale > 0 ? (
              <>
                
                  <del>
                    <b>{item.products.price}</b>
                  </del> -  <b>{item.products.price - item.products.sale}</b>
              </>
            ) : (
              <b>{item.products.price}</b>
            )}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
        <Button
            type="button"
            size="small"
            onClick={() => {
              const newQuantity = item.quantity - 1;
              if (newQuantity >= 1) {
                onUpdateCartQty(item.id, newQuantity);
              }
            }}>
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => {
              const newQuantity = item.quantity + 1;
              if (newQuantity <= item.products.quantity) {
                onUpdateCartQty(item.id, newQuantity);
              }else{
                toast.error(`Sản phẩm ${item.products.quantity} chỉ còn ${item.products.quantity}`)
              }
            }}>
            +
          </Button>
        </div>
        <Button className={classes.button} variant="contained" type="button" color='secondary' onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
