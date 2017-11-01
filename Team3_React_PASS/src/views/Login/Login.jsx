import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import Link from 'react-router'
import { Grid, Row, Col, Form, FormGroup, InputGroup ,FormControl, Button} from 'react-bootstrap';
import book from './books-1316306_960_720.png';
import allPass from './allPass.png'
import  './Login.css';


class Login extends Component {
  render(){
    return (
      <div className="content" >
          <div style={{
            alignItems:'center',
            justifyContent:'center',
            display:'flex',
          }}>
	        	<img src={book} style={{
              width:'40%',
              height:'40%',
              }}></img>
          </div>
          <div style={{
              alignItems:'center',
              justifyContent:'center',
              display:'flex',
            }}>
		        <img src={allPass}></img>
           </div>
           <Row>
             <Col md={6} mdOffset={3}>
             <div className={"panel panel-login"}>
				    	<div className={"panel-body"}>
                  <Row>
                    <Col lg={12}>
                    <Form id="login-form"  role="form" style={{
                      display: 'block'
                      }} >
                      <FormGroup>
                          <FormControl type="text" name="username" id="username" className={"form-control"} placeholder="Account"/> 
                      </FormGroup>
                      <FormGroup>
                          <FormControl type="password" name="password" id="password" className={"form-control"} placeholder="Password"/> 
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col sm={6} smOffset={3}>
                            <Button className={"form-control btn btn-login"} href={"#/app"}>登入</Button>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Form>
                    </Col>
                  </Row>
              </div>
            </div>
            </Col>
           </Row>
      </div>
    );
  }
}
export default Login;
