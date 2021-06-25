import { useState, useContext } from "react";
import { Form, Button } from 'semantic-ui-react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../contexts/auth";
import { useForm } from "../utils/hooks";


const REGISTER_USER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
            $mobileNo: String!
        ) {
            register(
                registerInput: {
                    username: $username
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
                    mobileNo: $mobileNo
                }
            ) {
                id email username createdAt token
            }
        }
    `;

function Register(props){
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const {credentials, handleChange, handleSubmit} = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNo: ''
    });

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data:{register:userData}}){
            context.login(userData);
            props.history.push('/')
        }, onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: credentials
    })

    function registerUser(){
        addUser();
    }

    return(
        <div className="ui raised very padded text fluid container segment">
            <h1>Registration</h1>
            <Form onSubmit={handleSubmit} noValidate className={loading? 'loading' : ''}>
            <Form.Input label='Username' 
            type='text'
            name="username" 
            placeholder="Username.." 
            value={credentials.username} 
            error={errors.username ? true : false}
            onChange={handleChange} />

            <Form.Input label='Email' 
            type='email'
            name="email" 
            placeholder="Email.." 
            value={credentials.email} 
            error={errors.email ? true : false}
            onChange={handleChange} />

            <Form.Input label='Password' 
            type='password'
            name="password" 
            placeholder="Password.." 
            value={credentials.password} 
            error={errors.password ? true : false}
            onChange={handleChange} />

            <Form.Input label='Confirm Password' 
            type='password'
            name="confirmPassword" 
            placeholder="Confirm Password.." 
            value={credentials.confirmPassword}
            error={errors.confirmPassword ? true : false} 
            onChange={handleChange} />

            <Form.Input label='Mobile number' 
            type='text'
            name="mobileNo" 
            placeholder="Mobile number.." 
            value={credentials.mobileNo} 
            error={errors.mobileNo ? true : false}
            onChange={handleChange} />

            <Button type="submit" primary>Register</Button>
            </Form>

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <div className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Register;