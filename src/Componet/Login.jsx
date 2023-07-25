import React, { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        }
        
        axios.post(`http://127.0.0.1:8000/api/v1/login`, data).then(res => { 
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.first_name);
                localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('user_email', res.data.email);

                swal("Success", res.data.message, "success");
                window.location = '/e-commerce';
            } else if (res.data.status === 401) {
                swal("Warning", res.data.message, "warning");
            } else {
                // 
            }
        });
    }

    return (
        <div>
            <form onSubmit={loginSubmit} method='POST' aria-multiline>
                <div className='col-sm-6 offset-sm-4'>
                    <br />
                    <h1 className='mb-4'>Login</h1>
                    <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                    <span>{ }</span>
                    <br />
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' />
                    <br />
                    <button type='submit' className='btn btn-primary'>Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default Login
