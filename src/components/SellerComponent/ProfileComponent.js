import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar'

const SellerProfile = (props) => {
    console.log(props, 'line 7');
    const [openSnackbar] = useSnackbar();

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

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
        props.updateSeller(formEdit);
        window.location.reload();
        openSnackbar('Updated Successfully!!!', 2000);

    }
    
    function myFunction() {
        var input, filter, fill, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        fill = input.value;
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValue.toUpperCase().indexOf(fill) > -1)) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }

    return (
        <div className="container">
            <div className="row">
                <div className="personal-info col-md-6 col-12">
                    Name - {props.seller.seller.name}<br></br><br></br>
                Phone - {props.seller.seller.phone}<br></br><br></br>
                Email - {props.seller.seller.email}<br></br><br></br>
                Joined on - {props.seller.seller.joined_on}<br></br><br></br>
                </div>
                <div className="col-3 edit-button mt-5">
                    <Button onClick={handleShow1}>Edit Profile</Button>
                </div>
            </div>
            <div className="row">
                <div className="col-3">Products -</div>
                <div className="col-4">
                <input type="text" id="myInput" onChange={myFunction} placeholder="Search for names.." title="Type in a name"></input>
                </div>
                <div className="add-products col-4">
                    <Link to="/addProduct"><Button>Add Products</Button></Link>
                </div>
            </div>
            
            {props.seller.seller.productsHeHas == null ? <div className="no-products">No Products
                </div> : <div className="table-products">
                    <table id="myTable">
                <tr>
                                    <th id="td-name">Name</th>
                                    <th id="td-company">Company</th>
                                    <th id="td-price">Price</th>
                                    <th id="td-category">Category</th>
                                </tr>
                   {props.seller.seller.productsHeHas.map((product) => {
                       return (
                                
                                <tr>
                                    <Link to={`/sellerProducts/${product._id}`}><td id="td-name">{product.name}</td></Link>
                                    <td id="td-company">{product.company}</td>
                                    <td id="td-price">{product.price}</td>
                                    <td id="td-category">{product.category}</td>
                                </tr>
                       );
                   })}
                   </table>
                </div>}
            <div className="stats-button">
                <Button>Stats</Button>
            </div>
            <div className="modal-changeProfile">
                <Modal show={show1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={props.seller.seller.name} onChange={e => setEditField('name', e.target.value)} />
                                <Form.Label>Your Name</Form.Label>
                            </div>

                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={props.seller.seller.phone} onChange={e => setEditField('username', e.target.value)} />
                                <Form.Label>Phone Number</Form.Label>
                            </div>

                            <div class="form-outline mb-4">
                                <Form.Control type='email' defaultValue={props.seller.seller.email} onChange={e => setEditField('email', e.target.value)} />
                                <Form.Label>Email</Form.Label>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}



export default SellerProfile;