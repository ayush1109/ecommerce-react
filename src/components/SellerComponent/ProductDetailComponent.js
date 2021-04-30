import React, { useState } from 'react';
import { Loading } from '../LoadingComponent';
import { Link } from 'react-router-dom';
import { Form, Modal, Row, Col, Button } from 'react-bootstrap';
import { useSnackbar } from 'react-simple-snackbar';
import { Formik } from 'formik';
import { Form as F } from 'formik';
import TextField from './TextField';

function RenderProductDetails({ product, updateProduct }) {
    console.log(product, updateProduct)
    if (product.EMI.isAvailable) {
        var ans = 'yes';
    }
    else {
        ans = 'no';
    }
    const buffer = product.image.img.data.data; // e.g., <Buffer 89 50 4e ... >
    const b64 = new Buffer(buffer).toString('base64')
    const mimeType = 'image/png';

    const [openSnackbar] = useSnackbar();

    const [showCompany, setShowCompany] = useState(false);
    const [showName, setShowName] = useState(false);
    const [showOldPrice, setShowOldPrice] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [showStock, setShowStock] = useState(false);
    const [showDelivery, setShowDelivery] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [showOffers, setShowOffers] = useState(false);
    const [showEMI, setShowEMI] = useState(false);


    const handleCloseCompany = () => setShowCompany(false);
    const handleShowCompany = () => setShowCompany(true);

    const handleCloseName = () => setShowName(false);
    const handleShowName = () => setShowName(true);

    const handleCloseOldPrice = () => setShowOldPrice(false);
    const handleShowOldPrice = () => setShowOldPrice(true);

    const handleClosePrice = () => setShowPrice(false);
    const handleShowPrice = () => setShowPrice(true);

    const handleCloseStock = () => setShowStock(false);
    const handleShowStock = () => setShowStock(true);

    const handleCloseDelivery = () => setShowDelivery(false);
    const handleShowDelivery = () => setShowDelivery(true);

    const handleCloseDescription = () => setShowDescription(false);
    const handleShowDescription = () => setShowDescription(true);

    const handleCloseOffers = () => setShowOffers(false);
    const handleShowOffers = () => setShowOffers(true);

    const handleCloseEMI = () => setShowEMI(false);
    const handleShowEMI = () => setShowEMI(true);


    const [formNameEdit, setEditNameForm] = useState({})
    const [formCompanyEdit, setEditCompanyForm] = useState({})
    const [formOldPriceEdit, setEditOldPriceForm] = useState({})
    const [formPriceEdit, setEditPriceForm] = useState({})
    const [formStockEdit, setEditStockForm] = useState({})
    const [formDeliveryEdit, setEditDeliveryForm] = useState({})


    const setEditNameField = (field, value) => {
        setEditNameForm({
            ...formNameEdit,
            [field]: value
        })
    }

    const setEditCompanyField = (field, value) => {
        setEditCompanyForm({
            ...formCompanyEdit,
            [field]: value
        })
    }

    const setEditOldPriceField = (field, value) => {
        setEditOldPriceForm({
            ...formOldPriceEdit,
            [field]: value
        })
    }
    const setEditPriceField = (field, value) => {
        setEditPriceForm({
            ...formPriceEdit,
            [field]: value
        })
    }

    const setEditStockField = (field, value) => {
        setEditStockForm({
            ...formStockEdit,
            [field]: value
        })
    }

    const setEditDeliveryField = (field, value) => {
        setEditDeliveryForm({
            ...formDeliveryEdit,
            [field]: value
        })
    }

    function handleCompanySubmit() {
        updateProduct(formCompanyEdit, product._id);
        console.log(formCompanyEdit);
        window.location.reload();
        openSnackbar(product.message, 2000);
    }

    function handleNameSubmit() {
        updateProduct(formNameEdit, product._id);
        console.log(formNameEdit);
        window.location.reload();
        openSnackbar(product.message, 2000);
    }

    function handleOldPriceSubmit() {
        updateProduct(formOldPriceEdit, product._id);
        console.log(formOldPriceEdit);
        window.location.reload();
        openSnackbar(product.message, 2000);
    }

    function handlePriceSubmit() {
        updateProduct(formPriceEdit, product._id);
        console.log(formPriceEdit);
        window.location.reload();
        openSnackbar(product.message, 2000);
    }

    function handleStockSubmit() {
        const data = {
            stock: {
                numberOfItems: formStockEdit.numberOfItems
            }
        }
        updateProduct(data, product._id);
        console.log(data);
        window.location.reload();
        openSnackbar(product.message, 2000);
    }

    function handleDeliverySubmit() {
        updateProduct(formDeliveryEdit, product._id);
        console.log(formDeliveryEdit);
        window.location.reload();
        openSnackbar(product.message, 2000);
    }

    if (product != null) {
        return (
            <>
                <div id="abc">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-10">
                                    <h5>Name of product - {product.name}</h5>
                                </div>
                                <div className="col-2">
                                    <i class="fas fa-edit" onClick={handleShowName}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-10">
                                    <h5>Name of Company - {product.company}</h5>
                                </div>
                                <div className="col-2">
                                    <i onClick={handleShowCompany} class="fas fa-edit"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-10">
                                    Current Price - {product.price}
                                </div>
                                <div className="col-2">
                                    <i class="fas fa-edit" onClick={handleShowPrice}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-10">
                                    Old Price - {product.old_price}
                                </div>
                                <div className="col-2">
                                    <i class="fas fa-edit" onClick={handleShowOldPrice}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="img col-11 ">
                            Image Shown to the customers - <img src={`data:${mimeType};base64,${b64}`} alt="img not available" id="seller-img"></img>
                        </div>
                        <div className="col-1">
                            <i class="fas fa-edit img-edit"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="stocks col-11">Stock available - {product.stock.numberOfItems}</div>
                        <div className="col-1"><i class="fas fa-edit" onClick={handleShowStock}></i></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="row">
                                <div className="col-10">
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
                                </div>
                                <div className="col-2">
                                    <i class="fas fa-edit" onClick={handleShowDescription}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="offers">
                                <div className="row">
                                    <div className="col-10">
                                        <h3>Available Offers</h3>
                                        <ul className="list-unstyled">
                                            {product.offers.map((desc) => {
                                                return (
                                                    <li>{desc}</li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div className="col-2">
                                        <i class="fas fa-edit" onClick={handleShowOffers}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-10">
                                    <div className="delivery">
                                        <h3>Delivery Charges</h3>
                    Rs.{product.deliveryCharges}
                                    </div>
                                </div>
                                <div className="col-2">
                                    <i class="fas fa-edit" onClick={handleShowDelivery}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-10">
                                    <div className="emi">
                                        <h3>EMI</h3>
                    EMI Available : {ans}<br></br>
                    downPayment : {product.EMI.downPayment}<br></br>
                    Rate Of Interest : {product.EMI.interest_Rate}
                                    </div>
                                </div>
                                <div className="col-2">
                                    <i class="fas fa-edit" onClick={handleShowEMI}></i>
                                </div>
                            </div>
                        </div>
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
                <div className="name-modal">
                    <Modal show={showName} onHide={handleCloseName}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Name of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div class="form-outline mb-4">
                                    <Form.Control type='text' defaultValue={product.name} onChange={e => setEditNameField('name', e.target.value)} />
                                    <Form.Label>Name</Form.Label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleNameSubmit}>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="company-modal">
                    <Modal show={showCompany} onHide={handleCloseCompany}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Company of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div class="form-outline mb-4">
                                    <Form.Control type='text' defaultValue={product.company} onChange={e => setEditCompanyField('company', e.target.value)} />
                                    <Form.Label>Company</Form.Label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleCompanySubmit}>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="oldprice-modal">
                    <Modal show={showOldPrice} onHide={handleCloseOldPrice}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Old Price of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div class="form-outline mb-4">
                                    <Form.Control type='text' defaultValue={product.old_price} onChange={e => setEditOldPriceField('old_price', e.target.value)} />
                                    <Form.Label>Old Price</Form.Label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleOldPriceSubmit}>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="price-modal">
                    <Modal show={showPrice} onHide={handleClosePrice}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Price of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div class="form-outline mb-4">
                                    <Form.Control type='text' defaultValue={product.price} onChange={e => setEditPriceField('price', e.target.value)} />
                                    <Form.Label>Price</Form.Label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handlePriceSubmit}>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="stock-modal">
                    <Modal show={showStock} onHide={handleCloseStock}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Stock of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div class="form-outline mb-4">
                                    <Form.Control type='text' defaultValue={product.stock.numberOfItems} onChange={e => setEditStockField('numberOfItems', e.target.value)} />
                                    <Form.Label>Number Of Items</Form.Label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleStockSubmit}>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="delivery-modal">
                    <Modal show={showDelivery} onHide={handleCloseDelivery}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Delivery Price of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div class="form-outline mb-4">
                                    <Form.Control type='text' defaultValue={product.deliveryCharges} onChange={e => setEditDeliveryField('deliveryCharges', e.target.value)} />
                                    <Form.Label>Delivery Charges</Form.Label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleDeliverySubmit}>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="specs-modal">
                    <Modal show={showDescription} onHide={handleCloseDescription}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Description of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={{
                                    description: [product.description[0], product.description[1], product.description[2], product.description[3], product.description[4], product.description[5], product.description[6], product.description[7]]
                                }
                                }

                                onSubmit={values => {
                                    console.log(values);
                                    updateProduct(values, product._id);
                                    window.location.reload();
                                    openSnackbar(product.message, 2000);

                                }}

                            >
                                {formik => (
                                    <div className="description-form">
                                        <F>
                                            <Row>
                                                <Col md={6}>
                                                    <TextField label="Description" name="description[0]" type="text" />
                                                </Col>
                                                <Col md={6}>
                                                    <TextField label="Description" name="description[1]" type="text" />
                                                </Col>
                                                <Col md={6}>
                                                    <TextField label="Description" name="description[2]" type="text" />
                                                </Col>
                                                <Col md={6}>
                                                    <TextField label="Description" name="description[3]" type="text" />
                                                </Col>
                                                <Col md={6}>
                                                    <TextField label="Description" name="description[4]" type="text" />
                                                </Col>
                                                <Col md={6}>
                                                    <TextField label="Description" name="description[5]" type="text" />
                                                </Col>
                                                <Col md={6}>
                                                    <TextField label="Description" name="description[6]" type="text" />
                                                </Col>
                                                <Col md={6}>
                                                    <TextField label="Description" name="description[7]" type="text" />
                                                </Col>
                                            </Row>
                                            <Button type="submit">Submit</Button>
                                        </F>
                                    </div>
                                )}
                            </Formik>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="offers-modal">
                    <Modal show={showOffers} onHide={handleCloseOffers}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Offers of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={{
                                    offers: [product.offers[0], product.offers[1], product.offers[2]]
                                }
                                }

                                onSubmit={values => {
                                    console.log(values);
                                    updateProduct(values, product._id);
                                    window.location.reload();
                                    openSnackbar(product.message, 2000);

                                }}

                            >
                                {formik => (
                                    <div className="offers-form">
                                        <F>
                                            <TextField label="Offers" name="offers[0]" type="text" />
                                            <TextField label="Offers" name="offers[1]" type="text" />
                                            <TextField label="Offers" name="offers[2]" type="text" />

                                            <Button type="submit">Submit</Button>
                                        </F>
                                    </div>
                                )}
                            </Formik>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="emi-modal">
                    <Modal show={showEMI} onHide={handleCloseEMI}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change EMI options of Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Formik
                                initialValues={{
                                    EMI: {
                                        isAvailable: true,
                                        downPayment: 0,
                                        interest_Rate: 0
                                    }
                                }
                                }

                                onSubmit={values => {
                                    console.log(values);
                                    updateProduct(values, product._id);
                                    window.location.reload();
                                    openSnackbar(product.message, 2000);

                                }}

                            >
                                {formik => (
                                    <>
                                    <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch1" onClick={() => {
                                      var options = document.getElementById('emioptions');
                                      if(document.getElementById('customSwitch1').checked) {
                                        options.classList.add('visible');
                                        options.classList.remove('invisible');
                                      }
                                      else {
                                        options.classList.add('invisible');
                                        options.classList.remove('visible');
                                        document.getElementById('downpayment').value = 0;
                                        document.getElementById('interest').value = 0;
                                      }
                                    }}></input>
                                    <label class="custom-control-label" for="customSwitch1">Is EMI Available</label>
                                  </div>
                                  <div className="invisible" id="emioptions">
                                      <F>
                                    <Row>
                                      <Col md={6}>
                                        <TextField label="Down Payment" name="EMI.downPayment" type="number" id="downpayment" />
                                      </Col>
                                      <Col md={6}>
                                        <TextField label="Rate of Interest" name="EMI.interest_Rate" type="number" id="interest" />
                                      </Col>
                                    </Row>
                                    <Button type="submit">Submit</Button>
                                    </F>
                                  </div>
                                  </>
                                )}
                                
                            </Formik>
                        </Modal.Body>
                    </Modal>
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
    else
        return (
            <div className="container">
                <div className="heading">
                    <h1>Product Details</h1>
                </div>
                <div>
                    <RenderProductDetails product={props.product} updateProduct={props.updateProduct} />
                </div>
            </div>

        );
}


export default ProductDetail;