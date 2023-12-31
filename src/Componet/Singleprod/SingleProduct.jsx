import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useProductContex } from '../contex/Productcontex';
import { Container } from './Container';
import { TbReplace, TbTruckDelivery } from 'react-icons/tb';
import { MdSecurity } from 'react-icons/md';
import styled from 'styled-components';
import PageNavigation from './PageNavigation';
import MyImage from './MyImage';
import FormatPrice from '../Helpers/FormatPrice';
import Starreview from './Starreview';
import Addtocart from '../Cart/Addtocart';

// const API = "https://api.pujakaitem.com/api/products";
const API = 'http://127.0.0.1:8000/api/v1/product';

const SingleProduct = () => {

  const { getSingleProduct, isSingleLoding, singleProduct } = useProductContex();
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, []);

  const {
    name,
    slug,
    selling_price,
    small_description,
    description,
    category_id,
    category,
    brand,
    stock,
    stars,
    reviews,
    image,
    images,
    replacement_days,
    warranty_year,
    original_price,
    quantity,
  } = singleProduct;


  if (isSingleLoding) {
    return <div className='page_loading'>Loading......</div>
  }

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">

          {/* Product Image */}
          <div className="product_images">
            <MyImage imgs={images} />
          </div>

          {/* Product Ditels */}
          <div className="product-data">
            <h2>{name}</h2>
            <Starreview stars={stars} reviews={reviews} />
            <p className="product-data-price">
              MRP:<del>
                <FormatPrice price ={original_price} />
              </del>
            </p>
            <h2 className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={selling_price}/>
            </h2>
            <p>{small_description}</p>
            
            <p>{description}</p>
            <div className="product-data-warranty">

              <div className="product-warranty-data">
                <TbTruckDelivery className='warranty-icon' />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className='warranty-icon' />
                <p>{ replacement_days } Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className='warranty-icon' />
                <p>Men Deliverd</p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className='warranty-icon' />
                <p>{ warranty_year } Year Warranty</p>
              </div>

            </div>
            <div className="product-data-info">
              <p>
                Available: <span> {quantity > 0 ? "In Stock" : "Not Available"} </span>
              </p>
              <p>
                ID: <span> {id} </span>
              </p>
              <p>
                Brand: <span> {brand} </span>
              </p>
            </div>
            <hr />
            {quantity > 0 && <Addtocart product={singleProduct}/>}
          </div>

        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }
  .product_images {
    display: flex;
    align-items: center;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;
      .product-warranty-data {
        text-align: center;
        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }
    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;
      span {
        font-weight: bold;
      }
    }
    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }
  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct
