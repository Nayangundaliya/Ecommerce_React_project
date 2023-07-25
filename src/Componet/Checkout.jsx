import React from 'react'
import styled from 'styled-components';
import { Button } from './Button';
import axios from 'axios';
import { useState } from 'react';
function Checkout() {

  const [error, setError] = useState();

  const Wrapper = styled.section`
    padding: 6rem 0 5rem 0;
    text-align: center;
    .container {
      margin-top: 3rem;
      .contact-form {
        max-width: 50rem;
        margin: auto;
        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      phone_no: data.get('phone_no'),
      dilevary_address_city: data.get('dilevary_address_city'),
      dilevary_address_state: data.get('dilevary_address_state'),
      pincode: data.get('pincode'),
      dilivary_address: data.get('dilivary_address'),

    }


    const LoginService = async (data) => {
      return await axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/v1/order`,
        headers: {
          'authorization': `Bearer 7|f84vIHobtzP83IAYpgppEerPA84gYqaXGLjJI85n`,
        },
        data: data
      });
    }

    LoginService(actualData).then((res) => {
      if (res.data.status_code === 200) {

        setError([]);

      }
      else {
        setError(res.data.message);
      }
      console.log(res)
    }).catch((error) => {
      console.log("Somting went wrong")
      console.log(error.message);
    });

  }

  return (
    <Wrapper>
      <h3 className="common-heading">Checkout</h3>


      <div className="container">
        <div className="contact-form">
          <form
            onSubmit={handleSubmit}
            className="contact-inputs">
            <div className="mb-3 d-flex justify-content-between">
              <div>
                <input
                  type="text"
                  name="first_name"
                  // value={}
                  placeholder="First Name"
                  autoComplete="off"
                //required
                />
                <small className="text-danger d-block">{error?.first_name}</small>
              </div>
              <div>
                <input
                  type="text"
                  name="last_name"
                  // value={isAuthenticated ? user.email : ""}
                  placeholder="Last Name"
                  autoComplete="off"
                // required
                />
                <small className="text-danger d-block">{error?.last_name}</small>
              </div>

            </div>

            <input
              type="text"
              name="phone_no"
              // value={isAuthenticated ? user.email : ""}
              placeholder="Phone No"
              autoComplete="off"
            // required
            />
            <small className="text-danger">{error?.phone_no}</small>
            <div className="mb-3 d-flex justify-content-between">
              <div>
                <input
                  type="text"
                  name="dilevary_address_city"
                  // value={isAuthenticated ? user.email : ""}
                  placeholder="city"
                  autoComplete="off"
                // required
                />
                <small className="text-danger d-block">{error?.dilevary_address_city}</small>
              </div>
              <div>
                <input
                  type="text"
                  name="dilevary_address_state"
                  // value={isAuthenticated ? user.email : ""}
                  placeholder="state"
                  autoComplete="off"
                // required
                />
                <small className="text-danger d-block">{error?.dilevary_address_state}</small>
              </div>

            </div>

            <input
              type="text"
              name="pincode"
              // value={isAuthenticated ? user.email : ""}
              placeholder="pincode"
              autoComplete="off"
            // required
            />
            <small className="text-danger">{error?.pincode}</small>
            <textarea
              name="dilivary_address"
              cols="30"
              rows="3"
              //  required
              autoComplete="off"
              placeholder="Dilivary address"></textarea>
            <small className="text-danger">{error?.dilivary_address}</small>

            <div className="col-md-12 mb-3">
              <div className="form-label">
                <h5 className="form-label">Select Payment Mode: </h5>
              </div>

              <div className="d-md-flex align-items-start">
                <div className="nav col-md-4 flex-row  nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <Button id="cashOnDeliveryTab-tab" data-bs-toggle="pill" data-bs-target="#cashOnDeliveryTab" type="button" role="tab" aria-controls="cashOnDeliveryTab" aria-selected="true">Cash on Delivery</Button>
                  <Button id="onlinePayment-tab" className=' mt-2' data-bs-toggle="pill" data-bs-target="#onlinePayment" type="button" role="tab" aria-controls="onlinePayment" aria-selected="false">Online Payment</Button>
                </div>
                <div className="tab-content col-md-9" id="v-pills-tabContent">
                  <div className="tab-pane fade" id="cashOnDeliveryTab" role="tabpanel" aria-labelledby="cashOnDeliveryTab-tab" tabIndex="0">
                    <h6>Cash on Delivery Mode</h6>
                    <hr />
                    <Button type="submit" >Place Order (Cash on Delivery)</Button>

                  </div>
                  <div className="tab-pane fade" id="onlinePayment" role="tabpanel" aria-labelledby="onlinePayment-tab" tabIndex="0">
                    <h6>Online Payment Mode</h6>
                    <hr />
                    <Button type="button" >Pay Now (Online Payment)</Button>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  )
}

export default Checkout
