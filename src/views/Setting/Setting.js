import React, { Component } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";


class Setting extends Component {
    render() {
        return (
            <div className="content">
             <Row>
              <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit setting</CardTitle>
             </CardHeader>
             
                <CardBody>
                  <Form>
                   
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Key 1</label>
                          <Input
                            defaultValue="text1"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                        <label>Key 2</label>
                          <Input
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Key 3</label>
                          <Input                      
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                        <label>Key 4</label>
                          <Input
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                   
                 
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Update 
                        </Button>
                      </div>
                    </Row>

                  </Form>
                </CardBody>
              </Card>
            </Col> 
            </Row>
            </div>
        );
    }
}

export default Setting;