import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Tooltip,
  Button,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  Grow,
  MenuItem,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import logo from "../../assets/circles.png";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  let user = JSON.parse(sessionStorage.getItem("user"));
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  useEffect(() => {
   
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Xóa thông tin người dùng trong sessionStorage
    sessionStorage.removeItem("token"); // Xóa thông tin người dùng trong sessionStorage
    setIsLoggedIn(false); // Cập nhật biến state
    history.push("/"); // Điều hướng đến trang chủ hoặc trang bạn muốn người dùng điều hướng đến
  };
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Book Store App"
              height="50px"
              className={classes.image}
            />
            <strong>KEYMAGICBOOKS</strong>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.button}>
            {isLoggedIn ? (
              // Hiển thị nút "Logout" nếu người dùng đã đăng nhập
            <>
                <Button
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  {user.name}
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={()=> {history.push('/myorders')}}>
                              My Orders
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
                </>
            ) : (
              // Hiển thị nút "Login" nếu người dùng chưa đăng nhập
              <Tooltip title="Login" arrow>
                <IconButton
                  component={Link}
                  to="/login"
                  aria-label="Login"
                  color="inherit"
                >
                  <Badge badgeContent={totalItems} color="secondary">
                    <PersonIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Cart" arrow>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
