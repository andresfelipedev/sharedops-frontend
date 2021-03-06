import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    
    const darkTheme = useSelector(state => state.UserReducer.darkTheme);

    return (
        <Container className="footer">
            <Row className={`${darkTheme ? 'dark' : 'light'}`}>
                <Col>
                    <a href={'https://andresfelipedev.github.io/portfolio'} target={'_blank'} rel={'noopener noreferrer'}>
                        Web application created by Andrés Felipe Pérez Rodríguez
                    </a>
                </Col>            
            </Row>   
        </Container>            
    );
};

export default Footer;