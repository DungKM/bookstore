import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useStyles from "./styles";
import { getOrders } from "../../service/cartService";
import { Button } from "@material-ui/core";
import { Link , useHistory} from "react-router-dom";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    heightContainer: {
      minHeight: "70vh",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const classes = useRowStyles();
  return (
    <React.Fragment className={classes.heightContainer}>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.status}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.customer_name}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.customer_email}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.customer_phone}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.customer_address}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.total}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.payment}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              Purchased product
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>NameProduct</TableCell>
                    <TableCell>ImageProduct</TableCell>
                    <TableCell>PriceProduct</TableCell>
                    <TableCell>QuantityProduct</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.cart_orders.map((cart) => (
                    <TableRow key={cart.id}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell component="th" scope="row">
                        {cart.product_name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <img
                          src={
                            "http://127.0.0.1:8000/storage/images/" +
                            cart.product_image
                          }
                          width={100}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {cart.product_price}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {cart.quantity}
                      </TableCell>
                      <TableCell component="th" scope="row">
                      <Button component="th" scope="row" color="primary"  onClick={()=> {history.push(`/product/${cart.product_id}`)}}>
                        Feeback
                      </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function MyOrders() {
  const classe = useStyles();
  let user = JSON.parse(sessionStorage.getItem("user"));
  const [data, setData] = useState([]);
  useEffect( () => {
    async function fetchDataOrders () {
      const response = await getOrders(user.user_id);
      setData(response);
    }
    fetchDataOrders ()
  }, []);
  return (
    <div className={classe.heightContainer}>
      <TableContainer component={Paper} className={classe.marginTop}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Status</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Payment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
