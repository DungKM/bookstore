import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useState, useEffect } from "react";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems:'center',
    minHeight: '25rem',
    textAlign:'center'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
  
}));

export default function WelcomeUser(props) {
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const queryString = window.location.search;
    fetch(`http://localhost:8000/api/auth/google/callback${queryString}`, {
      headers: new Headers({ accept: "application/json" }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    }, []);
    if(data){
      sessionStorage.setItem("user", JSON.stringify(data.user, null, 2));
    }

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return (
      <Container>
        <ThemeProvider>
          <Typography variant="h3">{error.toString()}</Typography>
          <Typography variant="h3">{error.toString()}</Typography>
          <Typography variant="h3">{error.toString()}</Typography>
        </ThemeProvider>
      </Container>
    );
  }

  return (
    <div className={classes.root}>
    <CssBaseline />
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome {data.user.name}
      </Typography>
     
    </Container>
    
  </div>
  );
}