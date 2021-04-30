import React, {useState} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
const BuyNow = (props) => {
    console.log(props);
    let location = useLocation();
    console.log(location)
    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    var house;
    var message;
    var sector;
    var landmark;
    var city;
    var state;
    if(props.user.user.address == null) {
        house = sector = city = landmark = state = '';
        message = 'Add';
    }
    else {
        house = props.user.user.address.house;
        sector = props.user.user.address.sector;
        landmark=props.user.user.address.landmark;
        city = props.user.user.address.city;
        state = props.user.user.address.state;
        message = 'Edit';
    }

    const [formEdit, setEditForm] = useState({})

    const setEditField = (field, value) => {
        setEditForm({
            ...formEdit,
            [field]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formEdit);
        function wrap(values) {
            return {
                "address" : values
            }
        }

        props.updateUser(new wrap(formEdit));

    }

    return (
        <>
        <div className="buy-now container">
            <div className="confirm-address mb-2">
                <h3>Confirm Your Address</h3>
            </div>
            <div className="address row">
                <div className="col-8 only-address">
                    <div className="row house">
                            {house} ({landmark})
                    </div>
                    <div className="row sector">
                            {sector}
                    </div>
                    <div className="row city">
                            {city}
                    </div>
                    <div className="row state">
                            {state}
                    </div>
                </div>
                <div className="col-4">
                    <Button onClick={handleShow1}>{message}</Button>
                </div>
            </div>
            <div className="continue">
                <Link to={{
                    pathname: '/payment',
                    state: location.state
                }}><Button>Continue</Button></Link>
            </div>
        </div>
        <div className="modal-address">
                <Modal show={show1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                        <Modal.Title>{message} Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={house} onChange={e => setEditField('house', e.target.value)} />
                                <Form.Label>House No, Building Name</Form.Label>
                            </div>

                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={sector} onChange={e => setEditField('sector', e.target.value)} />
                                <Form.Label>Sector, Street name</Form.Label>
                            </div>

                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={landmark} onChange={e => setEditField('landmark', e.target.value)} />
                                <Form.Label>Landmark (if any)</Form.Label>
                            </div>
                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={city} onChange={e => setEditField('city', e.target.value)} />
                                <Form.Label>City</Form.Label>
                            </div>
                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={state} onChange={e => setEditField('state', e.target.value)} />
                                <Form.Label>State</Form.Label>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default BuyNow;