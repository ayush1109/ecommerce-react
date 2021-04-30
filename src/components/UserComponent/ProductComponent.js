import React from 'react';
import {Link} from 'react-router-dom';
import { Loading } from '../LoadingComponent';
import {baseUrl} from '../../shared/baseUrl';
import star from '../../images/star.jpg';
function RenderProducts({ product }) {
    var off = ((product.old_price - product.price) / product.old_price)*100;
    var arr = [];
    product.reviews.map((review) => {
        arr.push(review.rating);
    })
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    var avg;
    if(arr.length == 0) avg = 0;
    else avg = total/arr.length;
    
    return (
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
          <Link to={`/products/${product._id}`}>
            <img 
              src={baseUrl + product.image}
              alt="Image not available"
              class="img-fluid product-img"
            />
            </Link>
          </div>
          <div class="col-md-8" id="text">
            <div class="card-body">
              <h3 class="card-title">{product.name}</h3>
              <p class="card-text" id="company">
              From - {product.company}
              </p>
              <p class="card-text">
              <div className="row rate">
                                  <div className="col-2 ratings">{avg}</div>
                                  <div className="col-6">({arr.length})</div>
                              </div>
                              <div className="row">
                              <div className="col-4 price">${product.price}</div>
                                  <div className="col-3 old-price">${product.old_price}</div>
                                  <div className="col-5 off">{off.toFixed(2)} % off</div>
                              </div>
                              <ul className="list-unstyled" id="queryDescription">
                                  {product.description.map((desc) => {
                                      return (
                                          <li className="list-query">{desc}</li>
                                      );
                                  })}
                              </ul>
              </p>
              
            </div>
          </div>
        </div>
      </div>
      
    );

}


const Product = (props) => {
    const product = props.products.products.map((pro) => {
        return (
            <div key={pro._id} className="col-12 col-md-6">
                <RenderProducts product={pro}
                />
            </div>
        );
    });

    if (props.products.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.products.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.products.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    {product}

                </div>
            </div>
        );
}



export default Product;