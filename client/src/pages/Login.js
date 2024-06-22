import React from 'react';
import { Form, Button, Input, message } from 'antd';
import '../styles/RegisterStyles.css';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from  'axios';
const Login = ( ) =>{
    const navigate=useNavigate();
    const  dispatch=useDispatch();
    //form handler
    const onfinishHandler = async(values) => {
      try {
        dispatch(showLoading( ));
        const res = await axios.post("/api/v1/user/login", values);
        window.location.reload( );
        dispatch(hideLoading( ));
        if(res.data.success){
          localStorage.setItem("token" , res.data.token );
          message.success("Login Successfully");
          navigate("/");
        }else{
          message.error(res.data.message)
        }
      } catch (error) {
        dispatch(hideLoading( ));
        console.log(error)
        message.error('Something Went Wrong')
      }
    };
    return(
        <div className="form-container">
                <Form layout="vertical" onFinish={onfinishHandler} className = "login-form"
                 autoComplete="off">

                    <h3 className="text-center">Login Form</h3>
                    
                    <Form.Item name = "email" label = "email">
                        <Input placeholder="Enter your Email ID."/>
                    </Form.Item>

                    <Form.Item name = "password" label = "password">
                        <Input.Password placeholder="Enter your Password."/>
                    </Form.Item>

                    <Link to="/Register" className= "m-2">New User?</Link>                   
                    <Form.Item >
                        <Button type = 'primary' htmlType='submit'>Login</Button>
                    </Form.Item>
                </Form>
            </div>
    );    
};

export default Login ;