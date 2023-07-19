import React from 'react'
import { NavLink } from 'react-router-dom';
import FormatPrice from '../Helpers/FormatPrice';

const HomeProduct = (curElem) => {
    const { id, name, image, selling_price, brand} = curElem;
    // console.log(category_id)
//   console.log("1",category.name)

    return (
        <NavLink to={`/singleproduct/${id}`}>
            <div className="card">
                <figure>
                    <img src={'http://127.0.0.1:8000/uploads/product/'+image} alt="image" />
                    <figcaption className='caption'>{brand}</figcaption>
                </figure>
                <div className="card-data">
                    <div className="card-data-flex">
                        <h3>{name}</h3>
                        <p className="card-data--price"><FormatPrice price={selling_price} />  </p>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default HomeProduct
