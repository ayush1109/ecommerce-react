import React from 'react';
import { Loading } from '../LoadingComponent';
import { Link } from 'react-router-dom';
import {baseUrl} from '../../shared/baseUrl';
import { Breadcrumb, BreadcrumbItem, Button } from 'react-bootstrap';
import { useSnackbar } from 'react-simple-snackbar';

function RenderProductDetails({ product, updateUser, auth }) {
    var off = ((product.old_price - product.price) / product.old_price)*100;
    var id = product._id;
 
    if(product.EMI.isAvailable) {
        var ans = 'yes';
    }
    else {
        ans = 'no';
    }

    let path;
    if(auth.isAuthenticated) path="/buy";
    else {
        path="/userLogin";
    };

    const handleCart = () => {
        
    }
    
    if (product != null) {
        return (
            <>
                <div className="col-12 col-md-6" id="parallex-image">
                    <div className="img">
                        <img src={baseUrl + product.image} className="detail-img" alt="img not available"></img>
                    </div>
                    <div className="buttons">
                        <div className="row justify-content-center">
                            <Link to={{
                                pathname: path,
                                state: id
                            }}><Button variant="primary">Buy Now</Button></Link>
                            <Button variant="primary" onClick={handleCart}>Add to cart</Button>
                        </div>
                        <div className="row justify-content-center">
                            <Button variant="primary">Add to Wishlist</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" id="abc">
                    <h1>{product.name}</h1>
                    <div>From - {product.company}</div>
                    <div className="row">
                        <div className="col-4"><h3>{product.price}</h3></div>
                        <div className="col-4">{product.old_price}</div>
                        <div className="col-4">{off.toFixed(2)} % Off</div>
                    </div>
                    <div className="stocks">({product.stock.numberOfItems} items available)</div>
                    <div className="specifications">
                        <h3>Specifications</h3>
                        <ul className="list-unstyled">
                            {product.description.map((desc) => {
                                return (
                                    <li>{desc}</li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="offers">
                        <h3>Available Offers</h3>
                        <ul className="list-unstyled">
                            {product.offers.map((desc) => {
                                return (
                                    <li>{desc}</li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="delivery">
                        <h3>Delivery Charges</h3>
                    Rs.{product.deliveryCharges}
                    </div>
                <div className="emi">
                    <h3>EMI</h3>
                    EMI Available : {ans}<br></br>
                    downPayment : {product.EMI.downPayment}<br></br>
                    Rate Of Interest : {product.EMI.interest_Rate}
                </div>
                <div className="reviews">
                    <h3>Reviews</h3>
                    <ul className="list-unstyled">
                            {product.reviews.map((review) => {
                                return (
                                    <li key={review._id}>
                                        <p>{review.rating}</p>
                                        <p>{review.comment}</p>
                                    </li>
                                );
                            })}
                        </ul>
                </div>
            </div>
            </>
        );
    }
    else {
        return (
            <div>

            </div>
        );
    }
}


const ProductDetail = (props) => {
    if (props.isLoading)
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );

    else if (props.errMess)
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    else if (props.product == null) {
        console.log(props)
        return <div>props.product is null</div>
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.product.category}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row rst">
                    <RenderProductDetails product={props.product} updateUser={props.updateUser} auth={props.auth} />
                </div>
            </div>

        );
}


export default ProductDetail;