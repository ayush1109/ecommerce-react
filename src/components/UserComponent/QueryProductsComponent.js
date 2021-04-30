import React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../LoadingComponent';
import {baseUrl} from '../../shared/baseUrl';

function RenderQueryProducts({ product }) {
    if(product != null) {
    
    var off = ((product.old_price - product.price) / product.old_price)*100;
    var arr = new Array();
    product.reviews.map((review) => {
        arr.push(review.rating);
    })
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    var avg;
    if(arr.length == 0) avg = 'Not rated';
    else avg = total/arr.length;
    
    return (

        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-5">
          <Link to={`/products/${product._id}`}>
            <img 
              src={baseUrl + product.image}
              alt="Image not available"
              class="img-fluid query-img"
            />
            </Link>
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">{product.name}</h5>
              <p class="card-text">
              From - {product.company}
              </p>
              <p class="card-text">
              <div className="row">
                                  <div className="col-6">{avg == NaN ? 0 : avg}</div>
                                  <div className="col-6">({arr.length})</div>
                              </div>
                              <div className="row">
                              <div className="col-4">${product.price}</div>
                                  <div className="col-4 text-muted">${product.old_price}</div>
                                  <div className="col-4">{off.toFixed(2)} % off</div>
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
                        else {
                            <div>Not found</div>
                        }

}

const QueryProduct = (props) => {
    const product = props.queryProducts.queryProducts.map((pro) => {
        return (
            <div key={pro._id} className="col-12 col-md-6">
                <RenderQueryProducts product={pro}
                />
            </div>
        );
    });

    if (props.queryProducts.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.queryProducts.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.queryProducts.errMess}</h4>
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



export default QueryProduct;