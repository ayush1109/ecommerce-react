import { Formik, Form } from 'formik';
import React from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import TextField from './TextField';
import * as Yup from 'yup';
import { useSnackbar } from 'react-simple-snackbar';
import { useHistory } from 'react-router-dom';

const ProductAdd = (props) => {
  console.log(props);
  const history = useHistory(); 
  const [openSnackbar] = useSnackbar()

  const validate = Yup.object({
    name: Yup.string()
      .min(3, 'Minimum length should be 3')
      .required('Name is required'),
    old_price: Yup.string()
      .required('Old Price is required'),
    price: Yup.string()
      .required('Price is required'),
    category: Yup.string()
      .required('Category is required'),
    company: Yup.string()
      .required('Company is required')
  })

  return (
    <>
      <form action="http://localhost:5000/uploadImage" method="POST" enctype="multipart/form-data">
        <input type="file" accept="image/*" name="image" id="image"></input>
        <input type="submit" value="upload"></input>
      </form>
      <Formik
        initialValues={{
          name: '',
          old_price: '',
          price: '',
          tags: [''],
          company: '',
          category: '',
          description: [''],
          offers: [''],
          EMI: {
            isAvailable: true,
            downPayment: 0,
            interest_Rate: 0
          },
          delivery: 0,
          stock: {
            isInStock: true,
            numberOfItems: 1
          }
        }
        }

        validationSchema={validate}

        onSubmit={values => {
          if(values.EMI.downPayment == 0) values.EMI.isAvailable=false;
          else values.EMI.isAvailable=true;
          // console.log(values);
          var arr = [];
          arr.push(values)
          console.log(arr);
          props.uploadProduct(arr);
          openSnackbar('Product Uploaded successfully!!!', 2000);
          setTimeout(function () {
            history.push({
              pathname: "/sellerProfile"
            })
          }, 1000);

        }}

      >
        {formik => (
          <div className="addProduct-form container">
            <Form>
              <TextField label="Name" name="name" type="text" autoFocus="autofocus" />
              <TextField label="Old_Price" name="old_price" type="number" min={1} />
              <TextField label="Image" name="image" type="text" />
              <TextField label="Price" name="price" type="number" min={1} />
              <TextField label="Company" name="company" type="text" />
              <TextField label="Category" name="category" type="text" />
              <Row>
                <Col md={3}>
                  <TextField label="Description" name="description[0]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Description" name="description[1]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Description" name="description[2]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Description" name="description[3]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Description" name="description[4]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Description" name="description[5]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Description" name="description[6]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Description" name="description[7]" type="text" />
                </Col>
              </Row>
              <TextField label="Delivery Charges" name="delivery" type="number" min={0} />

              <Row>
                <Col md={3}>
                  <TextField label="Tags" name="tags[0]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Tags" name="tags[1]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Tags" name="tags[2]" type="text" />
                </Col>
                <Col md={3}>
                  <TextField label="Tags" name="tags[3]" type="text" />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <TextField label="Offers" name="offers[0]" type="text" />
                </Col>
                <Col md={4}>
                  <TextField label="Offers" name="offers[1]" type="text" />
                </Col>
                <Col md={4}>
                  <TextField label="Offers" name="offers[2]" type="text" />
                </Col>
              </Row>
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
                <Row>
                  <Col md={6}>
                    <TextField label="Down Payment" name="EMI.downPayment" type="number" id="downpayment" />
                  </Col>
                  <Col md={6}>
                    <TextField label="Rate of Interest" name="EMI.interest_Rate" type="number" id="interest" />
                  </Col>
                </Row>
              </div>
              <div className="stock">
                <TextField label="Stock" name="stock.numberOfItems" type="number" />
              </div>
              <Button type="submit">ADD</Button>
            </Form>
          </div>
        )}
      </Formik>


    </>
  );
}

export default ProductAdd;