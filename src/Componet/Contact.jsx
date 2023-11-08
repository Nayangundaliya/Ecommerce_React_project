import React, { useState } from 'react'
import styled from "styled-components";
import axios from 'axios';
import swal from 'sweetalert';

const Contact = () => {

    const username1 = localStorage.getItem('auth_token') ? localStorage.getItem('auth_name') : '';
    const email1 = localStorage.getItem('auth_token') ? localStorage.getItem('user_email') : '';

    const [username, setUsername] = useState(username1);
    const [email, setEmail] = useState(email1);
    const [message, setMessage] = useState("");

    const contactSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            message: message,
        }

        // axios.get('/sanctum/csrf-cookie').then(response => {
        // });

        axios.post(`http://127.0.0.1:8000/api/v1/contact`, data).then(res => {
                swal("Success", res.data.message, "success");
                window.location = '/e-commerce';
        });
    }
    
    
    

  return (
      <>
      <h3 className="common-heading offset-sm-4">Contact page</h3>

      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.86633502778!2d70.66540749304767!3d22.273412567407146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1690178674427!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe> */}

      <div className='col-sm-6 offset-sm-4'>
        <form onSubmit={contactSubmit} method='POST' aria-multiline className=''>
          <div className='m-5'>
            <input type="text" className='m-3 p-3'  name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"  />
            <br />
            <input type="email" className='m-3 p-3' name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"  />
            <br />
            <input type='text' className='m-3 p-3' name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter you message" />
            <br />
            <input type="submit" />
          </div>

        </form>
      </div>
      </>
            
    );
};

export default Contact;
