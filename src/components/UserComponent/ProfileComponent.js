import React,{useState} from 'react';
import {Form, Modal, Button} from 'react-bootstrap';
import {useSnackbar} from 'react-simple-snackbar';

const Profile = (props) => {
    console.log(props);
    const user = props.user.user;
    console.log(user);

    var house;
    var message;
    var sector;
    var landmark;
    var city;
    var state;
    if(user.address == null) {
        house = sector = city = landmark = state = '';
        message = 'Add';
    }
    else {
        house = user.address.house;
        sector = user.address.sector;
        landmark=user.address.landmark;
        city = user.address.city;
        state = user.address.state;
        message = 'Edit';
    }

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

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [formAddressEdit, setAddressEditForm] = useState({})

    const setAddressEditField = (field, value) => {
        setAddressEditForm({
            ...formAddressEdit,
            [field]: value
        })
    }

    const handleSubmit1 = e => {
        e.preventDefault();
        console.log(formEdit);
        props.updateUser(formEdit);
        // window.location.reload();
        openSnackbar('Updated Successfully!!!', 2000);

    }

    const handleSubmit2 = e => {
        e.preventDefault();
        console.log(formAddressEdit);
        function wrap(values) {
            return {
                "address" : values
            }
        }

        console.log(new wrap(formAddressEdit))

        props.updateUser(new wrap(formAddressEdit));

    }

    return (
        <div className="container">
            <div className="profile">
            <div className="row">
                <div className="personal-info col-md-6 col-12">
                    Name - {user.name}<br></br><br></br>
                Phone - {user.username}<br></br><br></br>
                Email - {user.email}<br></br><br></br>
                Joined on - {user.joined_on}<br></br><br></br>
                </div>
                <div className="col-3 edit-button mt-5">
                    <Button onClick={handleShow1}>Edit Profile</Button>
                </div>
            </div>
            </div>
            <div className="address">
                Address - 
            </div>
            <div className="your-address row">
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
                    <Button onClick={handleShow2}>{message}</Button>
                </div>
            </div>
            <div className="modal-changeProfile">
                <Modal show={show1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={user.name} onChange={e => setEditField('name', e.target.value)} />
                                <Form.Label>Your Name</Form.Label>
                            </div>

                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={user.username} onChange={e => setEditField('username', e.target.value)} />
                                <Form.Label>Phone Number</Form.Label>
                            </div>

                            <div class="form-outline mb-4">
                                <Form.Control type='email' defaultValue={user.email} onChange={e => setEditField('email', e.target.value)} />
                                <Form.Label>Email</Form.Label>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit1}>Submit</button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
            <div className="modal-address">
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>{message} Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={house} onChange={e => setAddressEditField('house', e.target.value)} />
                                <Form.Label>House No, Building Name</Form.Label>
                            </div>

                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={sector} onChange={e => setAddressEditField('sector', e.target.value)} />
                                <Form.Label>Sector, Street name</Form.Label>
                            </div>

                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={landmark} onChange={e => setAddressEditField('landmark', e.target.value)} />
                                <Form.Label>Landmark (if any)</Form.Label>
                            </div>
                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={city} onChange={e => setAddressEditField('city', e.target.value)} />
                                <Form.Label>City</Form.Label>
                            </div>
                            <div class="form-outline mb-4">
                                <Form.Control type='text' defaultValue={state} onChange={e => setAddressEditField('state', e.target.value)} />
                                <Form.Label>State</Form.Label>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit2}>Submit</button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default Profile;