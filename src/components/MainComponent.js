import React, {Component} from 'react';
import { connect } from 'react-redux';
import Products from './UserComponent/ProductComponent';
import Header from './HeaderComponent';
import ProductDetail from './UserComponent/ProductDetailComponent';
import SellerProductDetail from './SellerComponent/ProductDetailComponent';
import QueryProducts from './UserComponent/QueryProductsComponent';
import SellerHome from './SellerComponent/HomeComponent';
import SellerProfile from './SellerComponent/ProfileComponent';
import UserLogin from './UserComponent/UserLoginComponent';
import ProductAdd from './SellerComponent/ProductAddComponent';
import Orders from './UserComponent/OrderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchProducts, fetchQueryProducts, loginUser, loginSeller, logoutSeller, logoutUser, getASeller, signupSeller, getAUser, updateSeller, uploadProduct, updateUser, updateProduct, signupUser} from '../redux/ActionCreators';
import Footer from './FooterComponent';
import BuyNow from './UserComponent/BuyNowComponent';
import Payment from './UserComponent/PaymentComponent';
import Congrats from './UserComponent/CongratsComponent';
import Profile from './UserComponent/ProfileComponent';

const mapStateToProps = state => {
    return {
      products: state.products,
      queryProducts: state.queryProducts,
      auth: state.auth,
      seller: state.seller,
      user : state.user
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    fetchProducts: () => { dispatch(fetchProducts()) },
    fetchQueryProducts: (keyword) => {dispatch(fetchQueryProducts(keyword))},
    loginUser: (creds) => {dispatch(loginUser(creds))},
    loginSeller: (creds) => {dispatch(loginSeller(creds))},
    logoutUser: () => { dispatch(logoutUser()) },
    logoutSeller: () => { dispatch(logoutSeller()) },
    getASeller: (Sid) => {dispatch(getASeller(Sid))},
    getAUser: (Uid) => {dispatch(getAUser(Uid))},
    signupSeller: (creds) => {dispatch(signupSeller(creds))},
    updateSeller: (info) => {dispatch(updateSeller(info))},
    uploadProduct: (product) => {dispatch(uploadProduct(product))},
    updateUser: (info) => {dispatch(updateUser(info))},
    updateProduct: (info, id) => {dispatch(updateProduct(info, id))},
    signupUser: (creds) => {dispatch(signupUser(creds))}    
    });


class Main extends Component {
    constructor(props) {
        super(props);
        console.log(props);
      }
    
      componentDidMount() {
        this.props.fetchProducts();
        this.props.getASeller(this.props.auth.sellerId);
        this.props.getAUser(this.props.auth.userId);
      }
    render() {

      var value="/products"

        if(this.props.auth.sellerId) {
          value="/sellerProfile";
        }
        if(this.props.auth.userId) {
          value="/products";
        }
      

      const productWithId = ({ match }) => {
        console.log('in productWith id');
        return (
          <ProductDetail product={this.props.products.products.filter((product) => product._id === (match.params.productId))[0]}
            isLoading={this.props.products.isLoading}
            errMess={this.props.products.errMess}
            updateUser={this.props.updateUser}
            auth={this.props.auth}
            >
          </ProductDetail>
        );
      }

      const sellerProductWithId = ({ match }) => {
        return (
          <SellerProductDetail product={this.props.products.products.filter((product) => product._id === (match.params.productId))[0]}
            isLoading={this.props.products.isLoading}
            errMess={this.props.products.errMess}
            updateProduct={this.props.updateProduct}
            >
          </SellerProductDetail>
        );
      }

        const productsPage = () => {
            return (
                <Products products={this.props.products}
                 isLoading={this.props.products.isLoading}
                 errMess={this.props.products.errMess} />
            );
        }
        const queryProductsPage = () => {
          return (
            <QueryProducts queryProducts={this.props.queryProducts}
              isLoading={this.props.queryProducts.isLoading}
              errMess={this.props.queryProducts.errMess} />
          );
        }
        return (
          <div className="mainDiv">
            <Header fetchQueryProducts={this.props.fetchQueryProducts}
            auth={this.props.auth} user={this.props.user} seller={this.props.seller} />
            <Switch>
                <Route exact path="/products" component={productsPage} />
                <Route  path="/queryProducts" component={queryProductsPage} />
                <Route exact path="/sellerProducts/:productId" component={sellerProductWithId}></Route>
                <Route exact path="/products/:productId" component={productWithId}></Route>
                <Route path="/sellerHome" component={() => <SellerHome loginSeller={this.props.loginSeller} auth={this.props.auth} logoutSeller={this.props.logoutSeller} signupSeller={this.props.signupSeller} />}></Route>
                <Route path="/userLogin" component={() => <UserLogin loginUser={this.props.loginUser} signupUser={this.props.signupUser} auth={this.props.auth} logoutUser={this.props.logoutUser} /> } />
                <Route path="/sellerProfile" component={() => <SellerProfile seller={this.props.seller} updateSeller={this.props.updateSeller} />} />
                <Route path="/addProduct" component={() => <ProductAdd uploadProduct={this.props.uploadProduct} />} />
                <Route path="/buy" component={() => <BuyNow user={this.props.user} updateUser={this.props.updateUser} />} />
                <Route path="/payment" component={() => <Payment updateUser={this.props.updateUser} />} />
                <Route path="/congrats" component={() => <Congrats />} />
                <Route path="/myOrders" component={() => <Orders user={this.props.user} />} />
                <Route path="/profile" component={() => <Profile user={this.props.user} updateUser={this.props.updateUser} />} />
                <Redirect to={value}  />
            </Switch>
            <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));