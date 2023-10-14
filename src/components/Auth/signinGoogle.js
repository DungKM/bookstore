import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    const [googleLoginUrl, setGoogleLoginUrl] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/auth/google/redirect', { headers: new Headers({ accept: 'application/json' }) })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => setGoogleLoginUrl(data.url))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
  <Container component="main" maxWidth="xs" className='mt-lg-5'>


                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <a className="App-link"href={googleLoginUrl} >
                    Sign in with Google
                </a>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
                <div>Dung</div>
  </Container>
     
        </>
    );
}

export default Home;
