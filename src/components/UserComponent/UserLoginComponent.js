import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSnackbar } from 'react-simple-snackbar'
import { useHistory, useLocation } from 'react-router-dom';

const Sign = (props) => {
  console.log(props);
  const history = useHistory();
  let location = useLocation();
  console.log(location);
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

  const handleSignup = e => {
    e.preventDefault();
    console.log(formSignup);
    props.signupUser(formSignup);
    setTimeout(function () {
      history.push({
        pathname: '/'
      })
    }, 1000);
  }

  const handleLogin = e => {
    e.preventDefault();
    props.loginUser(formLogin);
    openSnackbar(props.auth.message, 2000);
    let path;
    if (location.state === undefined) path = "/";
    else {
      path = "/buy"
    }
    setTimeout(function () {
      history.push({
        pathname: path,
        state: location.state
      })
    }, 1000);

  }
  const handleLogout = () => {
    props.logoutUser();
    openSnackbar(props.auth.message, 2000);
    setTimeout(function () {
      history.push({
        pathname: "/"
      })
      window.location.reload(false);
    }, 1000);

  }
  return (
    <div className="sign">
      <div className="join-buttons">
        <Button onClick={handleShow1} id="signup-user">SignUp</Button>

        <Button onClick={handleShow2} id="login-user">Login</Button>

        <Button onClick={handleLogout} id="logout-user">Logout</Button>
      </div>
      <div className="modal-signup">
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div class="row mb-4">
                <div class="col">
                  <div class="form-outline">
                    <Form.Control type='text' onChange={e => setSignupField('name', e.target.value)} />
                    <Form.Label>Your Name</Form.Label>
                  </div>
                </div>
              </div>

              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setSignupField('username', e.target.value)} />
                <Form.Label>Phone Number</Form.Label>
              </div>

              <div class="form-outline mb-4">
                <Form.Control type='password' onChange={e => setSignupField('password', e.target.value)} />
                <Form.Label>Password</Form.Label>
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
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      <div className="modal-login">
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setLoginField('username', e.target.value)} />
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
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Sign;