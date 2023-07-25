import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const Register = () => {
    
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone_no, setNumber] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordconfirmation] = useState("");
    const [errorlist, setErrorlist] = useState({
        error_list: []
    })
    

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_no: phone_no,
            country: country,
            city: city,
            password: password,
            password_confirmation: password_confirmation,
        }
    

        // axios.get('/sanctum/csrf-cookie').then(response => {
        // });

        axios.post(`http://127.0.0.1:8000/api/v1/register`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.first_name);
                    localStorage.setItem('user_id', res.data.id);
                    localStorage.setItem('user_email', res.data.email);

                    swal("Success", res.data.message, "success");
                    window.location = '/e-commerce';
                } else {
                    setFirstname( res.data.message )
                }
            });
    }


    return (
        <div>
            <form onSubmit={registerSubmit} method='POST' aria-multiline>
                <div className='col-sm-6 offset-sm-4'>
                    <br />
                    <h1 className='mb-4'>Register</h1>
                    <input type="text" name='first_name' value={first_name} onChange={(e) => setFirstname(e.target.value)} className='form-control' placeholder='First Name' />
                    {/* <span>{}</span> */}
                    <br />
                    <input type="text" name='last_name' value={last_name} onChange={(e) => setLastname(e.target.value)}  className='form-control' placeholder='Last Name' />
                    <br />
                    <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                    <br />
                    <input type="number" name='phone_no' value={phone_no} onChange={(e) => setNumber(e.target.value)}  className='form-control' placeholder='Number' />
                    <br />
                    <input type="text" name='country' value={country} onChange={(e) => setCountry(e.target.value)}  className='form-control' placeholder='Country' />
                    <br />
                    <input type="text" name='city' value={city} onChange={(e) => setCity(e.target.value)} className='form-control' placeholder='City' />
                    <br />
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}  className='form-control' placeholder='Password' />
                    <br />
                    <input type="password" name='password_confirmation' value={password_confirmation} onChange={(e) => setPasswordconfirmation(e.target.value)}  className='form-control' placeholder='Password Confirmation' />
                    <br />
                    <button type='submit' className='btn btn-primary'>Sign UP</button>
                </div>
            </form>
        </div>
    )
}

export default Register
