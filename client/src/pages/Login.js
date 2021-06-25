import { useState, useContext } from "react";
import { Form, Button } from 'semantic-ui-react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../contexts/auth";
import { useForm } from "../utils/hooks";

const LOGIN_USER = gql`
        mutation login(
            $username: String!
            $password: String!

        ) {
            login(
                username: $username
                password: $password
            ) {
                id email username createdAt token
            }
        }
    `;

function Login(props){
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    
    const {credentials, handleChange, handleSubmit} = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, {data:{login:userData}}){
            context.login(userData);
            props.history.push('/')
        }, onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: credentials
    })

    function loginUserCallback(){
        loginUser();
    }

    return(
        <div className="ui raised very padded text fluid container segment">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} noValidate className={loading? 'loading' : ''}>
            <Form.Input label='Username' 
            type='text'
            name="username" 
            placeholder="Username.." 
            value={credentials.username} 
            error={errors.username ? true : false}
            onChange={handleChange} />

            <Form.Input label='Password' 
            type='password'
            name="password" 
            placeholder="Password.." 
            value={credentials.password} 
            error={errors.password ? true : false}
            onChange={handleChange} />

            <Button type="submit" primary>Login</Button>
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

export default Login;