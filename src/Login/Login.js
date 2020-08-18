import React from 'react';
import LoginForm from './LoginForm'
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function App() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col />
            <Col lg="8">                            
                <Card>               
                    <LoginForm />             
                </Card>             
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }

