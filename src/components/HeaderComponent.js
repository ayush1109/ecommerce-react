import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, NavItem, Dropdown } from 'react-bootstrap';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
            userName: 'User',
            userName2 : 'Seller',
            classname: 'fas fa-sign-in-alt',
            classname2 : 'fas fa-sign-in-alt',
            message: 'Login',
            message2: 'Login'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
        setInterval(() => {
                if(this.props.user.user.username) {
                this.setState({
                    message : 'Logout',
                    classname : 'fas fa-sign-out-alt',
                    classname2 : 'fas fa-sign-in-alt',
                    userName : this.props.user.user.name,
                    userName2 : 'Seller',
                    message2 : 'Login'
                })
            }
            else if(this.props.seller.seller.phone){
                this.setState({
                    message : 'Login',
                    classname : 'fas fa-sign-in-alt',
                    userName : 'User',
                    message2 : 'Logout',
                    classname2 : 'fas fa-sing-out-alt',
                    userName2 : this.props.seller.seller.name
                })
            }  
            else {
                this.setState({
                    message : 'Login',
                    classname : 'fas fa-sign-in-alt',
                    userName : 'User',
                    message2 : 'Login',
                    classname2 : 'fas fa-sing-in-alt',
                    userName2 : 'Seller'
                })
            }
        }, 1000);
        
    }
    handleSubmit(event) {
        var node = this.myRef.current.value;
        console.log(typeof node)
        this.props.history.push('/queryProducts');
        this.props.fetchQueryProducts(node);
        event.preventDefault();
    }
    
    render() {
        return (
            <Navbar expand="md" fixed="top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand as={Link} to="/">Ecart</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                <NavDropdown title={this.state.userName} id="user-dropdown">
                    <Dropdown as={NavItem}>
                        <NavDropdown.Item as={Link} to="/profile"><i className="fa fa-user"></i>My Profile</NavDropdown.Item><NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/myOrders"><i className="fa fa-folder"></i>Orders</NavDropdown.Item><NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.3"><i className="fa fa-heart"></i>WishList</NavDropdown.Item><NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/userLogin"><i className={this.state.classname}></i>{this.state.message}</NavDropdown.Item>
                    </Dropdown>
                    </NavDropdown>
                    <NavDropdown title={this.state.userName2} id="more-dropdown">
                        <Dropdown as={NavItem}>
                        <NavDropdown.Item as={Link} to="/sellerHome"><i className={this.state.classname}></i>{this.state.message2}</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/sellerProfile">Home</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </Dropdown>
                    </NavDropdown>
                    <Nav.Link href="#link"><span className="fa fa-cart"></span>Cart</Nav.Link>
                    
                </Nav>
            </Navbar.Collapse>
            <Nav className="ml-auto">
            <Form inline onSubmit={this.handleSubmit}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" 
                        ref={this.myRef} />
                    <Button variant="outline-success" onClick={this.handleSubmit}>Search</Button>
                </Form>
            </Nav>
        </Navbar>
        );
    }
}

export default withRouter(Header);