import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar'

const Home = (props) => {
  console.log(props);
  const history = useHistory();
  const [openSnackbar] = useSnackbar()

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [formLogin, setLoginForm] = useState({})
  const [formSignup, setSignupForm] = useState({})
  const setLoginField = (field, value) => {
    setLoginForm({
      ...formLogin,
      [field]: value
    })
  }

  const setSignupField = (field, value) => {
    setSignupForm({
      ...formSignup,
      [field]: value
    })
  }

  const handleLogin = e => {
    e.preventDefault();
    props.loginSeller(formLogin);
    console.log(formLogin)
    openSnackbar('You have successfully logged in!!!', 2000);
    setTimeout(function () {
      history.push({
        pathname: "/sellerProfile"
      })
    }, 1000);
  }

  const handleSignup = e => {
    e.preventDefault();
    props.signupSeller(formSignup);
    console.log(formSignup)
    openSnackbar('Your application has successfully submitted!!!', 2000);

  }


  const handleLogout = () => {
    props.logoutSeller();
    openSnackbar('Logout Successfully!!!', 2000);
    setTimeout(function () {
      history.push({
        pathname: "/products"
      })
      window.location.reload(false);
    }, 100);

  }

  return (
    <div className="container">
      <div className="info">
        Millions of Sellers have joined us and increased their sales and profits multifolds.
        Join us today!!!
            </div>
      <div className="join-buttons">
        <Button onClick={handleShow1} id="signup" >Become A Seller</Button>

        <Button onClick={handleShow2} id="login">Login</Button>

        <Button onClick={handleLogout} id="logout">Logout</Button>
      </div>
      <div className="modal-signup">
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setSignupField('name', e.target.value)} />
                <Form.Label>Name</Form.Label>
              </div>
              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setSignupField('phone', e.target.value)} />
                <Form.Label>Phone Number</Form.Label>
              </div>

              <div class="form-outline mb-4">
                <Form.Control type='password' onChange={e => setSignupField('password', e.target.value)} />
                <Form.Label>Password</Form.Label>
              </div>

              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setSignupField('info', e.target.value)} />
                <Form.Label>Info</Form.Label>
              </div>

              <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSignup}>Sign up</button>

              <div class="text-center">
                <p>or sign up with:</p>
                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-google"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-github"></i>
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>

      <div className="modal-login">
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setLoginField('phone', e.target.value)} />
                <Form.Label>Phone Number</Form.Label>
              </div>

              <div class="form-outline mb-4">
                <Form.Control type='password' onChange={e => setLoginField('password', e.target.value)} />
                <Form.Label>Password</Form.Label>
              </div>

              <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label class="form-check-label" for="form2Example3"> Remember me </label>
                  </div>
                </div>

              </div>

              <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleLogin}>Sign in</button>

              <div class="text-center">
                <p>Not a member? <a>Register</a></p>
                <p>or sign up with:</p>
                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-google"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-github"></i>
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Home;