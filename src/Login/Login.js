import React from 'react';
import {
   Col, Form,
  FormGroup, Label, 
  Button,
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import './login-form.css'



const Login = () => {

  const { handleSubmit, register, errors,reset } = useForm();
  // const URL = 'http://api.com';
  
  const onSubmit = data => {
    console.log("data:",data);
    // const resp = fetch(URL).then(res => {
    //   console.log(res)
    // });
  }

    return (
      <div>
  
        
      
        <Form  className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
            <Col>
             <h2 className="form_title">sign in</h2>
             </Col>
             </FormGroup>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <input
                name="email"
                placeholder="Enter Email.."
                className="input_Field"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })}
              />
               <p className="error">{errors.email && errors.email.message}</p> 
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Password</Label>
              <input 
                name="password"
                type="password"
                className="input_Field"
                placeholder="Enter password.."
                ref={register({
                  required: "Required",    
                })}
                />
               {errors.password && <p className="error">This field is required</p>}
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
            <Button className="form-btn" type="submit">Login</Button>
              <Button
                className="form-btn"
                type="Button"
                onClick={() => {
                  reset({
                    reactSelect: '',
                  });
                }}
                >
                Reset 
              </Button>
            </FormGroup>
          </Col>

        </Form>

      </div>
    );
  }


  export default Login;


