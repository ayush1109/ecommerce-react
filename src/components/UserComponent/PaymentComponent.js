import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const Payment = (props) => {
    let location = useLocation();
    console.log(location);

    function handleClick() {
        let order = {
            myOrders: [{
                addedOn: new Date().toLocaleDateString(),
                orders: location.state
            }]
        }
        props.updateUser(order);

    }

    return (
        <div className="payment container">
            <div className="heading">
                Choose Payment Method
            </div>
            <div className="row">
                <div className="col-12">
                    <Link to="/congrats" onClick={handleClick}>Debit Card </Link>
                </div>
                <div className="col-12">
                    <Link to="/congrats" onClick={handleClick}> Credit Card </Link>
                </div>
                <div className="col-12">
                    <Link to="/congrats" onClick={handleClick}> Cash On Delivery</Link>
                </div>
            </div>

        </div>
    );
}

export default Payment;